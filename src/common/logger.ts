/**
 * Winston logging plus the legacy service validation/logging decorators.
 *
 * The logger remains a mutable CommonJS export because tests replace logging
 * methods and services are decorated in place during module initialization.
 */

const _ = require('lodash')
const Joi = require('joi')
const util = require('util')
const config = require('config')
const getParams = require('get-parameter-names')
const { createLogger, format, transports } = require('winston')

const logger: any = createLogger({
  level: config.LOG_LEVEL,
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    })
  ]
})

/**
 * Log complete error details, optionally prefixed with an operation signature.
 *
 * Each error object is marked as logged so repeated handling does not emit its
 * stack more than once.
 *
 * @param err Error-like object to log.
 * @param signature Optional operation or request signature.
 * @returns No value.
 * @throws Logger transport errors, if a configured transport throws.
 */
logger.logFullError = (err, signature) => {
  if (!err) {
    return
  }
  if (signature) {
    logger.error(`Error happened in ${signature}`)
  }
  logger.error(util.inspect(err))
  if (!err.logged) {
    logger.error(err.stack)
    err.logged = true
  }
}

/**
 * Produce a log-safe representation and abbreviate arrays longer than 30
 * entries.
 *
 * Serialization errors preserve the original object, matching legacy logging.
 *
 * @param obj Value to sanitize.
 * @returns A JSON-compatible clone when serialization succeeds, otherwise the
 * original value.
 * @throws Does not throw; serialization errors are caught.
 * @private
 */
const _sanitizeObject = (obj) => {
  try {
    return JSON.parse(JSON.stringify(obj, (name, value) => {
      if (_.isArray(value) && value.length > 30) {
        return `Array(${value.length})`
      }
      return value
    }))
  } catch (e) {
    return obj
  }
}

/**
 * Associate positional arguments with their parameter names.
 *
 * @param params Parameter names in declaration order.
 * @param arr Argument values in call order.
 * @returns Object keyed by parameter name.
 * @throws Does not intentionally throw for ordinary arrays.
 * @private
 */
const _combineObject = (params, arr) => {
  const ret = {}
  _.each(arr, (arg, i) => {
    ret[params[i]] = arg
  })
  return ret
}

/**
 * Decorate every service function with debug input/output/error logging.
 *
 * Decoration is skipped unless `LOG_LEVEL` is exactly `debug`. The supplied
 * export object is mutated in place.
 *
 * @param service Service export object whose functions should be wrapped.
 * @returns No value; `service` is updated in place.
 * @throws Errors from parameter introspection or property assignment.
 */
logger.decorateWithLogging = (service) => {
  if (config.LOG_LEVEL !== 'debug') {
    return
  }
  _.each(service, (method, name) => {
    const params = method.params || getParams(method)
    service[name] = async function () {
      logger.debug(`ENTER ${name}`)
      logger.debug('input arguments')
      const args = Array.prototype.slice.call(arguments)
      logger.debug(util.inspect(_sanitizeObject(_combineObject(params, args))))
      try {
        const result = await method.apply(this, arguments)
        logger.debug(`EXIT ${name}`)
        logger.debug('output arguments')
        if (result !== null && result !== undefined) {
          logger.debug(util.inspect(_sanitizeObject(result)))
        }
        return result
      } catch (e) {
        logger.logFullError(e, name)
        throw e
      }
    }
  })
}

/**
 * Decorate service functions with their attached Joi validation schemas.
 *
 * Validated and converted values replace the original positional arguments.
 * Functions without a `schema` property are left unchanged. The supplied
 * export object is mutated in place.
 *
 * @param service Service export object whose functions should be validated.
 * @returns No value; `service` is updated in place.
 * @throws Joi validation errors when a wrapped function is later invoked, or
 * property-assignment errors during decoration.
 */
logger.decorateWithValidators = function (service) {
  _.each(service, (method, name) => {
    if (!method.schema) {
      return
    }
    const params = getParams(method)
    service[name] = async function () {
      const args = Array.prototype.slice.call(arguments)
      const value = _combineObject(params, args)
      const normalized = Joi.attempt(value, method.schema)

      const newArgs = []
      // Joi will normalize values
      // for example string number '1' to 1
      // if schema type is number
      _.each(params, (param) => {
        newArgs.push(normalized[param])
      })
      return method.apply(this, newArgs)
    }
    service[name].params = params
  })
}

/**
 * Apply validation first and debug logging second to a service export object.
 *
 * @param service Service export object to decorate in place.
 * @returns No value.
 * @throws Errors raised by either decorator during setup.
 */
logger.buildService = (service) => {
  logger.decorateWithValidators(service)
  logger.decorateWithLogging(service)
}

module.exports = logger
