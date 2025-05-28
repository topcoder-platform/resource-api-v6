const fs = require('fs');
const { chain } = require('stream-chain');
const { parser } = require('stream-json');
const { streamArray } = require('stream-json/streamers/StreamArray');
const { PrismaClient } = require('@prisma/client');
const { binarySearch, validateFields } = require('../utils/validatorUtils');

const prisma = new PrismaClient();

async function validateMemberStats(filePath = './data/MemberStats_dynamo_data.json') {
    console.log(`🔍 Starting MemberProfile validation from ${filePath}`);
    console.time('⏱️  Validation Duration');

    const dbRecords = await prisma.memberStats.findMany();
    const dbSorted = dbRecords.sort((a, b) => a.userId - b.userId);

    const pipeline = chain([
        fs.createReadStream(filePath),
        parser(),
        streamArray()
    ]);

    let total = 0, valid = 0, missing = 0, mismatched = 0;

    for await (const { value: stat } of pipeline) {
        total++;
        const dbStat = binarySearch(dbSorted, stat.userId);

        if (!dbStat) {
        console.log(`❌ Missing in DB: userId=${stat.userId}`);
        missing++;
        continue;
        }

        const mismatches = validateFields(dbStat, stat, ['handle', 'handleLower']);

        // Comparar maxRating con conversión
        const inputRating = stat.maxRating ? JSON.parse(stat.maxRating).rating : 0;
        if ((dbStat.maxRating || 0) !== inputRating) mismatches.push('maxRating');

        if (mismatches.length > 0) {
        console.log(`⚠️  Mismatch userId=${stat.userId} → ${mismatches.join(', ')}`);
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
validateMemberStats(inputFile);

