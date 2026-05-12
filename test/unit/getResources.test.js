/**
 * Unit test of ResourceService - get resources.
 */

const should = require('should')
const service = require('../../src/services/ResourceService')
const helper = require('../../src/common/helper')
const prisma = require('../../src/common/prisma').getClient()
const { user } = require('../common/testData')
const { assertValidationError, assertError, getRoleIds } = require('../common/testHelper')

const challengeId = 'fe6d0a58-ce7d-4521-8501-b8132b1c0391'
const challengeId2 = 'fe6d0a58-ce7d-4521-8501-b8132b1c0392'
const challengeId3 = 'fe6d0a58-ce7d-4521-8501-b8132b1c0393'
const challengeNotFoundId = '11111111-ce7d-4521-8501-b8132b1c0391'

module.exports = describe('Get resources', () => {
  let copilotRoleId
  let submitterRoleId
  let reviewerRoleId

  before(async () => {
    const ret = await getRoleIds()
    copilotRoleId = ret.copilotRoleId
    submitterRoleId = ret.submitterRoleId
    reviewerRoleId = ret.reviewerRoleId
  })

  let hasCopilotRole, hasReviewerRole

  /**
   * Assert resource entity in database.
   * @param {String} id the entity id
   * @param {Object} expected the expected data
   */
  const assertResource = async (id, expected) => {
    should.exist(id)
    const entity = await helper.getById('Resource', id)
    should.equal(entity.challengeId, challengeId)
    should.equal(entity.memberId, expected.memberId)

    should.equal(entity.memberHandle.toLowerCase(), expected.memberHandle.toLowerCase())
    const resourceRole = await helper.getById('ResourceRole', entity.roleId)
    should.exist(expected.roleName)
    expected.roleName.should.be.String()
    should.equal(expected.roleName, resourceRole.name)
    if (entity.memberHandle.toLowerCase() === 'phead') {
      if (entity.roleId === copilotRoleId) {
        hasCopilotRole = true
      }
      if (entity.roleId === reviewerRoleId) {
        hasReviewerRole = true
      }
      should.equal(expected.rating, 1367)
    } else {
      if (entity.memberHandle.toLowerCase() === 'diazz') {
        should.equal(expected.rating, 0)
      }
      should.equal(entity.roleId, submitterRoleId)
    }
    should.exist(expected.created)
    should.exist(expected.createdBy)
    should.equal(entity.createdBy, expected.createdBy)
  }

  it('get resources by admin', async () => {
    hasCopilotRole = false
    hasReviewerRole = false
    const result = await service.getResources(user.admin, challengeId)
    should.equal(result.total, 5)
    for (const record of result.data) {
      await assertResource(record.id, record)
      should.exist(record.memberEmail)
      record.memberEmail.should.be.String()
      should.exist(record.roleName)
    }
    // user phead should have two resources
    should.equal(hasCopilotRole, true)
    should.equal(hasReviewerRole, true)
  })

  it('get resources by project manager role', async () => {
    const result = await service.getResources(user.projectManager, challengeId)
    should.equal(result.total, 5)
    for (const record of result.data) {
      await assertResource(record.id, record)
      should.exist(record.roleName)
    }
  })

  it('get resources by talent manager role', async () => {
    const result = await service.getResources(user.talentManager, challengeId)
    should.equal(result.total, 5)
    for (const record of result.data) {
      await assertResource(record.id, record)
      should.exist(record.roleName)
    }
  })

  it('enforces challenge user whitelist for interactive resource reads', async () => {
    await helper.prismaChallenge.challengeUserWhitelist.deleteMany({
      where: { challengeId }
    })
    await helper.prismaChallenge.challengeUserWhitelist.create({
      data: {
        challengeId,
        userId: user.phead.userId
      }
    })

    try {
      const allowed = await service.getResources(user.phead, challengeId)
      should.equal(allowed.total, 5)

      const machine = await service.getResources(user.m2m, challengeId)
      should.equal(machine.total, 5)

      try {
        await service.getResources(user.admin, challengeId)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.name, 'ForbiddenError')
      }
    } finally {
      await helper.prismaChallenge.challengeUserWhitelist.deleteMany({
        where: { challengeId }
      })
    }
  })

  it('filters resource lists before pagination metadata is computed', async () => {
    await prisma.resource.updateMany({
      where: { challengeId, memberId: '151743' },
      data: { createdAt: new Date('2020-01-01T00:00:00.000Z') }
    })
    await prisma.resource.updateMany({
      where: { challengeId: challengeId2, memberId: '151743' },
      data: { createdAt: new Date('2020-01-02T00:00:00.000Z') }
    })
    await prisma.resource.updateMany({
      where: { challengeId: challengeId3, memberId: '151743' },
      data: { createdAt: new Date('2020-01-03T00:00:00.000Z') }
    })

    await helper.prismaChallenge.challengeUserWhitelist.deleteMany({
      where: { challengeId: challengeId2 }
    })
    await helper.prismaChallenge.challengeUserWhitelist.create({
      data: {
        challengeId: challengeId2,
        userId: user.phead.userId
      }
    })

    try {
      const blocked = await service.getResources(user.admin, null, null, '151743', null, 2, 1, 'created', 'asc')
      should.equal(blocked.total, 2)
      should.equal(blocked.data.length, 1)
      should.equal(blocked.data[0].challengeId, challengeId3)

      const machine = await service.getResources(user.m2m, null, null, '151743', null, 2, 1, 'created', 'asc')
      should.equal(machine.total, 3)
      should.equal(machine.data.length, 1)
      should.equal(machine.data[0].challengeId, challengeId2)
    } finally {
      await helper.prismaChallenge.challengeUserWhitelist.deleteMany({
        where: { challengeId: challengeId2 }
      })
    }
  })

  it('enforces challenge user whitelist for resource count reads', async () => {
    await helper.prismaChallenge.challengeUserWhitelist.deleteMany({
      where: { challengeId }
    })
    await helper.prismaChallenge.challengeUserWhitelist.create({
      data: {
        challengeId,
        userId: user.phead.userId
      }
    })

    try {
      try {
        await service.getResourceCount(challengeId, null, user.admin)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.name, 'ForbiddenError')
      }

      const machine = await service.getResourceCount(challengeId, null, user.m2m)
      should.equal(machine[submitterRoleId], 3)
      should.equal(machine[copilotRoleId], 1)
      should.equal(machine[reviewerRoleId], 1)
    } finally {
      await helper.prismaChallenge.challengeUserWhitelist.deleteMany({
        where: { challengeId }
      })
    }
  })

  it('get resources by user has full-access permission', async () => {
    hasCopilotRole = false
    hasReviewerRole = false
    const result = await service.getResources(user.phead, challengeId)
    should.equal(result.total, 5)
    for (const record of result.data) {
      await assertResource(record.id, record)
      should.exist(record.memberEmail)
      record.memberEmail.should.be.String()
      should.exist(record.roleName)
    }
    // user phead should have two resources
    should.equal(hasCopilotRole, true)
    should.equal(hasReviewerRole, true)
  })

  it(`get resources using user without permission`, async () => {
    const result = await service.getResources(user.diazz, challengeId)
    should.equal(result.total, 1)
    should.equal(result.data[0].memberHandle, 'diazz')
    should.not.exist(result.data[0].memberEmail)
    should.exist(result.data[0].roleName)
  })

  it('get resources using m2m token', async () => {
    hasCopilotRole = false
    hasReviewerRole = false
    const result = await service.getResources(user.m2m, challengeId)
    should.equal(result.total, 5)
    for (const record of result.data) {
      await assertResource(record.id, record)
      should.exist(record.memberEmail)
      record.memberEmail.should.be.String()
      should.exist(record.roleName)
    }
    // user phead should have two resources
    should.equal(hasCopilotRole, true)
    should.equal(hasReviewerRole, true)
  })

  it('get resources with role id using m2m token', async () => {
    hasCopilotRole = false
    hasReviewerRole = false
    const result = await service.getResources(user.m2m, challengeId, copilotRoleId)
    should.equal(result.total, 1)
    for (const record of result.data) {
      await assertResource(record.id, record)
      should.exist(record.memberEmail)
      record.memberEmail.should.be.String()
      should.exist(record.roleName)
    }
    // user phead should have copilot role
    should.equal(hasCopilotRole, true)
  })

  it('get resources without user login', async () => {
    const result = await service.getResources(null, challengeId)
    should.equal(result.total, 0)
  })

  it(`test invalid parameter, challengeId must be UUID`, async () => {
    try {
      await service.getResources(user.m2m, 'invalid')
      throw new Error('should not throw error here')
    } catch (err) {
      assertValidationError(err, `"challengeId" must be a valid GUID`)
    }
  })

  it('failure - get resource from non-existed challenge', async () => {
    try {
      await service.getResources(user.m2m, challengeNotFoundId)
      throw new Error('should not throw error here')
    } catch (err) {
      should.equal(err.name, 'NotFoundError')
      assertError(err, `Challenge ID ${challengeNotFoundId} not found`)
    }
  })

  it('returns false when phaseChangeNotifications is null', async () => {
    const target = await prisma.resource.findFirst({ where: { challengeId } })
    should.exist(target)
    const originalValue = target.phaseChangeNotifications
    await prisma.resource.update({
      where: { id: target.id },
      data: { phaseChangeNotifications: null }
    })

    const result = await service.getResources(user.admin, challengeId)
    const resourceRecord = result.data.find(r => r.id === target.id)
    should.exist(resourceRecord)
    should.equal(resourceRecord.phaseChangeNotifications, false)

    await prisma.resource.update({
      where: { id: target.id },
      data: { phaseChangeNotifications: originalValue }
    })
  })
})
