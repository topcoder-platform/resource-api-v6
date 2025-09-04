const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const { loadJSON } = require('../clients/dynamoLoader');
const prisma = new PrismaClient();

console.log('🔍 Starting ResourceRole validation...');
console.time('⏱️  Validation Duration');

async function validateResourceRoles(filePath = './data/ResourceRole_dynamo_data.json') {
  const fileData = await loadJSON(filePath);
  const dbRoles = await prisma.resourceRole.findMany();
  const dbMap = new Map();
  for (const role of dbRoles) dbMap.set(role.id, role);

  let total = 0, valid = 0, missing = 0, mismatched = 0;

  for (const role of fileData) {
    total++;
    const dbRole = dbMap.get(role.id);

    if (!dbRole) {
      console.log(`❌ Missing in DB: id=${role.id}`);
      missing++;
      continue;
    }

    const mismatch = [];

    const effectiveReadAccess =
    role.fullReadAccess !== undefined ? role.fullReadAccess
    : role.fullAccess !== undefined ? role.fullAccess
    : false;

    const effectiveWriteAccess =
    role.fullWriteAccess !== undefined ? role.fullWriteAccess
    : role.fullAccess !== undefined ? role.fullAccess
    : false;

    if ((dbRole.name || '') !== (role.name || '')) mismatch.push('name');
    if ((dbRole.nameLower || '') !== (role.nameLower || '')) mismatch.push('nameLower');
    if (dbRole.fullReadAccess !== effectiveReadAccess) mismatch.push('fullReadAccess');
    if (dbRole.fullWriteAccess !== effectiveWriteAccess) mismatch.push('fullWriteAccess');
    if (dbRole.isActive !== (role.isActive ?? true)) mismatch.push('isActive');
    if (dbRole.selfObtainable !== (role.selfObtainable ?? false)) mismatch.push('selfObtainable');
    if (dbRole.legacyId !== (role.legacyId ?? null)) mismatch.push('legacyId');


    if (mismatch.length > 0) {
      console.log(`⚠️  Mismatch id=${role.id} → ${mismatch.join(', ')}`);
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
validateResourceRoles(filePath);
