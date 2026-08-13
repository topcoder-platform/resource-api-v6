/**
 * Unit test of ResourceService - get resources.
 */

const should = require('should')
const config = require('config')
const { v4: uuid } = require('uuid')
const service = require('../../src/services/ResourceService')
const controller = require('../../src/controllers/ResourceController')
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
      const blocked = await service.getResources(user.admin, undefined, undefined, '151743', undefined, 2, 1, 'created', 'asc')
      should.equal(blocked.total, 2)
      should.equal(blocked.data.length, 1)
      should.equal(blocked.data[0].challengeId, challengeId3)

      const machine = await service.getResources(user.m2m, undefined, undefined, '151743', undefined, 2, 1, 'created', 'asc')
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
        await service.getResourceCount(challengeId, undefined, user.admin)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.name, 'ForbiddenError')
      }

      const machine = await service.getResourceCount(challengeId, undefined, user.m2m)
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
      should.not.exist(record.memberEmail)
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

  it('intersects an ordinary caller own member and exact role filters', async () => {
    const ownSubmitter = await service.getResources(
      user.diazz,
      challengeId,
      submitterRoleId,
      user.diazz.userId
    )
    should.equal(ownSubmitter.total, 1)
    should.equal(ownSubmitter.data.length, 1)
    should.equal(ownSubmitter.data[0].memberId, user.diazz.userId)
    should.equal(ownSubmitter.data[0].roleId, submitterRoleId)

    const ownReviewer = await service.getResources(
      user.diazz,
      challengeId,
      reviewerRoleId,
      user.diazz.userId
    )
    should.equal(ownReviewer.total, 0)
    should.equal(ownReviewer.data.length, 0)
  })

  it('resolves an ordinary caller own handle before applying the exact role', async () => {
    const result = await service.getResources(
      user.diazz,
      challengeId,
      reviewerRoleId,
      undefined,
      user.diazz.handle
    )

    should.equal(result.total, 0)
    should.equal(result.data.length, 0)
  })

  it('rejects an ordinary caller cross-member filter without expanding visibility', async () => {
    try {
      await service.getResources(
        user.diazz,
        challengeId,
        submitterRoleId,
        user.phead.userId
      )
      throw new Error('should not throw error here')
    } catch (err) {
      should.equal(err.name, 'ForbiddenError')
      err.message.should.containEql('You are not allowed to perform this operation!')
    }

    try {
      await service.getResources(
        user.diazz,
        challengeId,
        submitterRoleId,
        undefined,
        user.phead.handle
      )
      throw new Error('should not throw error here')
    } catch (err) {
      should.equal(err.name, 'ForbiddenError')
      err.message.should.containEql('You are not allowed to perform this operation!')
    }
  })

  it('applies a global Submitter role filter before count, order, and pagination', async () => {
    const resourceIds = [uuid(), uuid(), uuid()]
    await prisma.resource.createMany({
      data: [
        {
          id: resourceIds[0],
          challengeId,
          memberId: user.diazz.userId,
          memberHandle: user.diazz.handle,
          roleId: config.SUBMITTER_RESOURCE_ROLE_ID,
          createdAt: new Date('2030-01-01T00:00:00.000Z'),
          createdBy: 'testdata'
        },
        {
          id: resourceIds[1],
          challengeId,
          memberId: '990001',
          memberHandle: 'pagination-one',
          roleId: config.SUBMITTER_RESOURCE_ROLE_ID,
          createdAt: new Date('2030-01-02T00:00:00.000Z'),
          createdBy: 'testdata'
        },
        {
          id: resourceIds[2],
          challengeId,
          memberId: '990002',
          memberHandle: 'pagination-two',
          roleId: config.SUBMITTER_RESOURCE_ROLE_ID,
          createdAt: new Date('2030-01-03T00:00:00.000Z'),
          createdBy: 'testdata'
        }
      ]
    })

    try {
      const result = await service.getResources(
        user.diazz,
        challengeId,
        config.SUBMITTER_RESOURCE_ROLE_ID,
        undefined,
        undefined,
        2,
        1,
        'created',
        'asc'
      )

      should.equal(result.total, 3)
      should.equal(result.page, 2)
      should.equal(result.perPage, 1)
      should.equal(result.data.length, 1)
      should.equal(result.data[0].id, resourceIds[1])
      should.equal(result.data[0].roleId, config.SUBMITTER_RESOURCE_ROLE_ID)

      const publicResult = await service.getResources(
        null,
        challengeId,
        config.SUBMITTER_RESOURCE_ROLE_ID,
        undefined,
        undefined,
        2,
        1,
        'created',
        'asc'
      )
      should.equal(publicResult.total, 3)
      should.equal(publicResult.data.length, 1)
      should.equal(publicResult.data[0].id, resourceIds[1])

      const hiddenRole = await service.getResources(
        null,
        challengeId,
        reviewerRoleId
      )
      should.equal(hiddenRole.total, 0)
      should.equal(hiddenRole.data.length, 0)
    } finally {
      await prisma.resource.deleteMany({
        where: { id: { in: resourceIds } }
      })
    }
  })

  it('combines privileged member and role filters without changing broad access', async () => {
    const result = await service.getResources(
      user.admin,
      challengeId,
      reviewerRoleId,
      user.phead.userId
    )

    should.equal(result.total, 1)
    should.equal(result.data.length, 1)
    should.equal(result.data[0].memberId, user.phead.userId)
    should.equal(result.data[0].roleId, reviewerRoleId)
  })

  it('forwards exact filters and exposes filtered pagination through response headers', async () => {
    const originalGetResources = service.getResources
    const responseHeaders = {}
    let responseBody
    let forwardedArguments
    const req = {
      authUser: user.diazz,
      path: '/v6/resources',
      query: {
        challengeId,
        roleId: submitterRoleId,
        memberId: user.diazz.userId,
        page: '2',
        perPage: '1',
        sortBy: 'created',
        sortOrder: 'asc'
      }
    }
    const res = {
      set: (name, value) => {
        responseHeaders[name] = value
      },
      send: (body) => {
        responseBody = body
      }
    }

    service.getResources = async (...args) => {
      forwardedArguments = args
      return {
        data: [{ id: 'filtered-resource' }],
        total: 3,
        page: 2,
        perPage: 1
      }
    }

    try {
      await controller.getResources(req, res)
    } finally {
      service.getResources = originalGetResources
    }

    should.deepEqual(forwardedArguments, [
      user.diazz,
      challengeId,
      submitterRoleId,
      user.diazz.userId,
      undefined,
      '2',
      '1',
      'created',
      'asc'
    ])
    should.deepEqual(responseBody, [{ id: 'filtered-resource' }])
    should.equal(responseHeaders['X-Prev-Page'], 1)
    should.equal(responseHeaders['X-Next-Page'], 3)
    should.equal(responseHeaders['X-Page'], 2)
    should.equal(responseHeaders['X-Per-Page'], 1)
    should.equal(responseHeaders['X-Total'], 3)
    should.equal(responseHeaders['X-Total-Pages'], 3)
    responseHeaders.Link.should.containEql(`roleId=${submitterRoleId}`)
    responseHeaders.Link.should.containEql(`memberId=${user.diazz.userId}`)
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
