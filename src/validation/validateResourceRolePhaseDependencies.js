const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const { loadJSON } = require('../clients/dynamoLoader');
const prisma = new PrismaClient();

console.log('🔍 Starting ResourceRolePhaseDependency validation...');
console.time('⏱️  Validation Duration');

async function validateResourceRolePhaseDependency(filePath = './data/ResourceRolePhaseDependency_dynamo_data.json') {
  const fileData = await loadJSON(filePath);
  const dbData = await prisma.resourceRolePhaseDependency.findMany();
  const dbMap = new Map();
  for (const rec of dbData) dbMap.set(rec.id, rec);

  let total = 0, valid = 0, missing = 0, mismatched = 0;

  for (const record of fileData) {
    total++;
    const dbRec = dbMap.get(record.id);

    if (!dbRec) {
      console.log(`❌ Missing in DB: id=${record.id}`);
      missing++;
      continue;
    }

    const mismatch = [];

    const effectivePhaseState =
      record.phaseState !== undefined
        ? record.phaseState
        : (process.env.DEFAULT_PHASE_STATE === 'true');

    if (dbRec.phaseId !== record.phaseId) mismatch.push('phaseId');
    if (dbRec.resourceRoleId !== record.resourceRoleId) mismatch.push('resourceRoleId');
    if (dbRec.phaseState !== effectivePhaseState) mismatch.push('phaseState');

    if (mismatch.length > 0) {
      console.log(`⚠️  Mismatch id=${record.id} → ${mismatch.join(', ')}`);
      mismatched++;
    } else {
      valid++;
    }
  }

  console.log(`\n✅ Validation complete`);
  console.log(`Total: ${total}, Valid: ${valid}, Missing: ${missing}, Mismatched: ${mismatched}`);
  console.timeEnd('⏱️  Validation Duration');
}

const filePath = process.argv[2];
validateResourceRolePhaseDependency(filePath);
