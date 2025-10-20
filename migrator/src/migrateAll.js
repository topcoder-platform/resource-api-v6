// src/migrateAll.js

require('dotenv').config();
const path = require('path');
const fs = require('fs');

const { migrateResourceRoleAuto } = require('./migrators/migrateResourceRoleAuto');
const { migrateResourceRolePhaseDependencyAuto } = require('./migrators/migrateResourceRolePhaseDependencyAuto');
const { migrateResourceAuto } = require('./migrators/migrateResourceAuto');

// Default file paths for each step
const defaultPaths = {
  'resource-roles': './data/ResourceRole_dynamo_data.json',
  'resource-role-phase-dependencies': './data/ResourceRolePhaseDependency_dynamo_data.json',
  'resources': './data/Resource_data.json'
};

const steps = [
  { name: 'resource-roles', fn: migrateResourceRoleAuto },
  { name: 'resource-role-phase-dependencies', fn: migrateResourceRolePhaseDependencyAuto },
  { name: 'resources', fn: migrateResourceAuto }
];

(async () => {
  const startDateArg = process.argv.find(arg => arg.startsWith('--start-date='));
  let startDate = null;
  if (startDateArg) {
    startDate = startDateArg.split('=')[1];
    const startDatePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!startDate || !startDatePattern.test(startDate)) {
      console.error('❌ Invalid --start-date format. Expected YYYY-MM-DD.');
      process.exit(1);
    }
  }

  console.log('🚀 Starting full migration (all steps)...\n');
  if (startDate) {
    console.log(`🔁 Incremental mode enabled. Filtering records from ${startDate}.\n`);
  }

  for (const step of steps) {
    const filePath = path.resolve(defaultPaths[step.name]);

    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  Skipping '${step.name}': file not found at ${filePath}`);
      continue;
    }

    console.log(`➡️  Step: ${step.name}`);
    const start = Date.now();

    try {
      await step.fn(filePath, startDate);
      const duration = ((Date.now() - start) / 1000).toFixed(2);
      console.log(`✅ '${step.name}' completed in ${duration}s\n`);
    } catch (error) {
      console.error(`❌ Error in '${step.name}': ${error.message}\n`);
    }
  }

  console.log('🏁 All migration steps finished.');
})();
