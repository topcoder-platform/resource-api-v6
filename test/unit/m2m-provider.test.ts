/**
 * USE_KEYCLOAK provider selection for the outbound M2M token (getRequest/postRequest)
 * and the Bus API client built in src/common/helper.ts.
 */

process.env.NODE_ENV = 'test'

const assert = require('node:assert/strict')
const path = require('node:path')
const nock = require('nock')
const _ = require('lodash')
const config = require('config')
const core = require('tc-core-library-js')

const helperPath = require.resolve('../../src/common/helper')
const wrapperPath = require.resolve('tc-bus-api-wrapper', { paths: [path.dirname(helperPath)] })
const auth0Names = ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME', 'AUTH0_PROXY_SERVER_URL', 'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET']

/**
 * Load a fresh helper module with USE_KEYCLOAK set to `value`. The real `auth.m2m` is
 * wrapped to record its options and the Bus API wrapper is replaced by a recorder.
 * The cached helper/wrapper modules, `auth.m2m` and USE_KEYCLOAK are restored afterwards.
 * @param value USE_KEYCLOAK value for the load, or undefined to unset it.
 * @returns The fresh helper plus the recorded `auth.m2m` and Bus API wrapper options.
 */
function loadHelper (value?: string) {
  const saved = { useKeycloak: process.env.USE_KEYCLOAK, helper: require.cache[helperPath], wrapper: require.cache[wrapperPath], m2m: core.auth.m2m }
  const m2mOptions: any[] = []
  const busOptions: any[] = []
  if (value === undefined) delete process.env.USE_KEYCLOAK
  else process.env.USE_KEYCLOAK = value
  core.auth.m2m = (options) => {
    m2mOptions.push(options)
    return saved.m2m(options)
  }
  require.cache[wrapperPath] = { id: wrapperPath, filename: wrapperPath, loaded: true,
    exports: (options) => { busOptions.push(options); return {} } } as any
  delete require.cache[helperPath]
  try {
    return { helper: require(helperPath), m2mOptions, busOptions }
  } finally {
    core.auth.m2m = saved.m2m
    require.cache[helperPath] = saved.helper
    require.cache[wrapperPath] = saved.wrapper
    if (saved.useKeycloak === undefined) delete process.env.USE_KEYCLOAK
    else process.env.USE_KEYCLOAK = saved.useKeycloak
  }
}

/** Mock the downstream member API call; returns the nock scope that records the bearer token. */
function mockMemberApi (seen: string[]) {
  const target = new URL(`${config.MEMBER_API_URL}/m2m-provider-probe`)
  return nock(target.origin).get(target.pathname)
    .reply(function () {
      seen.push(String(this.req.headers.authorization))
      return [200, {}]
    })
}

describe('USE_KEYCLOAK M2M provider selection', () => {
  // Every token and downstream call here must hit a local mock, never the network.
  before(() => nock.disableNetConnect())
  after(() => nock.enableNetConnect())

  for (const value of ['false', undefined]) {
    it(`uses the pre-migration AUTH0_* settings when USE_KEYCLOAK=${value}`, async () => {
      const { helper, m2mOptions, busOptions } = loadHelper(value)

      assert.deepEqual(m2mOptions[0], _.pick(config, auth0Names))
      assert.deepEqual(busOptions[0], {
        AUTH0_URL: config.AUTH0_URL,
        AUTH0_AUDIENCE: config.AUTH0_AUDIENCE,
        AUTH0_PROXY_SERVER_URL: config.AUTH0_PROXY_SERVER_URL,
        AUTH0_CLIENT_ID: config.AUTH0_CLIENT_ID,
        AUTH0_CLIENT_SECRET: config.AUTH0_CLIENT_SECRET,
        TOKEN_CACHE_TIME: config.TOKEN_CACHE_TIME,
        BUSAPI_URL: config.BUSAPI_URL,
        KAFKA_ERROR_TOPIC: config.KAFKA_ERROR_TOPIC
      })

      const tokenUrl = new URL(config.AUTH0_PROXY_SERVER_URL || config.AUTH0_URL)
      const bodies: any[] = []
      const issued = nock(tokenUrl.origin).post(tokenUrl.pathname, (body) => { bodies.push(body); return true })
        .reply(200, { access_token: 'auth0-machine-token' })
      const seen: string[] = []
      const member = mockMemberApi(seen)
      await helper.getRequest('members', ['m2m-provider-probe'])

      assert.ok(issued.isDone() && member.isDone())
      assert.deepEqual(seen, ['Bearer auth0-machine-token'])
      assert.deepEqual(bodies, [{
        grant_type: 'client_credentials',
        client_id: config.AUTH0_CLIENT_ID,
        client_secret: config.AUTH0_CLIENT_SECRET,
        auth0_url: config.AUTH0_URL,
        audience: config.AUTH0_AUDIENCE
      }])
    })
  }

  it('uses the KEYCLOAK_* settings when USE_KEYCLOAK=true', async () => {
    const { helper, busOptions } = loadHelper('true')

    assert.deepEqual(busOptions[0], {
      AUTH0_URL: config.KEYCLOAK_TOKEN_URL,
      AUTH0_AUDIENCE: config.KEYCLOAK_AUDIENCE,
      AUTH0_PROXY_SERVER_URL: config.KEYCLOAK_TOKEN_URL,
      AUTH0_CLIENT_ID: config.KEYCLOAK_CLIENT_ID,
      AUTH0_CLIENT_SECRET: config.KEYCLOAK_CLIENT_SECRET,
      TOKEN_CACHE_TIME: config.TOKEN_CACHE_TIME,
      BUSAPI_URL: config.BUSAPI_URL,
      KAFKA_ERROR_TOPIC: config.KAFKA_ERROR_TOPIC
    })

    // The root hook mocks the Keycloak token endpoint and JWKS with a signed token.
    const seen: string[] = []
    const member = mockMemberApi(seen)
    await helper.getRequest('members', ['m2m-provider-probe'])

    assert.ok(member.isDone())
    const claims = JSON.parse(Buffer.from(seen[0].split('.')[1], 'base64url').toString())
    assert.equal(claims.iss, process.env.KEYCLOAK_ISSUER)
    assert.equal(claims.azp, config.KEYCLOAK_CLIENT_ID)
  })

  it('rejects an invalid USE_KEYCLOAK value', () => {
    assert.throws(() => loadHelper('yes'), TypeError)
  })
})
