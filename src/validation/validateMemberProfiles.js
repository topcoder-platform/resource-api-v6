const fs = require('fs');
const { chain } = require('stream-chain');
const { parser } = require('stream-json');
const { streamArray } = require('stream-json/streamers/StreamArray');
const { PrismaClient } = require('@prisma/client');
const { binarySearch, validateFields } = require('../utils/validatorUtils');

const prisma = new PrismaClient();

async function validateMemberProfiles(filePath = './data/MemberProfile_dynamo_data.json') {
  console.log(`🔍 Starting MemberProfile validation from ${filePath}`);
  console.time('⏱️  Validation Duration');

  const dbRecords = await prisma.memberProfile.findMany();
  const dbSorted = dbRecords.sort((a, b) => a.userId - b.userId);

  const pipeline = chain([
    fs.createReadStream(filePath),
    parser(),
    streamArray()
  ]);

  let total = 0, valid = 0, missing = 0, mismatched = 0;

  for await (const { value: profile } of pipeline) {
    total++;
    const dbProfile = binarySearch(dbSorted, profile.userId);

    if (!dbProfile) {
      console.log(`❌ Missing in DB: userId=${profile.userId}`);
      missing++;
      continue;
    }

    const mismatches = validateFields(dbProfile, profile, ['handle', 'handleLower', 'email']);

    if (mismatches.length > 0) {
      console.log(`⚠️  Mismatch userId=${profile.userId} → ${mismatches.join(', ')}`);
      mismatched++;
    } else {
      valid++;
    }
  }

  console.log(`\n✅ Validation complete`);
  console.log(`Total: ${total}, Valid: ${valid}, Missing: ${missing}, Mismatched: ${mismatched}`);
  console.timeEnd('⏱️  Validation Duration');
}
const inputFile = process.argv[2];
validateMemberProfiles(inputFile);
