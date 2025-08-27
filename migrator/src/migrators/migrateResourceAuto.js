/**
 * Auto migration handler.
 *
 * This module decides whether to use the batch (streaming) or simple (in-memory) version of the migrator
 * depending on the input file size.
 *
 * - Batch version processes the file using streaming (stream-json), which is ideal for large datasets.
 * - Simple version loads the entire file into memory, suitable for small or test datasets.
 *
 * This approach ensures performance and memory efficiency when handling real-world data.
 */

const fs = require('fs');
const { migrateResource } = require('./migrateResource');
const { migrateResource: migrateBatch } = require('./migrateResourceBatch');

const FILE_SIZE_THRESHOLD = 3 * 1024 * 1024; // 3 MB

async function migrateResourceAuto(filePath) {
  const stats = fs.statSync(filePath);
  const fileSize = stats.size;

  if (fileSize < FILE_SIZE_THRESHOLD) {
    // Using normal migration (in-memory)
    await migrateResource(filePath);
  } else {
    // Using batch migration (streaming)
    await migrateBatch(filePath);
  }
}

module.exports = { migrateResourceAuto };
