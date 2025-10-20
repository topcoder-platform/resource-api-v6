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

async function migrateResource(filePath, startDate) {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let successCount = 0;
  let failCount = 0;
  let skippedCount = 0;
  const startDateObj = startDate ? new Date(startDate) : null;

  for await (const line of rl) {
    if (!line.trim()) continue;

    try {
      const jsonLine = JSON.parse(line);
      const data = jsonLine._source;

      const createdRaw = data.created;
      const updatedRaw = data.updatedAt;

      let createdDate = createdRaw ? new Date(createdRaw) : null;
      if (createdDate && isNaN(createdDate.getTime())) {
        createdDate = null;
      }

      let updatedDate = updatedRaw ? new Date(updatedRaw) : null;
      if (updatedDate && isNaN(updatedDate.getTime())) {
        updatedDate = null;
      }

      const createdBeforeOrMissing = !createdDate || (startDateObj ? createdDate < startDateObj : false);
      const updatedBeforeOrMissing = !updatedDate || (startDateObj ? updatedDate < startDateObj : false);

      if (startDateObj && createdBeforeOrMissing && updatedBeforeOrMissing) {
        skippedCount++;
        continue;
      }

      const createdBy = data.createdBy || process.env.CREATED_BY;
      const phaseChangeNotifications = Object.prototype.hasOwnProperty.call(data, 'phaseChangeNotifications')
        ? data.phaseChangeNotifications
        : null;

      await prisma.resource.upsert({
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

  console.log(`✅ Resource migration finished: ${successCount} success, ${failCount} failed, ${skippedCount} skipped`);
}

module.exports = { migrateResource };
