/**
 * Removes automated-test records from the Resources API database.
 */

const _ = require('lodash')
const config = require('config')
const logger = require('../common/logger')
const prisma = require('../common/prisma').getClient()

/**
 * Deletes Postman-created roles and their dependent records.
 *
 * Records are selected by the existing AUTOMATED_TESTING_NAME_PREFIX setting.
 * Dependencies and resources are deleted before roles to satisfy relational
 * constraints. CleanUpController uses this operation for the protected internal
 * cleanup endpoint.
 *
 * @returns A promise that resolves when all matching records have been deleted.
 * @throws Propagates Prisma query and deletion failures to the HTTP error handler.
 */
async function cleanUpTestData (): Promise<void> {
  logger.info('clear the test data from postman test!')
  const roles = await prisma.resourceRole.findMany({
    where: {
      name: { startsWith: config.AUTOMATED_TESTING_NAME_PREFIX }
    }
  })
  const roleIds = _.map(roles, 'id')
  logger.info('Clearing ResourceRolePhaseDependency')
  await prisma.resourceRolePhaseDependency.deleteMany({ where: { resourceRoleId: { in: roleIds } } })
  logger.info('Clearing Resource')
  await prisma.resource.deleteMany({ where: { roleId: { in: roleIds } } })
  logger.info('Clearing ResourceRole')
  await prisma.resourceRole.deleteMany({ where: { id: { in: roleIds } } })
  logger.info('clear the test data from postman test completed!')
}

module.exports = {
  cleanUpTestData
}

logger.buildService(module.exports)
