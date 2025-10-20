/**
 * Simple (in-memory) migration strategy.
 *
 * This migrator loads the entire JSON file into memory using `loadJSON()` from the local utility.
 * 
 * It is suitable for small datasets (e.g., test files, mocks), as it prioritizes clarity and simplicity over memory efficiency.
 */

const prisma = require('../clients/prismaClient');
const { batchMigrator } = require('../utils/batchMigrator');

const parseTimestamp = (value) => {
  const t = value ? new Date(value) : null;
  return t && !isNaN(t.getTime()) ? t : null;
};

async function migrateResourceRolePhaseDependency(filePath, startDate) {
  const startDateObj = startDate ? new Date(startDate) : null;
  const isInvalidStartDate = startDate && isNaN(startDateObj.getTime());
  const filterStartDate = !isInvalidStartDate ? startDateObj : null;

  if (isInvalidStartDate) {
    console.warn(
      'migrateResourceRolePhaseDependency: invalid startDate provided; disabling date filter.',
      startDate
    );
  }

  const filterRecord = filterStartDate
    ? (record) => {
        const createdAtDate = parseTimestamp(record.createdAt);
        const updatedAtDate = parseTimestamp(record.updatedAt);

        const shouldSkip =
          (!createdAtDate && !updatedAtDate) ||
          (((createdAtDate && createdAtDate < filterStartDate) || !createdAtDate) &&
            ((updatedAtDate && updatedAtDate < filterStartDate) || !updatedAtDate));

        return !shouldSkip;
      }
    : undefined;

  await batchMigrator({
    filePath,
    batchSize: 100,
    label: 'ResourceRolePhaseDependency',
    errorLogFile: 'logs/rrpd_errors.log',
    filterRecord,
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
