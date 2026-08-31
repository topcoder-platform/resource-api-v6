/**
 * Security regression tests for outbound API URL construction.
 */

const assert = require('node:assert/strict')
const config = require('config')
const helper = require('../../src/common/helper')

describe('outbound API URL security', () => {
  it('builds a canonical URL only from an allowlisted API and safe segments', () => {
    const challengeId = '12345678-1234-1234-1234-123456789abc'
    assert.equal(
      helper.buildOutboundApiUrl('challenges', [challengeId]),
      `${config.CHALLENGE_API_URL}/${challengeId}`
    )
  })

  it('encodes safe non-ASCII path data without changing the target origin', () => {
    const target = new URL(helper.buildOutboundApiUrl('members', ['déveloper']))
    const configured = new URL(config.MEMBER_API_URL)
    assert.equal(target.origin, configured.origin)
    assert.equal(target.pathname, `${configured.pathname}/d%C3%A9veloper`)
  })

  it('rejects an arbitrary target instead of treating it as an API name', () => {
    assert.throws(
      () => helper.buildOutboundApiUrl('http://169.254.169.254/latest/meta-data'),
      /Unknown outbound API/
    )
  })

  it('rejects arbitrary GET and POST targets before authentication or I/O', async () => {
    const metadataUrl = 'http://169.254.169.254/latest/meta-data'
    await assert.rejects(helper.getRequest(metadataUrl), /Unknown outbound API/)
    await assert.rejects(helper.postRequest(metadataUrl), /Unknown outbound API/)
  })

  for (const segment of ['..', '../admin', 'safe/../../admin', 'safe\\admin', 'safe?admin', 'safe#admin', 'safe%2fadmin', 'safe\u0000admin']) {
    it(`rejects a path component that can alter URL structure: ${JSON.stringify(segment)}`, () => {
      assert.throws(() => helper.buildOutboundApiUrl('challenges', [segment]), /Unsafe outbound API path segment/)
    })
  }
})
