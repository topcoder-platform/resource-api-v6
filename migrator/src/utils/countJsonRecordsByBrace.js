const fs = require('fs');
const readline = require('readline');

async function countJsonRecordsByBrace(filePath) {
  return new Promise((resolve, reject) => {
    let count = 0;
    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      if (line.trim().endsWith('},') || line.trim().endsWith('}')) {
        count++;
      }
    });

    rl.on('close', () => resolve(count));
    rl.on('error', reject);
  });
}

module.exports = { countJsonRecordsByBrace };