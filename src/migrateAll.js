// src/migrateAll.js

require('dotenv').config();
const path = require('path');
const fs = require('fs');

const { migrateMemberProfilesAuto } = require('./migrators/migrateMemberProfileAuto');
const { migrateMemberStatsAuto } = require('./migrators/migrateMemberStatsAuto');
const { migrateResourceRoleAuto } = require('./migrators/migrateResourceRoleAuto');
const { migrateResourceRolePhaseDependencyAuto } = require('./migrators/migrateResourceRolePhaseDependencyAuto');
const { migrateResourceAuto } = require('./migrators/migrateResourceAuto');

// Default file paths for each step
const defaultPaths = {
  'member-profiles': './data/MemberProfile_dynamo_data.json',
  'member-stats': './data/MemberStats_dynamo_data.json',
  'resource-roles': './data/ResourceRole_dynamo_data.json',
  'resource-role-phase-dependencies': './data/ResourceRolePhaseDependency_dynamo_data.json',
  'resources': './data/Resource_data.json'
};

const steps = [
  { name: 'member-profiles', fn: migrateMemberProfilesAuto },
  { name: 'member-stats', fn: migrateMemberStatsAuto },
  { name: 'resource-roles', fn: migrateResourceRoleAuto },
  { name: 'resource-role-phase-dependencies', fn: migrateResourceRolePhaseDependencyAuto },
  { name: 'resources', fn: migrateResourceAuto }
];

(async () => {
  console.log('🚀 Starting full migration (all steps)...\n');

  for (const step of steps) {
    const filePath = path.resolve(defaultPaths[step.name]);

    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  Skipping '${step.name}': file not found at ${filePath}`);
      continue;
    }

    console.log(`➡️  Step: ${step.name}`);
    const start = Date.now();

    try {
      await step.fn(filePath);
      const duration = ((Date.now() - start) / 1000).toFixed(2);
      console.log(`✅ '${step.name}' completed in ${duration}s\n`);
    } catch (error) {
      console.error(`❌ Error in '${step.name}': ${error.message}\n`);
    }
  }

  console.log('🏁 All migration steps finished.');
})();
