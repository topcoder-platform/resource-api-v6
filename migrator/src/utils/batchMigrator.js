// utils/batchMigrator.js
const fs = require('fs');
const { chain } = require('stream-chain');
const { parser } = require('stream-json');
const { streamArray } = require('stream-json/streamers/StreamArray');
const { createSimpleProgressBar } = require('./progressLogger');
const { countJsonRecordsByBrace } = require('./countJsonRecordsByBrace');

/**
 * Generic batch migrator for large JSON datasets.
 *
 * Supports both standard JSON arrays and NDJSON line-by-line formats.
 *
 * @param {string} filePath - Path to the input JSON or NDJSON file.
 * @param {number} [batchSize=100] - Number of records per batch.
 * @param {string} label - Descriptive label used for logging and progress output.
 * @param {function} handleRecord - Async function to process a single record (e.g., Prisma upsert).
 * @param {string} errorLogFile - File path to log failed record operations.
 * @param {boolean} [isNdjson=false] - Set to true if the file is in NDJSON format (one JSON object per line).
 * @param {number} [totalRecords] - Optional. Total number of records for progress tracking. If not provided, it will be estimated automatically.
 * @param {function} [filterRecord] - Optional callback that returns true to include a record or false to skip it.
 */

async function batchMigrator({ filePath, batchSize = 100, label, handleRecord, errorLogFile, totalRecords, filterRecord }) {
  const total = totalRecords ?? await countJsonRecordsByBrace(filePath);
  const progress = createSimpleProgressBar(Math.ceil(total / batchSize));

  const pipeline = chain([
    fs.createReadStream(filePath),
    parser(),
    streamArray()
  ]);

  let batch = [];
  let successCount = 0;
  let failCount = 0;

  for await (const { value: record } of pipeline) {
    if (filterRecord && !filterRecord(record)) {
      continue;
    }

    batch.push(record);

    if (batch.length >= batchSize) {
      await processBatch(batch);
      progress.tick();
      batch = [];
    }
  }

  if (batch.length > 0) {
    await processBatch(batch);
    progress.tick();
  }

  progress.done();
  console.log(`✅ ${label} migration finished: ${successCount} success, ${failCount} failed`);

  async function processBatch(batch) {
    const results = await Promise.allSettled(batch.map(record => handleRecord(record)));

    results.forEach((result, idx) => {
      if (result.status === 'fulfilled') {
        successCount++;
      } else {
        failCount++;
        const message = result.reason?.message?.split('\n').at(-1) || 'Unknown error';
        const id = batch[idx]?.userId || batch[idx]?.id || 'unknown';
        fs.appendFileSync(errorLogFile, `id=${id} - ${message}\n`);
      }
    });
  }
}

module.exports = { batchMigrator };
