/**
 * Batch (streaming) migration strategy.
 *
 * This migrator uses a stream-based pipeline (via stream-json + streamArray) to process large JSON files line by line.
 * 
 * Each record is processed in batches (default size = 100) using Promise.allSettled for concurrency and fault tolerance.
 * This approach minimizes memory usage and improves performance on large datasets.
 */

const prisma = require('../clients/prismaClient');
const { batchMigrator } = require('../utils/batchMigrator');

async function migrateMemberStats(filePath) {
  await batchMigrator({
    filePath,
    batchSize: 100,
    label: 'MemberStats',
    errorLogFile: 'logs/memberstats_errors.log',
    handleRecord: async (stat) => {
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
          createdBy,
          updatedAt: stat.updatedAt ? new Date(stat.updatedAt) : null,
          updatedBy: stat.updatedBy || null
        },
        create: {
          userId: stat.userId,
          handle: stat.handle || null,
          handleLower: stat.handleLower || null,
          maxRating: rating,
          createdAt: stat.createdAt ? new Date(stat.createdAt) : new Date(),
          createdBy,
          updatedAt: stat.updatedAt ? new Date(stat.updatedAt) : null,
          updatedBy: stat.updatedBy || null
        }
      });
    }
  });
}

module.exports = { migrateMemberStats };

