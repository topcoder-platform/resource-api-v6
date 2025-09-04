require('dotenv').config();
const path = require('path');
const fs = require('fs');

// === MIGRATOR IMPORTS ===
// Import migration functions for each data type
// The 'Auto' versions dynamically choose between batch and simple migration
// based on the size of the input file (optimized for large datasets)
const { migrateResourceRoleAuto } = require('./migrators/migrateResourceRoleAuto');
const { migrateResourceRolePhaseDependencyAuto } = require('./migrators/migrateResourceRolePhaseDependencyAuto');
const { migrateResourceAuto } = require('./migrators/migrateResourceAuto');   // Large dataset (line-based JSON from ElasticSearch)

// === MIGRATION STEPS ===
// Map each step name to its corresponding function.
// Each function logs execution time and calls its migrator.
const steps = {
  'resource-roles': async (filePath) => {
    const start = Date.now();
    await migrateResourceRoleAuto(filePath);
    console.log(`⏱️  Duration: ${((Date.now() - start) / 1000).toFixed(2)}s.`);
  },
  'resource-role-phase-dependencies': async (filePath) => {
    const start = Date.now();
    await migrateResourceRolePhaseDependencyAuto(filePath);
    console.log(`⏱️  Duration: ${((Date.now() - start) / 1000).toFixed(2)}s.`);
  },
  'resources': async (filePath) => {
    const start = Date.now();
    await migrateResourceAuto(filePath);
    console.log(`⏱️  Duration: ${((Date.now() - start) / 1000).toFixed(2)}s.`);
  }
};

// === EXECUTION ENTRYPOINT ===
// Determines which migration step to execute and handles file path input
(async () => {
  const step = process.argv[2];           // First argument: migration step name
  const customPath = process.argv[3];     // Second argument (optional): custom file path

  // Default file paths for each step
  const defaultPaths = {
    'resource-roles': './data/ResourceRole_dynamo_data.json',
    'resource-role-phase-dependencies': './data/ResourceRolePhaseDependency_dynamo_data.json',
    'resources': './data/Resource_data.json'
  };

  // Show help if step is invalid
  if (!steps[step]) {
    console.log('❌ Invalid migration step.\nUsage:');
    console.log('  node src/index.js <step-name> [custom-path]');
    console.log('\nAvailable steps:');
    console.log(Object.keys(steps).map(s => `  - ${s}`).join('\n'));
    process.exit(1);
  }

  const filePath = customPath || path.join(defaultPaths[step]);

  // Validate file existence
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    process.exit(1);
  }

  // Run selected migration step
  try {
    console.log(`🚀 Starting ${step} migration from ${filePath}`);
    await steps[step](filePath);
    console.log(`Step '${step}' completed successfully.`);
  } catch (error) {
    console.error(`❌ Error during '${step}':`, error.message);
    process.exit(1);
  }
})();
