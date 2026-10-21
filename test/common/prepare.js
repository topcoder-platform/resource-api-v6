/*
 * Setting up Mock for all tests
 */

// Keep the unit suite self-contained while allowing CI/developer overrides.
process.env.KEYCLOAK_CLIENT_ID = process.env.KEYCLOAK_CLIENT_ID || 'resource-api-test-client'
process.env.KEYCLOAK_CLIENT_SECRET = process.env.KEYCLOAK_CLIENT_SECRET || 'resource-api-test-secret'
process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgresql://johndoe:mypassword@localhost:5532/resourceapi?schema=resources'
process.env.MEMBER_DB_URL = process.env.MEMBER_DB_URL || 'postgresql://johndoe:mypassword@localhost:5632/memberdb?schema=public'
process.env.CHALLENGE_DB_URL = process.env.CHALLENGE_DB_URL || 'postgresql://johndoe:mypassword@localhost:5732/challengedb?schema=public'

const nodeCrypto = require('crypto')
const nock = require('nock')

/**
 * Installs signed Keycloak issuance/JWKS fixtures and local downstream HTTP mocks.
 * Takes no arguments and returns nothing. Crypto or malformed URL errors propagate.
 * The root hook runs this before suites; no real issuer or credentials are used.
 */
function installHttpMocks () {
  const keys = nodeCrypto.generateKeyPairSync('rsa', {modulusLength:2048})
  const encode = value => Buffer.from(JSON.stringify(value)).toString('base64url')
  const endpoint = new URL(process.env.KEYCLOAK_TOKEN_URL)
  const issuer = new URL(process.env.KEYCLOAK_ISSUER)
  const now = Math.floor(Date.now()/1000)
  const unsigned = `${encode({alg:'RS256',kid:'resource-test'})}.${encode({
    iss:process.env.KEYCLOAK_ISSUER, aud:process.env.KEYCLOAK_AUDIENCE,
    sub:'service-account',azp:process.env.KEYCLOAK_CLIENT_ID,gty:'client-credentials',
    scope:'all:resources',iat:now,exp:now+600
  })}`
  const token = `${unsigned}.${nodeCrypto.sign('RSA-SHA256',Buffer.from(unsigned),keys.privateKey).toString('base64url')}`
  nock(endpoint.origin).persist().post(endpoint.pathname)
    .reply(200,{access_token:token,expires_in:600,token_type:'Bearer'})
  nock(issuer.origin).persist().get(`${issuer.pathname}/protocol/openid-connect/certs`)
    .reply(200,{keys:[{...keys.publicKey.export({format:'jwk'}),kid:'resource-test',alg:'RS256',use:'sig'}]})

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
