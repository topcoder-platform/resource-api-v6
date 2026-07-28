/*
 * Setting up Mock for all tests
 */

// Keep the unit suite self-contained while allowing CI/developer overrides.
process.env.AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID || 'resource-api-test-client'
process.env.AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET || 'resource-api-test-secret'
process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgresql://johndoe:mypassword@localhost:5532/resourceapi?schema=resources'
process.env.MEMBER_DB_URL = process.env.MEMBER_DB_URL || 'postgresql://johndoe:mypassword@localhost:5632/memberdb?schema=public'
process.env.CHALLENGE_DB_URL = process.env.CHALLENGE_DB_URL || 'postgresql://johndoe:mypassword@localhost:5732/challengedb?schema=public'

const nodeCrypto = require('crypto')
const nock = require('nock')

/**
 * Create a long-lived HS256 machine token accepted by the local API mocks.
 * The HTTP-mock installer uses this token as its deterministic Auth0 response.
 *
 * @param {String} authSecret authentication secret used by the local verifier
 * @returns {String} a JWT signed with the configured test authentication secret
 * @throws {TypeError} if the configured authentication secret is not a valid
 *   HMAC key
 */
function createMachineToken (authSecret) {
  const encode = (value) => Buffer.from(JSON.stringify(value)).toString('base64url')
  const header = encode({ alg: 'HS256', typ: 'JWT' })
  const payload = encode({
    iss: 'https://topcoder-dev.auth0.com/',
    sub: 'resource-api-tests@clients',
    aud: 'https://m2m.topcoder-dev.com/',
    scope: 'all:resources',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600
  })
  const signature = nodeCrypto
    .createHmac('sha256', authSecret)
    .update(`${header}.${payload}`)
    .digest('base64url')
  return `${header}.${payload}.${signature}`
}

/**
 * Install HTTP mocks used by the complete Mocha run.
 * Mocha's root `beforeAll` hook calls this once before any suite-level setup.
 *
 * @returns {void}
 * @throws {TypeError} if `AUTH0_URL` is not a valid absolute URL
 */
function installHttpMocks () {
  // Delay configuration loading until the test entrypoint has selected the
  // `test` node-config environment and its localhost downstream URLs.
  const config = require('config')
  const auth0Url = new URL(config.AUTH0_URL)
  nock(auth0Url.origin)
    .persist()
    .post(auth0Url.pathname)
    .reply(200, {
      access_token: createMachineToken(config.AUTH_SECRET),
      expires_in: 3600,
      token_type: 'Bearer'
    })

  // Mock Posting to Bus API
  nock(/topcoder-dev.com/, { allowUnmocked: true })
    .persist()
    .post('/v5/bus/events')
    .reply(204)
}

exports.mochaHooks = {
  beforeAll () {
    installHttpMocks()
  },
  afterAll () {
    nock.cleanAll()
  }
}
