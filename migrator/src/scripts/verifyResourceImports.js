#!/usr/bin/env node

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const prisma = require('../clients/prismaClient');

const DEFAULT_DATA_DIRECTORY = process.env.RESOURCE_DATA_DIRECTORY || '/home/ubuntu';
const DEFAULT_FILE_NAME = process.env.RESOURCE_DATA_FILE || 'challenge-api.resources.json';
const DEFAULT_BATCH_SIZE = Math.max(1, parseInt(process.env.VERIFY_RESOURCE_BATCH_SIZE || '500', 10));
const DEFAULT_MAX_REPORT = Math.max(1, parseInt(process.env.VERIFY_RESOURCE_MAX_REPORT || '50', 10));

const parseDate = (value, label) => {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Invalid ${label} date value: ${value}`);
  }
  return parsed;
};

const parseBoolean = (value, fallback = true) => {
  if (typeof value === 'boolean') {
    return value;
  }
  if (typeof value === 'number') {
    return value !== 0;
  }
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (['true', '1', 'yes', 'y', 'on'].includes(normalized)) {
      return true;
    }
    if (['false', '0', 'no', 'n', 'off'].includes(normalized)) {
      return false;
    }
  }
  return fallback;
};

const chunkArray = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

const formatResource = (record, index = null) => {
  const parts = [];
  if (index !== null) {
    parts.push(`${index}.`);
  }
  parts.push(`id=${record.id || '<missing>'}`);
  if (record.legacyId) {
    parts.push(`legacyId=${record.legacyId}`);
  }
  if (record.challengeId) {
    parts.push(`challengeId=${record.challengeId}`);
  }
  if (record.roleId) {
    parts.push(`roleId=${record.roleId}`);
  }
  if (record.memberHandle) {
    parts.push(`handle=${record.memberHandle}`);
  }
  return parts.join(' ');
};

const parseArgs = () => {
  const args = process.argv.slice(2);
  const options = {
    dataDir: DEFAULT_DATA_DIRECTORY,
    fileName: DEFAULT_FILE_NAME,
    batchSize: DEFAULT_BATCH_SIZE,
    maxReport: DEFAULT_MAX_REPORT,
    createdBefore: null,
    createdAfter: null,
    updatedBefore: null,
    updatedAfter: null,
    apply: false,
    logLevel: process.env.VERIFY_RESOURCE_LOG_LEVEL || 'info',
    logFile: process.env.VERIFY_RESOURCE_LOG_FILE || path.join(process.cwd(), 'logs', 'resource_backfill.log'),
    createdBy: process.env.CREATED_BY || 'resource-import',
    updatedBy: process.env.UPDATED_BY || process.env.CREATED_BY || 'resource-import'
  };

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === '--file' || arg === '--fileName') {
      const next = args[i + 1];
      if (next && !next.startsWith('--')) {
        options.fileName = next;
        i += 1;
      } else {
        throw new Error(`${arg} expects a value`);
      }
    } else if (arg === '--data-dir') {
      const next = args[i + 1];
      if (next && !next.startsWith('--')) {
        options.dataDir = next;
        i += 1;
      } else {
        throw new Error(`${arg} expects a value`);
      }
    } else if (arg === '--batch-size') {
      const next = args[i + 1];
      if (next && !next.startsWith('--')) {
        options.batchSize = Math.max(1, parseInt(next, 10));
        i += 1;
      } else {
        throw new Error(`${arg} expects a value`);
      }
    } else if (arg === '--max-report') {
      const next = args[i + 1];
      if (next && !next.startsWith('--')) {
        options.maxReport = Math.max(1, parseInt(next, 10));
        i += 1;
      } else {
        throw new Error(`${arg} expects a value`);
      }
    } else if (arg === '--created-before') {
      const next = args[i + 1];
      if (next && !next.startsWith('--')) {
        options.createdBefore = parseDate(next, 'created-before');
        i += 1;
      } else {
        throw new Error(`${arg} expects a value`);
      }
    } else if (arg === '--created-after') {
      const next = args[i + 1];
      if (next && !next.startsWith('--')) {
        options.createdAfter = parseDate(next, 'created-after');
        i += 1;
      } else {
        throw new Error(`${arg} expects a value`);
      }
    } else if (arg === '--updated-before') {
      const next = args[i + 1];
      if (next && !next.startsWith('--')) {
        options.updatedBefore = parseDate(next, 'updated-before');
        i += 1;
      } else {
        throw new Error(`${arg} expects a value`);
      }
    } else if (arg === '--updated-after') {
      const next = args[i + 1];
      if (next && !next.startsWith('--')) {
        options.updatedAfter = parseDate(next, 'updated-after');
        i += 1;
      } else {
        throw new Error(`${arg} expects a value`);
      }
    } else if (arg === '--apply') {
      options.apply = true;
    } else if (arg === '--dry-run') {
      options.apply = false;
    } else if (arg === '--created-by') {
      const next = args[i + 1];
      if (next && !next.startsWith('--')) {
        options.createdBy = next;
        i += 1;
      } else {
        throw new Error(`${arg} expects a value`);
      }
    } else if (arg === '--updated-by') {
      const next = args[i + 1];
      if (next && !next.startsWith('--')) {
        options.updatedBy = next;
        i += 1;
      } else {
        throw new Error(`${arg} expects a value`);
      }
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return options;
};

const parseResourceDates = (record) => {
  const createdValue = record.created ?? record.createdAt ?? null;
  const updatedValue = record.updated ?? record.updatedAt ?? null;

  const createdDate = createdValue ? new Date(createdValue) : null;
  const updatedDate = updatedValue ? new Date(updatedValue) : null;

  return {
    createdDate: createdDate && !Number.isNaN(createdDate.getTime()) ? createdDate : null,
    updatedDate: updatedDate && !Number.isNaN(updatedDate.getTime()) ? updatedDate : null
  };
};

const shouldIncludeRecord = (record, options) => {
  const { createdDate, updatedDate } = parseResourceDates(record);

  if (options.createdAfter && (!createdDate || createdDate < options.createdAfter)) {
    return false;
  }
  if (options.createdBefore && createdDate && createdDate >= options.createdBefore) {
    return false;
  }
  if (options.updatedAfter && (!updatedDate || updatedDate < options.updatedAfter)) {
    return false;
  }
  if (options.updatedBefore && updatedDate && updatedDate >= options.updatedBefore) {
    return false;
  }

  return true;
};

const resolveFilePath = (dataDir, fileName) => {
  if (!fileName) {
    throw new Error('Resource data file name is required.');
  }
  return path.isAbsolute(fileName)
    ? fileName
    : path.join(dataDir || '', fileName);
};

const loadResourceData = async (options) => {
  const filePath = resolveFilePath(options.dataDir, options.fileName);
  console.log(`[backfill] Reading resource data from ${filePath}`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Resource data file not found: ${filePath}`);
  }

  const results = [];
  let parseErrors = 0;
  const fileStream = fs.createReadStream(filePath, { encoding: 'utf8' });
  const reader = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  for await (const rawLine of reader) {
    const line = rawLine.trim();
    if (!line) continue;

    try {
      const parsed = JSON.parse(line);
      const source = parsed && parsed._source ? parsed._source : null;
      if (!source || typeof source !== 'object') {
        continue;
      }
      if (!shouldIncludeRecord(source, options)) {
        continue;
      }
      results.push(source);
    } catch (error) {
      parseErrors += 1;
      if (parseErrors <= options.maxReport) {
        console.warn(`[backfill] Failed to parse line: ${error.message}`);
      }
    }
  }

  if (parseErrors > options.maxReport) {
    console.warn(`[backfill] ${parseErrors - options.maxReport} additional parse errors omitted.`);
  }

  console.log(`[backfill] Loaded ${results.length} resource record(s) after filtering.`);
  return results;
};

const findExistingResourceIds = async (records, batchSize = 500) => {
  const ids = records
    .map(record => record.id)
    .filter(Boolean);

  const existingIds = new Set();
  const chunks = chunkArray(ids, batchSize);

  for (const chunk of chunks) {
    const existing = await prisma.resource.findMany({
      where: { id: { in: chunk } },
      select: { id: true }
    });
    existing.forEach(record => existingIds.add(record.id));
  }

  return existingIds;
};

const loadResourceRoles = async () => {
  const roles = await prisma.resourceRole.findMany({
    select: { id: true }
  });
  return new Set(roles.map(role => role.id));
};

const normalizeResourceRecord = (record, createdByDefault, updatedByDefault) => {
  const { createdDate, updatedDate } = parseResourceDates(record);
  const createdAt = createdDate || new Date();
  const updatedAt = updatedDate || null;

  return {
    id: record.id,
    challengeId: record.challengeId,
    memberId: record.memberId ? String(record.memberId) : null,
    memberHandle: record.memberHandle || null,
    roleId: record.roleId,
    phaseChangeNotifications: parseBoolean(record.phaseChangeNotifications, true),
    createdAt,
    createdBy: record.createdBy || createdByDefault,
    updatedAt,
    updatedBy: record.updatedBy || updatedByDefault || record.createdBy || createdByDefault
  };
};

const insertMissingResources = async (records, options) => {
  if (!records.length) {
    console.log('[backfill] No resource records to insert.');
    return { inserted: 0, failed: 0 };
  }

  const logDir = path.dirname(options.logFile);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  const errors = [];
  let inserted = 0;
  let failed = 0;
  const chunkSize = Math.max(1, parseInt(process.env.VERIFY_RESOURCE_APPLY_CONCURRENCY || '10', 10));

  for (let i = 0; i < records.length; i += chunkSize) {
    const slice = records.slice(i, i + chunkSize);
    const operations = slice.map(async (record) => {
      const data = normalizeResourceRecord(record, options.createdBy, options.updatedBy);
      try {
        await prisma.resource.create({ data });
        inserted += 1;
      } catch (error) {
        failed += 1;
        const message = error && error.message ? error.message.split('\n').at(-1) : 'unknown error';
        errors.push(`id=${record.id || '<missing id>'} - ${message}`);
      }
    });

    await Promise.all(operations);
  }

  if (errors.length) {
    fs.appendFileSync(options.logFile, `${errors.join('\n')}\n`);
    console.warn(`[backfill] Logged ${errors.length} error(s) to ${options.logFile}`);
  }

  console.log(`[backfill] Inserted ${inserted} resource(s); failed ${failed}.`);
  return { inserted, failed };
};

const main = async () => {
  const options = parseArgs();

  const resources = await loadResourceData(options);
  if (!resources.length) {
    console.log('[backfill] No resource records found after filtering; exiting.');
    return;
  }

  const missingWithoutId = resources.filter(record => !record.id);
  if (missingWithoutId.length) {
    console.warn(`[backfill] ${missingWithoutId.length} record(s) missing an id and will be ignored.`);
  }

  const recordsWithId = resources.filter(record => record.id);
  const existingIds = await findExistingResourceIds(recordsWithId, options.batchSize);
  const missingRecords = recordsWithId.filter(record => !existingIds.has(record.id));

  console.log(`[backfill] Found ${existingIds.size} existing resource(s) in the database.`);
  console.log(`[backfill] ${missingRecords.length} resource(s) are missing in the database before dependency checks.`);

  const resourceRoleIds = await loadResourceRoles();
  const missingRoleRecords = missingRecords.filter(record => !resourceRoleIds.has(record.roleId));

  if (missingRoleRecords.length) {
    console.warn(`[backfill] ${missingRoleRecords.length} resource(s) reference missing ResourceRole entries.`);
    missingRoleRecords.slice(0, options.maxReport).forEach((record, index) => {
      console.warn(`  ${formatResource(record, index + 1)} (missing roleId)`);
    });
    if (missingRoleRecords.length > options.maxReport) {
      console.warn(`  ... ${missingRoleRecords.length - options.maxReport} additional resources omitted.`);
    }
  }

  const candidateRecords = missingRecords.filter(record => resourceRoleIds.has(record.roleId));

  if (!candidateRecords.length) {
    console.log('[backfill] No resource records are eligible for insertion after dependency checks.');
  } else {
    console.log(`[backfill] ${candidateRecords.length} resource(s) are eligible for insertion.`);
    candidateRecords.slice(0, options.maxReport).forEach((record, index) => {
      console.log(`  ${formatResource(record, index + 1)}`);
    });
    if (candidateRecords.length > options.maxReport) {
      console.log(`  ... ${candidateRecords.length - options.maxReport} additional resources omitted.`);
    }
  }

  if (!candidateRecords.length) {
    return;
  }

  if (!options.apply) {
    console.log('[backfill] Dry run complete. Re-run with --apply to insert missing resources.');
    process.exitCode = 1;
    return;
  }

  const { inserted, failed } = await insertMissingResources(candidateRecords, options);
  if (failed > 0) {
    process.exitCode = 1;
  }
};

main()
  .catch((error) => {
    console.error('[backfill] Resource verification failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
