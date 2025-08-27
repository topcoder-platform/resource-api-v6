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

async function migrateMemberProfiles(filePath) {
  const pipeline = chain([
    fs.createReadStream(filePath),
    parser(),
    streamArray()
  ]);

  let batch = [];
  let successCount = 0;
  let failCount = 0;
  const batchSize = 100;

  for await (const { value: profile } of pipeline) {
    batch.push(profile);

    if (batch.length >= batchSize) {
      await processBatch(batch);
      batch = [];
    }
  }

  if (batch.length > 0) {
    await processBatch(batch);
  }

  console.log(`✅ MemberProfile migration finished: ${successCount} success, ${failCount} failed`);

  async function processBatch(batch) {
    const results = await Promise.allSettled(
      batch.map(async (profile) => {
        try {
          const createdBy = profile.createdBy || process.env.CREATED_BY;

          await prisma.memberProfile.upsert({
            where: { userId: profile.userId },
            update: {
              handle: profile.handle || null,
              handleLower: profile.handleLower || null,
              email: profile.email || null,
              createdAt: profile.createdAt ? new Date(profile.createdAt) : new Date(),
              updatedAt: profile.updatedAt ? new Date(profile.updatedAt) : null,
              createdBy,
              updatedBy: profile.updatedBy || null
            },
            create: {
              userId: profile.userId,
              handle: profile.handle || null,
              handleLower: profile.handleLower || null,
              email: profile.email || null,
              createdAt: profile.createdAt ? new Date(profile.createdAt) : new Date(),
              updatedAt: profile.updatedAt ? new Date(profile.updatedAt) : null,
              createdBy,
              updatedBy: profile.updatedBy || null
            }
          });

          successCount++;
        } catch (err) {
          failCount++;
          const message = err.message.split('\n').at(-1);
          fs.appendFileSync('logs/memberprofile_errors.log', `userId=${profile.userId} - ${message}\n`);
        }
      })
    );
  }
}

module.exports = { migrateMemberProfiles };

