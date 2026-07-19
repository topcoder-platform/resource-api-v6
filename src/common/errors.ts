/**
 * HTTP-aware application error constructors used by the legacy and NestJS
 * request pipelines.
 *
 * The constructor shape, prototype names, metadata, and `httpStatus` property
 * are retained so existing error handling and tests continue to behave
 * identically after TypeScript compilation.
 */
const util = require('util')

/**
 * Create an Error-compatible constructor with a fixed HTTP status code.
 *
 * @param name Error name exposed through the prototype.
 * @param statusCode HTTP status exposed as `httpStatus` on each instance.
 * @returns An error constructor accepting message, cause, and metadata.
 * @throws Does not throw while creating the constructor. Instances retain
 * normal V8 stack-capture behavior when constructed.
 * @private
 */
function createError (name, statusCode) {
  /**
   * Construct an HTTP-aware application error.
   *
   * @param message Error message, defaulting to the configured error name.
   * @param cause Optional underlying cause retained without transformation.
   * @param metadata Optional structured metadata included in API responses.
   * @returns A new error instance when invoked with `new`.
   * @throws Does not intentionally throw during normal Node.js construction.
   * @constructor
   */
  function ErrorCtor (message, cause, metadata) {
    Error.call(this)
    Error.captureStackTrace(this)
    this.message = message || name
    this.cause = cause
    this.metadata = metadata
    this.httpStatus = statusCode
  }

  util.inherits(ErrorCtor, Error)
  ErrorCtor.prototype.name = name
  return ErrorCtor
}

module.exports = {
  BadRequestError: createError('BadRequestError', 400),
  UnauthorizedError: createError('UnauthorizedError', 401),
  ForbiddenError: createError('ForbiddenError', 403),
  NotFoundError: createError('NotFoundError', 404),
  ConflictError: createError('ConflictError', 409),
  ServiceUnavailable: createError('ServiceUnavailable', 503)
}
