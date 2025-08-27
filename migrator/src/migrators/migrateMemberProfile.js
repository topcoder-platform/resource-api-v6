/**
 * Simple (in-memory) migration strategy.
 *
 * This migrator loads the entire JSON file into memory using `loadJSON()` from the local utility.
 *
 * It is suitable for small datasets (e.g., test files, mocks), as it prioritizes clarity and simplicity over memory efficiency.
 */

const fs = require('fs')
const { loadJSON } = require('../clients/dynamoLoader')
const prisma = require('../clients/prismaClient')

async function migrateMemberProfiles (filePath) {
  const profiles = await loadJSON(filePath)

  let successCount = 0
  let failCount = 0

  for (const profile of profiles) {
    try {
      const createdBy = profile.createdBy || process.env.CREATED_BY

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
      })

      successCount++
    } catch (err) {
      failCount++
      const message = err.message.split('\n').at(-1)
      fs.appendFileSync('logs/memberprofile_errors.log', `id=${profile.id} - ${message}\n`)
    }
  }

  console.log(`✅ MemberProfile migration finished: ${successCount} success, ${failCount} failed`)
}

module.exports = { migrateMemberProfiles }
