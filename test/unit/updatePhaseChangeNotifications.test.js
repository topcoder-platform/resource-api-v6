/**
 * Unit test of ResourceService - update phase change notifications.
 */

const should = require('should')
const { v4: uuid } = require('uuid')
const service = require('../../src/services/ResourceService')
const prisma = require('../../src/common/prisma').getClient()
const { user } = require('../common/testData')
const { assertValidationError, assertError, getRoleIds } = require('../common/testHelper')

module.exports = describe('Update phase change notifications', () => {
  let submitterRoleId
  let createdResourceIds = []

  before(async () => {
    const roles = await getRoleIds()
    submitterRoleId = roles.submitterRoleId
  })

  afterEach(async () => {
    if (createdResourceIds.length) {
      await prisma.resource.deleteMany({ where: { id: { in: createdResourceIds } } })
      createdResourceIds = []
    }
  })

  async function createResourceForUser (member, overrides = {}) {
    const data = Object.assign({
      id: uuid(),
      challengeId: uuid(),
      memberId: String(overrides.memberId || member.userId),
      memberHandle: overrides.memberHandle || member.handle,
      roleId: overrides.roleId || submitterRoleId,
      createdBy: String(overrides.createdBy || member.userId),
      phaseChangeNotifications: typeof overrides.phaseChangeNotifications === 'undefined' ? true : overrides.phaseChangeNotifications
    }, overrides)

    const created = await prisma.resource.create({ data })
    createdResourceIds.push(created.id)
    return created
  }

  it('allows the resource owner to disable notifications', async () => {
    const record = await createResourceForUser(user.diazz)

    const result = await service.updatePhaseChangeNotifications(user.diazz, record.id, { phaseChangeNotifications: false })
    should.equal(result.phaseChangeNotifications, false)

    const updated = await prisma.resource.findUnique({ where: { id: record.id } })
    should.exist(updated)
    should.equal(updated.phaseChangeNotifications, false)
  })

  it('allows the resource owner to re-enable notifications', async () => {
    const record = await createResourceForUser(user.diazz, { phaseChangeNotifications: false })

    const result = await service.updatePhaseChangeNotifications(user.diazz, record.id, { phaseChangeNotifications: true })
    should.equal(result.phaseChangeNotifications, true)

    const updated = await prisma.resource.findUnique({ where: { id: record.id } })
    should.exist(updated)
    should.equal(updated.phaseChangeNotifications, true)
  })

  it('prevents members from updating other resources', async () => {
    const record = await createResourceForUser(user.phead)

    try {
      await service.updatePhaseChangeNotifications(user.diazz, record.id, { phaseChangeNotifications: false })
      throw new Error('should not throw error here')
    } catch (err) {
      should.equal(err.name, 'ForbiddenError')
      assertError(err, 'You may only update your own phase change notification preference.')
    }
  })

  it('allows administrators to update any resource', async () => {
    const record = await createResourceForUser(user.diazz)

    const result = await service.updatePhaseChangeNotifications(user.admin, record.id, { phaseChangeNotifications: false })
    should.equal(result.phaseChangeNotifications, false)
  })

  it('allows machine-to-machine tokens with update scope to update any resource', async () => {
    const record = await createResourceForUser(user.diazz)

    const result = await service.updatePhaseChangeNotifications(user.m2m, record.id, { phaseChangeNotifications: true })
    should.equal(result.phaseChangeNotifications, true)
  })

  it('throws NotFoundError when resource does not exist', async () => {
    const missingId = uuid()
    try {
      await service.updatePhaseChangeNotifications(user.admin, missingId, { phaseChangeNotifications: true })
      throw new Error('should not throw error here')
    } catch (err) {
      should.equal(err.name, 'NotFoundError')
      assertError(err, `Resource with id ${missingId} not found`)
    }
  })

  it('validates request payload', async () => {
    const record = await createResourceForUser(user.diazz)
    try {
      await service.updatePhaseChangeNotifications(user.diazz, record.id, { phaseChangeNotifications: 'invalid' })
      throw new Error('should not throw error here')
    } catch (err) {
      assertValidationError(err, '"phaseChangeNotifications" must be a boolean')
    }
  })
})
