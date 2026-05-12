/**
 * Unit test of ResourceService - list challenges by member.
 */

const should = require('should')
const service = require('../../src/services/ResourceService')
const helper = require('../../src/common/helper')
const { assertValidationError, getRoleIds } = require('../common/testHelper')

const challengeId1 = 'fe6d0a58-ce7d-4521-8501-b8132b1c0391'
const challengeId2 = 'fe6d0a58-ce7d-4521-8501-b8132b1c0392'
const challengeId3 = 'fe6d0a58-ce7d-4521-8501-b8132b1c0393'

module.exports = describe('List challenges by member', () => {
  let submitterRoleId
  let reviewerRoleId
  let observerRoleId

  before(async () => {
    const ret = await getRoleIds()
    submitterRoleId = ret.submitterRoleId
    reviewerRoleId = ret.reviewerRoleId
    observerRoleId = ret.observerRoleId
  })

  it('get challenges phead can access', async () => {
    const ret = await service.listChallengesByMember('22742764', {})
    should.equal(ret.data.length, 1)
    should.equal(ret.data[0], challengeId1)
  })

  it('get challenges ghostar can access', async () => {
    const ret = await service.listChallengesByMember('151743', {})
    should.equal(ret.data.length, 3)
    should.equal(ret.data.includes(challengeId1), true)
    should.equal(ret.data.includes(challengeId2), true)
    should.equal(ret.data.includes(challengeId3), true)
  })

  it('filters member challenge lists by challenge user whitelist', async () => {
    await helper.prismaChallenge.challengeUserWhitelist.deleteMany({
      where: { challengeId: challengeId2 }
    })
    await helper.prismaChallenge.challengeUserWhitelist.create({
      data: {
        challengeId: challengeId2,
        userId: 'allowed-user'
      }
    })

    try {
      const blocked = await service.listChallengesByMember(
        '151743',
        {},
        { userId: 'blocked-user', roles: ['administrator'] }
      )
      should.equal(blocked.data.length, 2)
      should.equal(blocked.data.includes(challengeId1), true)
      should.equal(blocked.data.includes(challengeId2), false)
      should.equal(blocked.data.includes(challengeId3), true)

      const blockedSecondPage = await service.listChallengesByMember(
        '151743',
        { page: 2, perPage: 1 },
        { userId: 'blocked-user', roles: ['administrator'] }
      )
      should.equal(blockedSecondPage.total, 2)
      should.equal(blockedSecondPage.data.length, 1)
      should.equal(blockedSecondPage.data[0], challengeId3)

      const allowed = await service.listChallengesByMember(
        '151743',
        {},
        { userId: 'allowed-user', roles: ['administrator'] }
      )
      should.equal(allowed.data.length, 3)
      should.equal(allowed.data.includes(challengeId2), true)
    } finally {
      await helper.prismaChallenge.challengeUserWhitelist.deleteMany({
        where: { challengeId: challengeId2 }
      })
    }
  })

  it('get challenges ghostar can access with filter 1', async () => {
    const ret = await service.listChallengesByMember('151743', { resourceRoleId: submitterRoleId })
    should.equal(ret.data.length, 1)
    should.equal(ret.data[0], challengeId1)
  })

  it('get challenges ghostar can access with filter 2', async () => {
    const ret = await service.listChallengesByMember('151743', { resourceRoleId: reviewerRoleId })
    should.equal(ret.data.length, 2)
    should.equal(ret.data.includes(challengeId2), true)
    should.equal(ret.data.includes(challengeId3), true)
  })

  it('get challenges ghostar can access with filter 3', async () => {
    const ret = await service.listChallengesByMember('151743', { resourceRoleId: observerRoleId })
    should.equal(ret.data.length, 0)
  })

  it('get challenges by non existed user', async () => {
    const ret = await service.listChallengesByMember('111111111', {})
    should.equal(ret.data.length, 0)
  })

  it(`get challenges for user with non existed role`, async () => {
    const ret = await service.listChallengesByMember('151743', { resourceRoleId: challengeId1 })
    should.equal(ret.data.length, 0)
  })

  it(`test invalid parameters, memberId must be a string`, async () => {
    try {
      await service.listChallengesByMember(-1, {})
      throw new Error('should not throw error here')
    } catch (err) {
      assertValidationError(err, `"memberId" must be a string`)
    }
  })

  it(`test invalid parameters, resourceRoleId should be UUID`, async () => {
    try {
      await service.listChallengesByMember('151743', { resourceRoleId: 'invalid' })
      throw new Error('should not throw error here')
    } catch (err) {
      assertValidationError(err, `"resourceRoleId" must be a valid GUID`)
    }
  })
})
