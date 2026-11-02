const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');
const { loadJSON } = require('../src/clients/dynamoLoader');
const { batchMigrator } = require('../src/utils/batchMigrator');

test('the patched streaming parser preserves array records and rejects malformed input', async () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'resource-json-'));
  try {
    const file = path.join(directory, 'records.json');
    const records = Array.from({ length: 1005 }, (_, id) => ({ id, name: 'escaped " braces {} and Unicode \u2603' }));
    fs.writeFileSync(file, JSON.stringify(records));
    assert.deepEqual(await loadJSON(file), records);
    fs.writeFileSync(file, '[{"__proto__":{"polluted":true}}]');
    await loadJSON(file);
    assert.equal({}.polluted, undefined);
    fs.writeFileSync(file, '[{"id":');
    await assert.rejects(loadJSON(file));
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

test('batch migration retains filtering, batch boundaries, and failed-record logging', async () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'resource-batch-'));
  try {
    const filePath = path.join(directory, 'records.json');
    const errorLogFile = path.join(directory, 'errors.log');
    fs.writeFileSync(filePath, JSON.stringify(Array.from({ length: 9 }, (_, id) => ({ id }))));
    const processed = [];
    await batchMigrator({
      filePath, errorLogFile, batchSize: 2, totalRecords: 9, label: 'compatibility',
      filterRecord: record => record.id % 2 === 0,
      handleRecord: async record => {
        await Promise.resolve();
        processed.push(record.id);
        if (record.id === 4) throw new Error('fixture failure');
      },
    });
    assert.deepEqual(processed, [0, 2, 4, 6, 8]);
    assert.equal(fs.readFileSync(errorLogFile, 'utf8'), 'id=4 - fixture failure\n');
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});
