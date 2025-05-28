const fs = require('fs');
const readline = require('readline');

async function countFileLines(filePath) {
  let count = 0;
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    if (line.trim()) count++;
  }

  return count;
}

module.exports = { countFileLines };
