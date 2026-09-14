/**
 * Installs process-wide compatibility helpers used by the legacy service layer.
 *
 * This module is loaded before controllers and services so their Joi schemas and
 * BigInt values retain the behavior exposed by the original JavaScript runtime.
 * Node's native Promise remains in place because current HTTP dependencies use
 * standard methods such as `Promise.withResolvers` that Bluebird does not expose.
 */

const config = require('config')
const Joi = require('joi')

/**
 * Creates the optional UUID schema used for resource and relationship identifiers.
 *
 * @returns A Joi string schema that accepts UUID values and rejects invalid GUIDs.
 * @throws Does not throw while constructing the schema.
 */
function optionalIdSchema () {
  return Joi.string().uuid()
}

/**
 * Creates the required UUID schema used for mandatory identifiers.
 *
 * @returns A required Joi UUID schema.
 * @throws Does not throw while constructing the schema.
 */
function requiredIdSchema () {
  return Joi.optionalId().required()
}

/**
 * Creates the page-number schema used by paginated endpoints.
 *
 * Query-string numbers are converted by Joi, values must be positive integers,
 * and omitted values default to the first page.
 *
 * @returns A Joi number schema for a one-based page number.
 * @throws Does not throw while constructing the schema.
 */
function pageSchema () {
  return Joi.number().integer().min(1).default(1)
}

/**
 * Creates the page-size schema used by paginated endpoints.
 *
 * @returns A Joi number schema bounded from 1 through 10,000 and defaulted from
 * the existing DEFAULT_PAGE_SIZE configuration value.
 * @throws Does not throw while constructing the schema.
 */
function perPageSchema () {
  return Joi.number().integer().min(1).max(10000).default(config.DEFAULT_PAGE_SIZE)
}

/**
 * Serializes a BigInt as its decimal string representation for JSON responses.
 *
 * @returns The BigInt value represented as a base-10 string.
 * @throws Does not throw for a BigInt receiver.
 */
function bigIntToJSON (this: bigint): string {
  return this.toString()
}

Joi.optionalId = optionalIdSchema
Joi.id = requiredIdSchema
Joi.page = pageSchema
Joi.perPage = perPageSchema

;(BigInt.prototype as any).toJSON = bigIntToJSON
