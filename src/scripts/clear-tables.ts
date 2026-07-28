const logger = require('../common/logger')
const prisma = require('../common/prisma').getClient()

/**
 * Deletes resources, phase dependencies, and roles in foreign-key-safe order.
 *
 * This maintenance entrypoint uses the shared resources Prisma client and is
 * intended for explicitly requested environment cleanup.
 *
 * @returns A promise that resolves after all three tables have been cleared.
 * @throws Propagates any Prisma delete failure to the process-level handler.
 */
async function main () {
  logger.debug('Clearing Resource data')
  await prisma.resource.deleteMany({})
  logger.debug('Clearing ResourceRolePhaseDependency data')
  await prisma.resourceRolePhaseDependency.deleteMany({})
  logger.debug('Clearing ResourceRole data')
  await prisma.resourceRole.deleteMany({})
}

main()
  .then(() => {
    logger.info('All tables have been cleared. The processes is run asynchronously')
    process.exit()
  })
  .catch((err) => {
    logger.error(`Error clearing resource seed data ${err}`)
    logger.logFullError(err)
    process.exit(1)
  })
