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

async function migrateResourceRolePhaseDependency(filePath, startDate) {
  const records = await loadJSON(filePath);

  let successCount = 0;
  let failCount = 0;
  let skippedCount = 0;
  const startDateObj = startDate ? new Date(startDate) : null;

  for (const record of records) {
    try {
      const createdRaw = record.createdAt;
      const updatedRaw = record.updatedAt;

      let createdDate = createdRaw ? new Date(createdRaw) : null;
      if (createdDate && isNaN(createdDate.getTime())) {
        createdDate = null;
      }

      let updatedDate = updatedRaw ? new Date(updatedRaw) : null;
      if (updatedDate && isNaN(updatedDate.getTime())) {
        updatedDate = null;
      }

      const createdBeforeOrMissing = !createdDate || (startDateObj ? createdDate < startDateObj : false);
      const updatedBeforeOrMissing = !updatedDate || (startDateObj ? updatedDate < startDateObj : false);

      if (startDateObj && createdBeforeOrMissing && updatedBeforeOrMissing) {
        skippedCount++;
        continue;
      }

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
      successCount++;
    } catch (err) {
      failCount++;
      const message = err.message.split('\n').at(-1);
      fs.appendFileSync('logs/rrpd_errors.log', `id=${record.id} - ${message}\n`);
    }
  }

  console.log(`✅ ResourceRolePhaseDependency migration finished: ${successCount} success, ${failCount} failed, ${skippedCount} skipped`);
}

module.exports = { migrateResourceRolePhaseDependency };
