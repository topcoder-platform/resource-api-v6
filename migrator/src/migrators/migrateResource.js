/**
 * Simple migration strategy for NDJSON files (ElasticSearch export).
 *
 * This migrator reads and processes each JSON line individually using `readline`,
 * assuming each line contains an object with a `_source` field.
 * Ideal for small datasets or testing purposes.
 */

const fs = require('fs');
const readline = require('readline');
const prisma = require('../clients/prismaClient');

async function migrateResource(filePath) {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let successCount = 0;
  let failCount = 0;

  for await (const line of rl) {
    if (!line.trim()) continue;

    try {
      const jsonLine = JSON.parse(line);
      const data = jsonLine._source;
      const createdBy = data.createdBy || process.env.CREATED_BY;

      await prisma.resource.upsert({
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
      });

      successCount++;
    } catch (err) {
      failCount++;
      const message = err.message.split('\n').at(-1);
      // Intentamos obtener el ID de forma segura
      let resourceId = 'unknown';
      try {
        const jsonLine = JSON.parse(line);
        resourceId = jsonLine._source?.id || 'unknown';
      } catch {}
      fs.appendFileSync('logs/resource_errors.log', `id=${resourceId} - ${message}\n`);
    }
  }

  console.log(`✅ Resource migration finished: ${successCount} success, ${failCount} failed`);
}

module.exports = { migrateResource };
