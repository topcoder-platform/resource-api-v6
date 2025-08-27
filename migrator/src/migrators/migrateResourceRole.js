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

async function migrateResourceRoles(filePath) {
  const roles = await loadJSON(filePath);

  let successCount = 0;
  let failCount = 0;

  for (const role of roles) {
    try {
      const createdBy = role.createdBy || process.env.CREATED_BY;

      await prisma.resourceRole.upsert({
        where: { id: role.id },
        update: {
          name: role.name,
          nameLower: role.nameLower,
          fullReadAccess: role.fullReadAccess ?? false,
          fullWriteAccess: role.fullWriteAccess ?? false,
          isActive: role.isActive ?? true,
          selfObtainable: role.selfObtainable ?? false,
          legacyId: role.legacyId ?? null,
          createdAt: new Date(),
          createdBy,
          updatedAt: null,
          updatedBy: null
        },
        create: {
          id: role.id,
          name: role.name,
          nameLower: role.nameLower,
          fullReadAccess: role.fullReadAccess ?? false,
          fullWriteAccess: role.fullWriteAccess ?? false,
          isActive: role.isActive ?? true,
          selfObtainable: role.selfObtainable ?? false,
          legacyId: role.legacyId ?? null,
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
      fs.appendFileSync('logs/resourcerole_errors.log', `id=${role.id} - ${message}\n`);
    }
  }

  console.log(`✅ ResourceRole migration finished: ${successCount} success, ${failCount} failed`);
}

module.exports = { migrateResourceRoles };

