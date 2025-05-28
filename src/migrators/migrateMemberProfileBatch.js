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

async function migrateMemberProfiles(filePath) {
  await batchMigrator({
    filePath,
    batchSize: 100,
    label: 'MemberProfile',
    errorLogFile: 'logs/memberprofile_errors.log',
    handleRecord: async (profile) => {
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
    }
  });
}

module.exports = { migrateMemberProfiles };
