/**
 * Batch migration strategy for NDJSON format (ElasticSearch export).
 *
 * This migrator reads the file line-by-line using `readline`, where each line is a valid JSON object.
 * Each line is parsed, extracted from its `_source` field (ElasticSearch convention), and processed in batches.
 *
 * Suitable for large NDJSON datasets exported from ElasticSearch.
 */

const fs = require('fs');
const readline = require('readline');
const prisma = require('../clients/prismaClient');
const { countFileLines } = require('../utils/countFileLines');
const { createSimpleProgressBar } = require('../utils/progressLogger');

const parseTimestamp = (value) => {
  const t = value ? new Date(value) : null;
  return t && !isNaN(t.getTime()) ? t : null;
};

async function migrateResource(filePath, startDate) {
  // Estimar el total de líneas del archivo NDJSON
  const totalRecords = await countFileLines(filePath);
  const progress = createSimpleProgressBar(Math.ceil(totalRecords / 100));

  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const batchSize = 100;
  let batch = [];
  let successCount = 0;
  let failCount = 0;
  let skippedCount = 0;
  const startDateObj = startDate ? new Date(startDate) : null;
  const isInvalidStartDate = startDate && isNaN(startDateObj.getTime());
  const filterStartDate = !isInvalidStartDate ? startDateObj : null;

  if (isInvalidStartDate) {
    console.warn('migrateResource: invalid startDate provided; disabling date filter.', startDate);
  }

  async function processBatch(batch) {
    const results = await Promise.allSettled(
      batch.map(data => {
        const createdBy = data.createdBy || process.env.CREATED_BY;
        const phaseChangeNotifications = data.phaseChangeNotifications ?? true;

        return prisma.resource.upsert({
          where: { id: data.id },
          update: {
            challengeId: data.challengeId,
            memberId: data.memberId,
            memberHandle: data.memberHandle,
            roleId: data.roleId,
            createdAt: data.created ? new Date(data.created) : new Date(),
            createdBy,
            updatedAt: data.updatedAt ? new Date(data.updatedAt) : null,
            updatedBy: data.updatedBy || null,
            phaseChangeNotifications
          },
          create: {
            id: data.id,
            challengeId: data.challengeId,
            memberId: data.memberId,
            memberHandle: data.memberHandle,
            roleId: data.roleId,
            createdAt: data.created ? new Date(data.created) : new Date(),
            createdBy,
            updatedAt: data.updatedAt ? new Date(data.updatedAt) : null,
            updatedBy: data.updatedBy || null,
            phaseChangeNotifications
          }
        }).catch(err => {
          failCount++;
          const message = err.message.split('\n').at(-1);
          fs.appendFileSync('logs/resource_errors.log', `id=${data.id} - ${message}\n`);
          return null;
        });
      })
    );

    for (const result of results) {
      if (result && result.status === 'fulfilled') successCount++;
    }

    progress.tick(); // Avanza la barra tras cada batch
  }

  for await (const line of rl) {
    if (!line.trim()) continue;
    try {
      const jsonLine = JSON.parse(line);
      const data = jsonLine._source;
      if (filterStartDate) {
        const createdDate = parseTimestamp(data.created);
        const updatedAtDate = parseTimestamp(data.updatedAt);

        const shouldSkip =
          (!createdDate && !updatedAtDate) ||
          (((createdDate && createdDate < filterStartDate) || !createdDate) &&
            ((updatedAtDate && updatedAtDate < filterStartDate) || !updatedAtDate));

        if (shouldSkip) {
          skippedCount++;
          continue;
        }
      }
      batch.push(data);

      if (batch.length >= batchSize) {
        await processBatch(batch);
        batch = [];
      }
    } catch (err) {
      failCount++;
      const message = err.message.split('\n').at(-1);
      fs.appendFileSync('logs/resource_errors.log', `invalid JSON line - ${message}\n`);
    }
  }

  if (batch.length > 0) {
    await processBatch(batch);
  }

  progress.done();
  console.log(`✅ Resource migration finished: ${successCount} success, ${failCount} failed`);
  if (skippedCount > 0) {
    console.log(`ℹ️ Resource migration skipped ${skippedCount} record(s) before the start date`);
  }
}

module.exports = { migrateResource };
