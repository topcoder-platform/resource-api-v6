/**
 * Unit test of ResourceService - create resource.
 */

const _ = require('lodash')
const config = require('config')
const should = require('should')
const { v4: uuid } = require('uuid')
const service = require('../../src/services/ResourceService')
const ResourceRolePhaseDependencyService = require('../../src/services/ResourceRolePhaseDependencyService')
const prisma = require('../../src/common/prisma').getClient()
const helper = require('../../src/common/helper')
const ResourceRoleService = require('../../src/services/ResourceRoleService')
const { requestBody, user } = require('../common/testData')
const { assertValidationError, assertError, assertResource, getRoleIds, clearDependencies } = require('../common/testHelper')

const challengeId1 = 'fe6d0a58-ce7d-4521-8501-b8132b1c0391'
const challengeId2 = 'fe6d0a58-ce7d-4521-8501-b8132b1c0392'
const challengeId3 = 'fe6d0a58-ce7d-4521-8501-b8132b1c0393'
const challengeId4 = 'fe6d0a58-ce7d-4521-8501-b8132b1c0394'
const phaseId1 = 'ad123e44-c6c4-4cb3-8c60-e0339e1eaa3e'
const phaseId2 = 'ad123e44-c6c4-4cb3-8c60-e0339e1eaa40'
const phaseId3 = 'ad123e44-c6c4-4cb3-8c60-e0339e1eaa41'
const phaseId4 = 'ad123e44-c6c4-4cb3-8c60-e0339e1eaa42'
const challengeNotFoundId = '11111111-ce7d-4521-8501-b8132b1c0391'
const resources = requestBody.resources

module.exports = describe('Create resource', () => {
  let copilotRoleId
  let observerRoleId
  let submitterRoleId
  let reviewerRoleId
  let dependency

  before(async () => {
    const ret = await getRoleIds()
    copilotRoleId = ret.copilotRoleId
    observerRoleId = ret.observerRoleId
    submitterRoleId = ret.submitterRoleId
    reviewerRoleId = ret.reviewerRoleId

    const records = await ResourceRolePhaseDependencyService.getDependencies({ resourceRoleId: copilotRoleId })
    dependency = records.data[0]
  })

  describe('create resource - wrong phase cases', async () => {
    before(async () => {
      await ResourceRoleService.updateResourceRole(user.admin, copilotRoleId, {
        name: 'co-pilot',
        isActive: true,
        fullReadAccess: true,
        fullWriteAccess: true,
        selfObtainable: true
      })
    })

    after(async () => {
      await ResourceRoleService.updateResourceRole(user.admin, copilotRoleId, {
        name: 'co-pilot',
        isActive: true,
        fullReadAccess: true,
        fullWriteAccess: true,
        selfObtainable: false
      })
    })

    it('create resource - wrong phase state 1', async () => {
      await ResourceRolePhaseDependencyService.updateDependency(user.admin, dependency.id, {
        phaseId: dependency.phaseId,
        resourceRoleId: dependency.resourceRoleId,
        phaseState: false
      })
      try {
        const entity = resources.createBody('phead', copilotRoleId, challengeId1)
        await service.createResource(user.phead, entity)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.name, 'BadRequestError')
        assertError(err, `Phase ${dependency.phaseId} should not be open`)
      }
    })

    it('create resource - wrong phase state 2', async () => {
      await ResourceRolePhaseDependencyService.updateDependency(user.admin, dependency.id, {
        phaseId: phaseId1,
        resourceRoleId: dependency.resourceRoleId,
        phaseState: true
      })
      try {
        const entity = resources.createBody('phead', copilotRoleId, challengeId1)
        await service.createResource(user.phead, entity)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.name, 'BadRequestError')
        assertError(err, `Phase ${phaseId1} should be open`)
      }
    })

    it('create resource - wrong phase state 3', async () => {
      await ResourceRolePhaseDependencyService.updateDependency(user.admin, dependency.id, {
        phaseId: phaseId2,
        resourceRoleId: dependency.resourceRoleId,
        phaseState: true
      })
      try {
        const entity = resources.createBody('phead', copilotRoleId, challengeId1)
        await service.createResource(user.phead, entity)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.name, 'BadRequestError')
        assertError(err, `Phase ${phaseId2} should be open`)
      }
    })

    it('create resource - wrong phase state 4', async () => {
      await ResourceRolePhaseDependencyService.updateDependency(user.admin, dependency.id, {
        phaseId: phaseId3,
        resourceRoleId: dependency.resourceRoleId,
        phaseState: true
      })
      try {
        const entity = resources.createBody('phead', copilotRoleId, challengeId1)
        await service.createResource(user.phead, entity)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.name, 'BadRequestError')
        assertError(err, `Phase ${phaseId3} should be open`)
      }
    })
  })

  describe('create resource - other cases', async () => {
    it('create resource - task already assign', async () => {
      const resourceId = uuid()
      await prisma.resource.create({
        data: {
          id: resourceId,
          challengeId: challengeId2,
          memberId: '22742764',
          memberHandle: 'phead',
          roleId: config.SUBMITTER_RESOURCE_ROLE_ID,
          createdBy: 'testdata'
        }
      })
      try {
        const entity = resources.createBody('phead', config.SUBMITTER_RESOURCE_ROLE_ID, challengeId2)
        await service.createResource(user.phead, entity)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.name, 'ConflictError')
        assertError(err, 'The Task is already assigned')
      } finally {
        await prisma.resource.deleteMany({
          where: { id: resourceId }
        })
      }
    })

    it('create resource by admin', async () => {
      await ResourceRolePhaseDependencyService.updateDependency(user.admin, dependency.id, {
        phaseId: dependency.phaseId,
        resourceRoleId: dependency.resourceRoleId,
        phaseState: true
      })
      const entity = resources.createBody('phead', copilotRoleId, challengeId1)
      const ret = await service.createResource(user.admin, entity)
      should.equal(ret.roleId, entity.roleId)
      should.equal(ret.memberHandle.toLowerCase(), entity.memberHandle.toLowerCase())
      await assertResource(ret.id, ret)
    })

    it('failure - create duplicate resource 1', async () => {
      const entity = resources.createBody('phead', copilotRoleId, challengeId1)
      try {
        await service.createResource(user.phead, entity)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.name, 'ConflictError')
        assertError(err, `User phead already has resource with roleId: ${copilotRoleId} in challenge: ${challengeId1}`)
      }
    })

    it('failure - create duplicate resource 2', async () => {
      await ResourceRolePhaseDependencyService.updateDependency(user.admin, dependency.id, {
        phaseId: phaseId4,
        resourceRoleId: dependency.resourceRoleId,
        phaseState: true
      })

      const entity = resources.createBody('phead', copilotRoleId, challengeId1)
      try {
        await service.createResource(user.phead, entity)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.name, 'ConflictError')
        assertError(err, `User phead already has resource with roleId: ${copilotRoleId} in challenge: ${challengeId1}`)
      }

      // remove the dependencies so that below tests will not have these limitations
      await clearDependencies()
    })

    it('create another resource for user phead', async () => {
      const entity = resources.createBody('phead', reviewerRoleId, challengeId1)
      const ret = await service.createResource(user.admin, entity)
      should.equal(ret.roleId, entity.roleId)
      should.equal(ret.memberHandle.toLowerCase(), entity.memberHandle.toLowerCase())
      await assertResource(ret.id, ret)
    })

    it('create resource by user', async () => {
      const entity = resources.createBody('diazz', submitterRoleId, challengeId1)
      const ret = await service.createResource(user.diazz, entity)
      should.equal(ret.roleId, entity.roleId)
      should.equal(ret.memberHandle.toLowerCase(), entity.memberHandle.toLowerCase())
      await assertResource(ret.id, ret)
    })

    it('failure - create self obtainable resource for other user by normal user forbidden', async () => {
      const entity = resources.createBody('lunarkid', config.SUBMITTER_RESOURCE_ROLE_ID, challengeId3)
      try {
        await service.createResource(user.diazz, entity)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.name, 'BadRequestError')
        // assertError(err, `Only M2M, admin or user with full access role can perform this action`)
      }
    })

    it('failure - create resource when user has not yet agreed terms', async () => {
      const entity = resources.createBody('lunarkid', config.SUBMITTER_RESOURCE_ROLE_ID, challengeId1)
      try {
        await service.createResource(user.admin, entity)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.name, 'BadRequestError')
        // assertError(err, 'The user has not yet agreed to the following terms: [term_title]')
      }
    })

    it('create self obtainable resource by user itself', async () => {
      const entity = resources.createBody('lunarkid', submitterRoleId, challengeId1)
      const ret = await service.createResource(user.lunarkid, entity)
      should.equal(ret.roleId, entity.roleId)
      should.equal(ret.memberHandle.toLowerCase(), entity.memberHandle.toLowerCase())
      await assertResource(ret.id, ret)
    })

    it('failure - create non self obtainable resource by normal user forbidden', async () => {
      const entity = resources.createBody('lunarkid', copilotRoleId, challengeId1)
      try {
        await service.createResource(user.lunarkid, entity)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.name, 'ForbiddenError')
        assertError(err, `Only M2M, admin or user with full access role can perform this action`)
      }
    })

    it('create resource using m2m token', async () => {
      const entity = resources.createBody('ghostar', submitterRoleId, challengeId1)
      const ret = await service.createResource(user.m2m, entity)
      should.equal(ret.roleId, entity.roleId)
      should.equal(ret.memberHandle.toLowerCase(), entity.memberHandle.toLowerCase())
      await assertResource(ret.id, ret)
    })

    it('copilot can manage resources without full access flags', async () => {
      const originalRole = await helper.getById('ResourceRole', copilotRoleId)
      await ResourceRoleService.updateResourceRole(user.admin, copilotRoleId, {
        name: originalRole.name,
        fullReadAccess: false,
        fullWriteAccess: false,
        isActive: originalRole.isActive,
        selfObtainable: originalRole.selfObtainable
      })

      const entity = resources.createBody('diazz', reviewerRoleId, challengeId2)
      let createdResource
      try {
        createdResource = await service.createResource(user.phead, entity)
        should.equal(createdResource.roleId, entity.roleId)
        should.equal(createdResource.memberHandle.toLowerCase(), entity.memberHandle.toLowerCase())
        await assertResource(createdResource.id, createdResource)
      } finally {
        if (createdResource && createdResource.id) {
          await prisma.resource.deleteMany({
            where: { id: createdResource.id }
          })
        }
        await ResourceRoleService.updateResourceRole(user.admin, copilotRoleId, {
          name: originalRole.name,
          fullReadAccess: originalRole.fullReadAccess,
          fullWriteAccess: originalRole.fullWriteAccess,
          isActive: originalRole.isActive,
          selfObtainable: originalRole.selfObtainable
        })
      }
    })

    it('create resource for user ghostar 1', async () => {
      const entity = resources.createBody('ghostar', reviewerRoleId, challengeId2)
      const ret = await service.createResource(user.m2m, entity)
      should.equal(ret.roleId, entity.roleId)
      should.equal(ret.memberHandle.toLowerCase(), entity.memberHandle.toLowerCase())
      await assertResource(ret.id, ret)
    })

    it('create resource for user ghostar 2', async () => {
      const entity = resources.createBody('ghostar', reviewerRoleId, challengeId3)
      const ret = await service.createResource(user.m2m, entity)
      should.equal(ret.roleId, entity.roleId)
      should.equal(ret.memberHandle.toLowerCase(), entity.memberHandle.toLowerCase())
      await assertResource(ret.id, ret)
    })

    it('failure - create resource using inactive role', async () => {
      const entity = resources.createBody('ghostar', observerRoleId, challengeId1)
      try {
        await service.createResource(user.m2m, entity)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.name, 'BadRequestError')
        assertError(err, `Resource role with id: ${observerRoleId} is inactive, please use an active one.`)
      }
    })

    it('failure - create resource using non-existed role', async () => {
      const entity = resources.createBody('ghostar', challengeId1, challengeId1)
      try {
        await service.createResource(user.m2m, entity)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.name, 'BadRequestError')
        assertError(err, `No resource role found with id: ${challengeId1}.`)
      }
    })

    it(`failure - create resource member doesn't exist`, async () => {
      const entity = resources.createBody('123abcx', observerRoleId, challengeId1)
      try {
        await service.createResource(user.m2m, entity)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.name, 'BadRequestError')
        assertError(err, `User with handle: 123abcx doesn't exist`)
      }
    })

    it(`failure - create resource group access denied`, async () => {
      const entity = resources.createBody('diazz', submitterRoleId, challengeId4)
      try {
        await service.createResource(user.diazz, entity)
        throw new Error('should not throw error here')
      } catch (err) {
        console.log(err)
        should.equal(err.name, 'UnauthorizedError')
        assertError(err, `The user does not have access to the groups assigned to the challenge.`)
      }
    })

    let { stringFields, requiredFields, testBody } = resources

    it(`test invalid parameters, challengeId must be UUID`, async () => {
      try {
        let entity = _.cloneDeep(testBody)
        entity.challengeId = 'invalid'
        await service.createResource(user.m2m, entity)
        throw new Error('should not throw error here')
      } catch (err) {
        assertValidationError(err, '"challengeId" must be a valid GUID')
      }
    })

    for (const stringField of stringFields) {
      it(`test invalid parameters, invalid string type field ${stringField}`, async () => {
        let entity = _.cloneDeep(testBody)
        _.set(entity, stringField, 123)
        try {
          await service.createResource(user.m2m, entity)
          throw new Error('should not throw error here')
        } catch (err) {
          assertValidationError(err, `"${stringField}" must be a string`)
        }
      })
    }

    for (const requiredField of requiredFields) {
      it(`test invalid parameters, required field ${requiredField} is missing`, async () => {
        let entity = _.cloneDeep(testBody)
        entity = _.omit(entity, requiredField)
        try {
          await service.createResource(user.m2m, entity)
          throw new Error('should not throw error here')
        } catch (err) {
          assertValidationError(err, `"${requiredField}" is required`)
        }
      })
    }

    it('failure - create resource for non-existed challenge', async () => {
      const entity = resources.createBody('ghostar', observerRoleId, challengeNotFoundId)
      try {
        await service.createResource(user.m2m, entity)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 404)
        should.equal(err.response.body.message, `Challenge with id: ${challengeNotFoundId} doesn't exist.`)
      }
    })
  })
})
