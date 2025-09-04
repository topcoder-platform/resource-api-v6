/**
 * Simple (in-memory) migration strategy.
 *
 * This migrator loads the entire JSON file into memory using `loadJSON()` from the local utility.
 * 
 * It is suitable for small datasets (e.g., test files, mocks), as it prioritizes clarity and simplicity over memory efficiency.
 */

const fs = require('fs');
const { migrateResourceRolePhaseDependency } = require('./migrateResourceRolePhaseDependency');
const { migrateResourceRolePhaseDependency: migrateBatch } = require('./migrateResourceRolePhaseDependencyBatch');

const FILE_SIZE_THRESHOLD = 3 * 1024 * 1024; // 3 MB

async function migrateResourceRolePhaseDependencyAuto(filePath) {
  const stats = fs.statSync(filePath);
  const fileSize = stats.size;

  if (fileSize < FILE_SIZE_THRESHOLD) {
    // Using normal migration (in-memory)
    await migrateResourceRolePhaseDependency(filePath);
  } else {
    // Using batch migration (streaming)
    await migrateBatch(filePath);
  }
}

module.exports = { migrateResourceRolePhaseDependencyAuto };


