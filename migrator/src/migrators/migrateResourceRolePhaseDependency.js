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

async function migrateResourceRolePhaseDependencies(filePath) {
  const records = await loadJSON(filePath);

  let successCount = 0;
  let failCount = 0;

  for (const record of records) {
    try {
      const createdBy = record.createdBy || process.env.CREATED_BY;

      await prisma.resourceRolePhaseDependency.upsert({
        where: { id: record.id },
        update: {
          phaseId: record.phaseId,
          resourceRoleId: record.resourceRoleId,
          phaseState: record.phaseState ?? false,
          createdAt: new Date(),
          createdBy,
          updatedAt: null,
          updatedBy: null
        },
        create: {
          id: record.id,
          phaseId: record.phaseId,
          resourceRoleId: record.resourceRoleId,
          phaseState: record.phaseState ?? false,
          createdAt: new Date(),
          createdBy,
          updatedAt: null,
          updatedBy: null
        }
      });
      successCount++;
    } catch (err) {
      failCount++;
      const message = err.message.split('\n').at(-1);
      fs.appendFileSync('logs/rrpd_errors.log', `id=${record.id} - ${message}\n`);
    }
  }

  console.log(`✅ ResourceRolePhaseDependency migration finished: ${successCount} success, ${failCount} failed`);
}

module.exports = { migrateResourceRolePhaseDependencies };

