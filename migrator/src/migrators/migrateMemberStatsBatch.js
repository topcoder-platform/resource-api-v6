/**
 * Batch (streaming) migration strategy.
 *
 * This migrator uses a stream-based pipeline (via stream-json + streamArray) to process large JSON files line by line.
 * 
 * Each record is processed in batches (default size = 100) using Promise.allSettled for concurrency and fault tolerance.
 * This approach minimizes memory usage and improves performance on large datasets.
 */

const fs = require('fs');
const { chain } = require('stream-chain');
const { parser } = require('stream-json');
const { streamArray } = require('stream-json/streamers/StreamArray');
const prisma = require('../clients/prismaClient');

async function migrateMemberStats(filePath) {
  const pipeline = chain([
    fs.createReadStream(filePath),
    parser(),
    streamArray()
  ]);

  let batch = [];
  let successCount = 0;
  let failCount = 0;
  const batchSize = 100;

  for await (const { value: stat } of pipeline) {
    batch.push(stat);

    if (batch.length >= batchSize) {
      await processBatch(batch);
      batch = [];
    }
  }

  if (batch.length > 0) {
    await processBatch(batch);
  }

  console.log(`✅ MemberStats migration finished: ${successCount} success, ${failCount} failed`);

  async function processBatch(batch) {
    const results = await Promise.allSettled(
      batch.map(async stat => {
        try {
          const parsedMaxRating = stat.maxRating ? JSON.parse(stat.maxRating) : {};
          const rating = typeof parsedMaxRating.rating === 'number' ? parsedMaxRating.rating : 0;
          const createdBy = stat.createdBy || process.env.CREATED_BY;

          await prisma.memberStats.upsert({
            where: { userId: stat.userId },
            update: {
              handle: stat.handle || null,
              handleLower: stat.handleLower || null,
              maxRating: rating,
              createdAt: stat.createdAt ? new Date(stat.createdAt) : new Date(),
              updatedAt: stat.updatedAt ? new Date(stat.updatedAt) : null,
              createdBy,
              updatedBy: stat.updatedBy || null
            },
            create: {
              userId: stat.userId,
              handle: stat.handle || null,
              handleLower: stat.handleLower || null,
              maxRating: rating,
              createdAt: stat.createdAt ? new Date(stat.createdAt) : new Date(),
              updatedAt: stat.updatedAt ? new Date(stat.updatedAt) : null,
              createdBy,
              updatedBy: stat.updatedBy || null
            }
          });

          successCount++;
        } catch (err) {
          failCount++;
          const message = err.message.split('\n').at(-1);
          fs.appendFileSync('logs/memberstats_errors.log', `userId=${stat.userId} - ${message}\n`);
        }
      })
    );
  }
}

module.exports = { migrateMemberStats };

