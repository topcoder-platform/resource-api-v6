/**
 * Batch migration strategy for NDJSON format (ElasticSearch export).
 *
 * This migrator reads the file line-by-line using `readline`, where each line is a valid JSON object.
 * Each line is parsed, extracted from its `_source` field (ElasticSearch convention), and processed in batches.
 *
 * Suitable for large NDJSON datasets exported from ElasticSearch.
 */

const fs = require('fs')
const readline = require('readline')
const prisma = require('../clients/prismaClient')

async function migrateResource (filePath) {
  const fileStream = fs.createReadStream(filePath)
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })

  const batchSize = 100
  let batch = []
  let successCount = 0
  let failCount = 0

  async function processBatch (batch) {
    const results = await Promise.allSettled(
      batch.map(data => {
        const createdBy = data.createdBy || process.env.CREATED_BY

        return prisma.resource.upsert({
          where: { id: data.id },
          update: {
            challengeId: data.challengeId,
            memberId: data.memberId,
            memberHandle: data.memberHandle,
            roleId: data.roleId,
            createdAt: new Date(data.created),
            createdBy,
            updatedAt: null,
            updatedBy: null
          },
          create: {
            id: data.id,
            challengeId: data.challengeId,
            memberId: data.memberId,
            memberHandle: data.memberHandle,
            roleId: data.roleId,
            createdAt: new Date(data.created),
            createdBy,
            updatedAt: null,
            updatedBy: null
          }
        }).catch(err => {
          failCount++
          const message = err.message.split('\n').at(-1)
          fs.appendFileSync('logs/resource_errors.log', `id=${data.id} - ${message}\n`)
          return null
        })
      })
    )

    for (const result of results) {
      if (result && result.status === 'fulfilled') successCount++
    }
  }

  for await (const line of rl) {
    if (!line.trim()) continue
    try {
      const jsonLine = JSON.parse(line)
      const data = jsonLine._source
      batch.push(data)

      if (batch.length >= batchSize) {
        await processBatch(batch)
        batch = []
      }
    } catch (err) {
      console.log(err)
      return
    }
  }

  if (batch.length > 0) {
    await processBatch(batch)
  }

  console.log(`✅ Resource migration finished: ${successCount} success, ${failCount} failed`)
}

module.exports = { migrateResource }
