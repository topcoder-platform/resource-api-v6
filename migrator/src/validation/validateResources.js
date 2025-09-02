const fs = require('fs');
const readline = require('readline');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function validateResources(filePath = './data/Resource_data.json') {
    console.log(`🔍 Starting Resources validation from ${filePath}`);
    console.time('⏱️ Validation Duration');

    const dbResources = await prisma.resource.findMany();
    const dbMap = new Map();
    for (const res of dbResources) dbMap.set(res.id, res);

    const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity
    });

    let total = 0, valid = 0, missing = 0, mismatched = 0;

    for await (const line of rl) {
    if (!line.trim()) continue;
    total++;

    try {
        const jsonLine = JSON.parse(line);
        const data = jsonLine._source ?? jsonLine;
        const dbEntry = dbMap.get(data.id);

        if (!dbEntry) {
        console.log(`❌ Missing in DB: id=${data.id}`);
        missing++;
        continue;
        }

        const mismatch = [];
        if (dbEntry.challengeId !== data.challengeId) mismatch.push('challengeId');
        if (dbEntry.memberId !== data.memberId) mismatch.push('memberId');
        if (dbEntry.memberHandle !== data.memberHandle) mismatch.push('memberHandle');
        if (dbEntry.roleId !== data.roleId) mismatch.push('roleId');

        if (mismatch.length > 0) {
        console.log(`⚠️  Mismatch id=${data.id} → ${mismatch.join(', ')}`);
        mismatched++;
        } else {
        valid++;
        }

    } catch (err) {
        console.log(`❌ Invalid line format: ${err.message}`);
    }
    }

    console.log(`\n✅ Validation complete`);
    console.log(`Total: ${total}, Valid: ${valid}, Missing: ${missing}, Mismatched: ${mismatched}`);
    console.timeEnd('⏱️ Validation Duration');
}

const filePath = process.argv[2];
validateResources(filePath);