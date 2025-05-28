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

async function migrateMemberStats(filePath) {
  const stats = await loadJSON(filePath);

  let successCount = 0;
  let failCount = 0;

  for (const stat of stats) {
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

      successCount++;
    } catch (err) {
      failCount++;
      const message = err.message.split('\n').at(-1);
      fs.appendFileSync('logs/memberstats_errors.log', `userId=${stat.userId} - ${message}\n`);
    }
  }

  console.log(`✅ MemberStats migration finished: ${successCount} success, ${failCount} failed`);
}

module.exports = { migrateMemberStats };
