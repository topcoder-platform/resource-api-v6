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

async function migrateResourceRole(filePath) {
  const roles = await loadJSON(filePath);

  let successCount = 0;
  let failCount = 0;

  for (const role of roles) {
    try {
      const createdBy = role.createdBy || process.env.CREATED_BY;
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
          createdAt: role.createdAt ? new Date(role.createdAt) : new Date(),
          createdBy,
          updatedAt: role.updatedAt ? new Date(role.updatedAt) : null,
          updatedBy: role.updatedBy || null
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
          createdAt: role.createdAt ? new Date(role.createdAt) : new Date(),
          createdBy,
          updatedAt: role.updatedAt ? new Date(role.updatedAt) : null,
          updatedBy: role.updatedBy || null
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

module.exports = { migrateResourceRole };

