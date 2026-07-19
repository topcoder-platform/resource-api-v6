/**
 * Builds the compatibility-preserving Express application mounted by NestJS.
 *
 * Middleware, Swagger, routing, authentication interception, error formatting,
 * and response behavior remain on Express while Nest owns startup and shutdown.
 */

require('./app-bootstrap')

const _ = require('lodash')
const config = require('config')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const HttpStatus = require('http-status-codes')
const logger = require('./src/common/logger')
const interceptor = require('express-interceptor')
const YAML = require('yamljs')
const swaggerUi = require('swagger-ui-express')
const resourcesAPISwaggerDoc = YAML.load('./docs/swagger.yaml')

interface ErrorResponse {
  message?: any
  metadata?: any
}

/**
 * Creates the response interceptor used after the shared JWT authenticator.
 *
 * The authenticator writes legacy nested 403 responses for authentication
 * failures. This interceptor converts only those responses to the API's public
 * 401 `{ message }` shape and leaves application-level 403 responses unchanged.
 *
 * @param req The active Express request.
 * @param res The active Express response.
 * @returns The express-interceptor hooks for deciding and transforming a body.
 * @throws Propagates response mutation or interceptor callback errors.
 */
function createJwtResponseInterceptor (req: any, res: any): any {
  return {
    isInterceptable: () => {
      return res.statusCode === 403
    },

    intercept: (body, send) => {
      let obj
      try {
        obj = JSON.parse(body)
      } catch (e) {
        logger.error('Invalid response body.')
      }
      if (obj && _.get(obj, 'result.content.message')) {
        const ret = { message: obj.result.content.message }
        res.statusCode = 401
        send(JSON.stringify(ret))
      } else {
        send(body)
      }
    }
  }
}

/**
 * Formats all errors forwarded by route middleware and controller functions.
 *
 * Joi failures become 400 responses, custom and downstream status codes are
 * preserved, downstream API messages are unwrapped, and unexpected failures are
 * masked. Optional custom metadata is included unchanged.
 *
 * @param err The Joi, application, Prisma, or downstream HTTP error.
 * @param req The Express request used for contextual logging.
 * @param res The Express response that receives the compatibility error body.
 * @param next The Express continuation argument required for error middleware.
 * @returns Nothing after sending the JSON error response.
 * @throws Propagates errors raised by the response object's `status` or `json`
 * methods.
 */
function handleApplicationError (err: any, req: any, res: any, next: any): void {
  logger.logFullError(err, req.signature || `${req.method} ${req.url}`)
  const errorResponse: ErrorResponse = {}
  const status = err.isJoi ? HttpStatus.BAD_REQUEST : (err.status || err.httpStatus || HttpStatus.INTERNAL_SERVER_ERROR)

  if (_.isArray(err.details)) {
    if (err.isJoi) {
      _.map(err.details, (e) => {
        if (e.message) {
          if (_.isUndefined(errorResponse.message)) {
            errorResponse.message = e.message
          } else {
            errorResponse.message += `, ${e.message}`
          }
        }
      })
    }
  }

  if (err.response) {
    // Extract error messages from the established V3 and V5 API response shapes.
    errorResponse.message = _.get(err, 'response.body.result.content') || _.get(err, 'response.body.message')
  }

  if (_.isUndefined(errorResponse.message)) {
    if (err.message && status !== HttpStatus.INTERNAL_SERVER_ERROR) {
      errorResponse.message = err.message
    } else {
      errorResponse.message = 'Internal server error'
    }
  }

  if (!_.isUndefined(err.metadata)) {
    errorResponse.metadata = err.metadata
  }

  res.status(status).json(errorResponse)
}

const app = express()

// Serve the existing Resources API Swagger definition at its fixed public path.
app.use('/v6/resources/api-docs', swaggerUi.serve, swaggerUi.setup(resourcesAPISwaggerDoc))

app.use(cors({
  exposedHeaders: ['X-Page', 'X-Per-Page', 'X-Total', 'X-Total-Pages', 'X-Prev-Page', 'X-Next-Page']
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('port', config.PORT)

app.use(interceptor(createJwtResponseInterceptor))

require('./app-routes')(app)

app.use(handleApplicationError)

module.exports = app
