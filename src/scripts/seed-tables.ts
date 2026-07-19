/**
 * Seed table data in database
 */
const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const { v4: uuid } = require('uuid')
const logger = require('../common/logger')
const prisma = require('../common/prisma').getClient()

logger.info('Requesting to seed data to the resources tables...')

const createdBy = 'seed-data'
const seedDirectory = path.resolve(process.cwd(), 'src', 'scripts', 'seed')

/**
 * Imports resource-role seed records after applying legacy default fields.
 *
 * @returns A promise that resolves after the role batch is inserted.
 * @throws Propagates Prisma validation or database failures.
 */
async function importResourceRole () {
  let data = require(path.join(seedDirectory, 'ResourceRole.json'))
  data = _.map(data, d => {
    const r = {
      ...d,
      nameLower: d.name.toLowerCase(),
      createdBy
    }
    if (_.isUndefined(d.fullReadAccess)) {
      r.fullReadAccess = false
    }
    if (_.isUndefined(d.fullWriteAccess)) {
      r.fullWriteAccess = false
    }
    return r
  })
  await prisma.resourceRole.createMany({ data })
  logger.info('Imported ResourceRole data')
}

/**
 * Imports resource-role phase-dependency seed records with audit metadata.
 *
 * @returns A promise that resolves after the dependency batch is inserted.
 * @throws Propagates Prisma validation or database failures.
 */
async function importResourceRolePhaseDependency () {
  let data = require(path.join(seedDirectory, 'ResourceRolePhaseDependency.json'))
  data = _.map(data, d => ({
    ...d,
    createdBy
  }))
  await prisma.resourceRolePhaseDependency.createMany({ data })
  logger.info('Imported ResourceRolePhaseDependency data')
}

/**
 * Imports resource seed records and records skipped rows in a local log.
 *
 * Individual invalid resource rows are skipped to preserve the historical
 * best-effort import behavior; batch-level Prisma failures are propagated.
 *
 * @returns A promise that resolves after resource and related member data work.
 * @throws Propagates failures outside the per-resource best-effort insert path.
 */
async function importResource () {
  const logPath = path.join(seedDirectory, 'resource-import-skipped.log')
  // truncate existing log
  try { fs.writeFileSync(logPath, '') } catch (e) { /* ignore */ }

  const writeSkip = (reason, rec) => {
    const line = JSON.stringify({ reason, record: rec }) + '\n'
    fs.appendFileSync(logPath, line)
  }

  const data = require(path.join(seedDirectory, 'Resource.json'))
  const total = data.length

  const memberDataMap = {}
  let success = 0
  let skipped = 0
  const start = Date.now()
  const progressTimer = setInterval(() => {
    const elapsed = (Date.now() - start) / 1000
    const processed = success + skipped
    const rate = processed > 0 ? (processed / elapsed) : 0
    const pct = total > 0 ? ((processed / total) * 100) : 0
    const remaining = Math.max(total - processed, 0)
    const eta = rate > 0 ? (remaining / rate) : Infinity
    logger.info(`Resource import progress: ${processed}/${total} (${pct.toFixed(1)}%), success=${success}, skipped=${skipped}, rate=${rate.toFixed(2)} rec/s, elapsed=${elapsed.toFixed(1)}s, ETA=${Number.isFinite(eta) ? eta.toFixed(1) : '∞'}s`)
  }, 5000)

  for (const d of data) {
    // Validate required fields
    const missing = []
    for (const f of ['challengeId', 'memberId', 'memberHandle', 'roleId']) {
      if (_.isNil(d[f]) || _.toString(d[f]).trim() === '') missing.push(f)
    }
    if (missing.length) {
      skipped += 1
      writeSkip(`Missing required field(s): ${missing.join(', ')}`, d)
      continue
    }

    // Build record for Prisma. Remove fields not in schema or that conflict.
    const r = _.omit(d, ['created', 'updated', 'rating', 'legacyId'])
    // Ensure id exists; generate if absent
    if (!r.id) r.id = uuid()
    // Normalize timestamps
    if (d.created) r.createdAt = new Date(d.created)
    if (d.updated) r.updatedAt = new Date(d.updated)
    // Ensure strings for string columns
    r.challengeId = _.toString(r.challengeId)
    r.memberId = _.toString(r.memberId)
    r.memberHandle = _.toString(r.memberHandle)
    r.roleId = _.toString(r.roleId)
    if (!r.createdBy) r.createdBy = createdBy

    try {
      await prisma.resource.create({ data: r })
      success += 1
      // collect member data only for successfully inserted resources
      const mid = _.parseInt(d.memberId)
      if (!_.has(memberDataMap, mid)) {
        memberDataMap[mid] = {
          userId: mid,
          handle: d.memberHandle,
          handleLower: _.toString(d.memberHandle).toLowerCase(),
          maxRating: _.get(d, 'rating', null),
          createdBy
        }
      }
    } catch (err) {
      skipped += 1
      writeSkip(`Insert failed: ${err.message}`, d)
    }
  }

  clearInterval(progressTimer)
  const elapsed = (Date.now() - start) / 1000
  const rate = (success + skipped) > 0 ? ((success + skipped) / elapsed).toFixed(2) : '0.00'
  logger.info(`Imported Resource data: success=${success}, skipped=${skipped}, total=${total}, elapsed=${elapsed.toFixed(1)}s, rate=${rate} rec/s`)

  // import memberProfile and memberStats for members associated with successfully inserted resources
  const memberData = _.values(memberDataMap)
  if (memberData.length) {
    await prisma.memberStats.createMany({ data: memberData })
    await prisma.memberProfile.createMany({ data: _.map(memberData, (m) => _.omit(m, 'maxRating')) })
    logger.info(`Imported Member data: count=${memberData.length}`)
  } else {
    logger.info('No member data to import')
  }
}

/**
 * Runs every seed import in foreign-key-safe order.
 *
 * @returns A promise that resolves when all seed imports complete.
 * @throws Propagates any import failure to the process-level handler.
 */
async function main () {
  await importResourceRole()
  await importResourceRolePhaseDependency()
  await importResource()
}

main()
  .then(() => {
    logger.info('All tables have been inserted with the data. The processes is run asynchronously')
    process.exit()
  })
  .catch((err) => {
    logger.error(`Error loading resource seed data ${err}`)
    logger.logFullError(err)
    process.exit(1)
  })
