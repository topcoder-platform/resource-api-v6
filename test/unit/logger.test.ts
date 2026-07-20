/**
 * Unit tests for the service validation decorator.
 */

process.env.NODE_ENV = 'test'

require('../../app-bootstrap')

const should = require('should')
const Joi = require('joi')
const logger = require('../../src/common/logger')

describe('Logger validation decorator', () => {
  let service

  beforeEach(() => {
    async function getPage (page, perPage) {
      return { page, perPage }
    }

    getPage.schema = {
      page: Joi.number().integer().min(1).default(1),
      perPage: Joi.number().integer().min(1).max(10000).required()
    }

    service = { getPage }
    logger.decorateWithValidators(service)
  })

  it('compiles argument schema maps before applying defaults and coercion', async () => {
    const attempt = Joi.attempt
    let receivedCompiledSchema = false

    Joi.attempt = function (value, schema) {
      receivedCompiledSchema = typeof schema.validate === 'function'
      return attempt.call(this, value, schema)
    }

    try {
      const result = await service.getPage(undefined, '5000')

      should.equal(receivedCompiledSchema, true)
      should.deepEqual(result, { page: 1, perPage: 5000 })
    } finally {
      Joi.attempt = attempt
    }
  })

  it('still rejects invalid arguments', async () => {
    await service.getPage(undefined, 'invalid').should.be.rejectedWith(/must be a number/)
  })
})
