/**
 * Simple (in-memory) migration strategy.
 *
 * This migrator loads the entire JSON file into memory using `loadJSON()` from the local utility.
 * 
 * It is suitable for small datasets (e.g., test files, mocks), as it prioritizes clarity and simplicity over memory efficiency.
 */

const prisma = require('../clients/prismaClient');
const { batchMigrator } = require('../utils/batchMigrator');

const DEFAULT_CREATED_BY = process.env.CREATED_BY || process.env.DEFAULT_CREATED_BY || '151743';
const DEFAULT_UPDATED_BY = process.env.UPDATED_BY || DEFAULT_CREATED_BY;

const parseTimestamp = (value) => {
  const t = value ? new Date(value) : null;
  return t && !isNaN(t.getTime()) ? t : null;
};

async function migrateResourceRole(filePath, startDate) {
  const startDateObj = startDate ? new Date(startDate) : null;
  const isInvalidStartDate = startDate && isNaN(startDateObj.getTime());
  const filterStartDate = !isInvalidStartDate ? startDateObj : null;

  if (isInvalidStartDate) {
    console.warn('migrateResourceRole: invalid startDate provided; disabling date filter.', startDate);
  }

  const filterRecord = filterStartDate
    ? (role) => {
        const createdAtDate = parseTimestamp(role.createdAt);
        const updatedAtDate = parseTimestamp(role.updatedAt);

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
    label: 'ResourceRole',
    errorLogFile: 'logs/resourcerole_errors.log',
    filterRecord,
    handleRecord: async (role) => {
      const createdAt = parseTimestamp(role.createdAt) ?? new Date();
      const updatedAt = parseTimestamp(role.updatedAt) ?? new Date();
      const createdBy = (role.createdBy && `${role.createdBy}`) || DEFAULT_CREATED_BY;
      const updatedBy = (role.updatedBy && `${role.updatedBy}`) || DEFAULT_UPDATED_BY;
      const fullReadAccess = role.fullReadAccess ?? (role.fullAccess ?? (process.env.DEFAULT_READ_ACCESS === 'true'));
      const fullWriteAccess = role.fullWriteAccess ?? (role.fullAccess ?? (process.env.DEFAULT_READ_ACCESS === 'true'));
      const isActive = role.isActive ?? (process.env.DEFAULT_IS_ACTIVE === 'true');
      const selfObtainable = role.selfObtainable ?? (process.env.DEFAULT_SELF_OBTAINABLE === 'true');

      await prisma.resourceRole.upsert({
        where: { id: role.id },
        update: {
          name: role.name,
          nameLower: role.nameLower,
          fullReadAccess,
          fullWriteAccess,
          isActive,
          selfObtainable,
          legacyId: role.legacyId ?? null,
          createdAt,
          createdBy,
          updatedAt,
          updatedBy
        },
        create: {
          id: role.id,
          name: role.name,
          nameLower: role.nameLower,
          fullReadAccess,
          fullWriteAccess,
          isActive,
          selfObtainable,
          legacyId: role.legacyId ?? null,
          createdAt,
          createdBy,
          updatedAt,
          updatedBy
        }
      });
    }
  });
}

module.exports = { migrateResourceRole };
