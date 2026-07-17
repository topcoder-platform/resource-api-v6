/**
 * Registers the legacy Express route table and authorization middleware.
 *
 * NestJS mounts the completed Express application through ExpressAdapter, so
 * this module deliberately retains the original middleware ordering and edge
 * cases for anonymous, human, and machine callers.
 */

const _ = require('lodash')
const config = require('config')
const HttpStatus = require('http-status-codes')
const helper = require('./src/common/helper')
const errors = require('./src/common/errors')
const routes = require('./src/routes')
const authenticator = require('tc-core-library-js').middleware.jwtAuthenticator

/**
 * Configures every public API route on the supplied Express application.
 *
 * The compatibility app calls this once during module initialization. It loads
 * controller functions from the route table, applies JWT, IP-block, role, and
 * scope checks in their historical order, and installs the custom 404/405
 * fallback.
 *
 * @param app The Express application that NestJS mounts through ExpressAdapter.
 * @returns Nothing.
 * @throws If a configured controller method cannot be loaded, or if synchronous
 * authorization middleware raises an application error.
 */
function configureRoutes (app: any): void {
  _.each(routes, (verbs, path) => {
    _.each(verbs, (def, verb) => {
      const controllerPath = `./src/controllers/${def.controller}`
      const method = require(controllerPath)[def.method]
      if (!method) {
        throw new Error(`${def.method} is undefined`)
      }

      const actions: any[] = []
      actions.push((req, res, next) => {
        req.signature = `${def.controller}#${def.method}`
        next()
      })

      // Add the authenticator check if the route has auth metadata.
      if (def.auth) {
        actions.push((req, res, next) => {
          let token
          if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            token = req.headers.authorization.split(' ')[1]
          }
          if (def.allowAnonymous && !token) {
            next()
          } else {
            authenticator(_.pick(config, ['AUTH_SECRET', 'VALID_ISSUERS']))(req, res, next)
          }
        })

        if (def.blockByIp) {
          actions.push((req, res, next) => {
            req.authUser.blockIP = _.find(req.authUser, (value, key) => {
              return key.indexOf('blockIP') !== -1
            })
            if (req.authUser.blockIP) {
              throw new errors.ForbiddenError('Access denied')
            } else {
              next()
            }
          })
        }

        if (!def.allowAnonymous) {
          actions.push((req, res, next) => {
            if (req.authUser.isMachine) {
              if (!req.authUser.scopes || !helper.checkIfExists(def.scopes, req.authUser.scopes)) {
                next(new errors.ForbiddenError('You are not allowed to perform this action!'))
              } else {
                next()
              }
            } else {
              req.authUser.userId = String(req.authUser.userId)
              console.log(req.authUser)
              if (!req.authUser.roles || !helper.checkIfExists(def.access, req.authUser.roles)) {
                next(new errors.ForbiddenError('You are not allowed to perform this action!'))
              } else {
                next()
              }
            }
          })
        }
      }

      actions.push(method)
      app[verb](`/${config.API_VERSION}${path}`, helper.autoWrapExpress(actions))
    })
  })

  // Preserve the original distinction between unsupported methods and paths.
  app.use('*', (req, res) => {
    const route = routes[req.baseUrl.replace(`/${config.API_VERSION}`, '')]
    if (route) {
      res.status(HttpStatus.METHOD_NOT_ALLOWED).json({ message: 'The requested HTTP method is not supported.' })
    } else {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'The requested resource cannot be found.' })
    }
  })
}

module.exports = configureRoutes
