/**
 * Simple (in-memory) migration strategy.
 *
 * This migrator loads the entire JSON file into memory using `loadJSON()` from the local utility.
 * 
 * It is suitable for small datasets (e.g., test files, mocks), as it prioritizes clarity and simplicity over memory efficiency.
 */

const prisma = require('../clients/prismaClient');
const { batchMigrator } = require('../utils/batchMigrator');

async function migrateResourceRolePhaseDependency(filePath) {
  await batchMigrator({
    filePath,
    batchSize: 100,
    label: 'ResourceRolePhaseDependency',
    errorLogFile: 'logs/rrpd_errors.log',
    handleRecord: async (record) => {
      const createdBy = record.createdBy || process.env.CREATED_BY;
      const phaseState = record.phaseState ?? (process.env.DEFAULT_PHASE_STATE === 'true');

      await prisma.resourceRolePhaseDependency.upsert({
        where: { id: record.id },
        update: {
          phaseId: record.phaseId,
          resourceRoleId: record.resourceRoleId,
          phaseState,
          createdAt: record.createdAt ? new Date(record.createdAt) : new Date(),
          createdBy,
          updatedAt: record.updatedAt ? new Date(record.updatedAt) : null,
          updatedBy: record.updatedBy || null
        },
        create: {
          id: record.id,
          phaseId: record.phaseId,
          resourceRoleId: record.resourceRoleId,
          phaseState,
          createdAt: record.createdAt ? new Date(record.createdAt) : new Date(),
          createdBy,
          updatedAt: record.updatedAt ? new Date(record.updatedAt) : null,
          updatedBy: record.updatedBy || null
        }
      });
    }
  });
}

module.exports = { migrateResourceRolePhaseDependency };

