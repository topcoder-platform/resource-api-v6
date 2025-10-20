/**
 * Simple (in-memory) migration strategy.
 *
 * This migrator loads the entire JSON file into memory using `loadJSON()` from the local utility.
 * 
 * It is suitable for small datasets (e.g., test files, mocks), as it prioritizes clarity and simplicity over memory efficiency.
 */

const fs = require('fs');
const { loadJSON } = require('../clients/dynamoLoader');
const prisma = require('../clients/prismaClient');

const DEFAULT_CREATED_BY = process.env.CREATED_BY || process.env.DEFAULT_CREATED_BY || '151743';
const DEFAULT_UPDATED_BY = process.env.UPDATED_BY || DEFAULT_CREATED_BY;

const parseTimestamp = (value) => {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? null : parsed;
};

async function migrateResourceRole(filePath, startDate) {
  const roles = await loadJSON(filePath);

  let successCount = 0;
  let failCount = 0;
  let skippedCount = 0;
  const startDateObj = startDate ? new Date(startDate) : null;

  for (const role of roles) {
    try {
      const createdDate = parseTimestamp(role.createdAt);
      const updatedDate = parseTimestamp(role.updatedAt);

      const createdBeforeOrMissing = !createdDate || (startDateObj ? createdDate < startDateObj : false);
      const updatedBeforeOrMissing = !updatedDate || (startDateObj ? updatedDate < startDateObj : false);

      if (startDateObj && createdBeforeOrMissing && updatedBeforeOrMissing) {
        skippedCount++;
        continue;
      }

      const createdAt = createdDate ?? new Date();
      const updatedAt = updatedDate ?? new Date();
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

      successCount++;
    } catch (err) {
      failCount++;
      const message = err.message.split('\n').at(-1);
      fs.appendFileSync('logs/resourcerole_errors.log', `id=${role.id} - ${message}\n`);
    }
  }

  console.log(`✅ ResourceRole migration finished: ${successCount} success, ${failCount} failed, ${skippedCount} skipped`);
}

module.exports = { migrateResourceRole };
