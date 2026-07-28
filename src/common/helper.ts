/**
 * Shared application helpers for authorization, HTTP integrations, database
 * lookups, pagination, validation, and Bus API event publication.
 *
 * The CommonJS export surface is retained so existing services and tests can
 * monkeypatch helpers such as `postEvent` without changing runtime behavior.
 */

const _ = require('lodash')
const config = require('config')
const querystring = require('querystring')
const request = require('superagent')
const moment = require('moment')
const constants = require('../../app-constants')
const errors = require('./errors')
const logger = require('./logger')
const m2mAuth = require('tc-core-library-js').auth.m2m
const m2m = m2mAuth(_.pick(config, ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME', 'AUTH0_PROXY_SERVER_URL']))
const busApi = require('tc-bus-api-wrapper')
const busApiClient = busApi(_.pick(config, ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME', 'AUTH0_CLIENT_ID',
  'AUTH0_CLIENT_SECRET', 'BUSAPI_URL', 'KAFKA_ERROR_TOPIC', 'AUTH0_PROXY_SERVER_URL']))

const prismaClients = require('./prisma')
const prisma = prismaClients.getClient()
const prismaMember = prismaClients.getMemberClient()
const prismaChallenge = prismaClients.getChallengeClient()

/**
 * Determine whether an error is one of the API's custom HTTP errors.
 *
 * @param err Error-like value whose name should be checked.
 * @returns `true` for an error exported by `errors.ts`; otherwise `false`.
 * @throws Does not throw for an error-like object with a readable name.
 */
function isCustomError (err) {
  return _.keys(errors).includes(err.name)
}

/**
 * Publish an event through the existing Bus API client.
 *
 * The established event envelope and field names are intentionally retained.
 * The Bus API remains responsible for forwarding the message to Kafka.
 *
 * @param topic Topic name placed in the event envelope.
 * @param payload Event payload forwarded without transformation.
 * @returns A promise that resolves when the Bus API accepts the event.
 * @throws Authentication, network, or Bus API errors from the wrapper client.
 */
async function postEvent (topic, payload) {
  logger.info(`Publish event to Kafka topic ${topic}`)
  const message = {
    topic,
    originator: config.KAFKA_MESSAGE_ORIGINATOR,
    timestamp: new Date().toISOString(),
    'mime-type': 'application/json',
    payload
  }
  await busApiClient.postEvent(message)
}

/**
 * Wrap an asynchronous function as an Express-compatible request handler.
 *
 * Promise rejections are forwarded to Express through `next`.
 *
 * @param fn Asynchronous request handler to wrap.
 * @returns An Express-style handler accepting request, response, and `next`.
 * @throws Synchronous errors raised before `fn` returns a promise are not
 * intercepted and retain the legacy behavior.
 */
function wrapExpress (fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next)
  }
}

/**
 * Recursively wrap asynchronous functions contained in an export object.
 *
 * Objects are updated in place; arrays are returned as mapped copies.
 *
 * @param obj Controller export, function, array, or nested object to process.
 * @returns The processed function, array, or object.
 * @throws Any error raised while reading or assigning properties on `obj`.
 */
function autoWrapExpress (obj) {
  if (_.isArray(obj)) {
    return obj.map(autoWrapExpress)
  }
  if (_.isFunction(obj)) {
    if (obj.constructor.name === 'AsyncFunction') {
      return wrapExpress(obj)
    }
    return obj
  }
  _.each(obj, (value, key) => {
    obj[key] = autoWrapExpress(value)
  })
  return obj
}

/**
 * Check whether an authenticated user has the configured administrator role.
 *
 * @param authUser Authentication payload containing an optional roles array.
 * @returns `true` for a case-insensitive administrator role match.
 * @throws Does not throw for missing or malformed role arrays.
 */
function hasAdminRole (authUser) {
  if (!authUser || !Array.isArray(authUser.roles)) {
    return false
  }
  for (let i = 0; i < authUser.roles.length; i++) {
    if (authUser.roles[i].toLowerCase() === constants.UserRoles.Admin.toLowerCase()) {
      return true
    }
  }
  return false
}

/**
 * Get the preferred user identifier from an authentication token.
 *
 * @param authUser Authenticated user payload.
 * @returns The user handle when present, otherwise the token subject.
 * @throws A property-access error when `authUser` is null or undefined.
 */
function getUserHandleOrSub (authUser) {
  return authUser.handle || authUser.sub
}

/**
 * Get the numeric or string user id from an authentication token.
 *
 * @param authUser Authenticated user payload.
 * @returns The payload's `userId` value.
 * @throws A property-access error when `authUser` is null or undefined.
 */
function getUserIdFromToken (authUser) {
  return authUser.userId
}

/**
 * Check whether any requested term exists in a source list.
 *
 * Source entries and array terms are compared case-insensitively. String terms
 * are split on spaces, retaining the legacy handling of their original case.
 *
 * @param source Array in which to search.
 * @param term A term string or an array of terms.
 * @returns `true` when at least one term is present; otherwise `false`.
 * @throws {Error} When `source` is not an array or `term` is neither a string
 * nor an array.
 */
function checkIfExists (source, term) {
  let terms

  if (!_.isArray(source)) {
    throw new Error('Source argument should be an array')
  }

  source = source.map(s => s.toLowerCase())

  if (_.isString(term)) {
    terms = term.split(' ')
  } else if (_.isArray(term)) {
    terms = term.map(t => t.toLowerCase())
  } else {
    throw new Error('Term argument should be either a string or an array')
  }

  for (let i = 0; i < terms.length; i++) {
    if (source.includes(terms[i])) {
      return true
    }
  }

  return false
}

/**
 * Fetch a resources-database record by its primary id.
 *
 * @param modelName Prisma model name in its exported PascalCase form.
 * @param id Primary id to find.
 * @returns The matching Prisma record.
 * @throws {NotFoundError} When the record does not exist.
 * @throws A Prisma driver error when the lookup fails.
 */
async function getById (modelName, id) {
  const prismaModel = _.camelCase(modelName)
  const ret = await prisma[prismaModel].findUnique({ where: { id } })
  if (!ret || _.isEmpty(_.keys(ret))) {
    throw new errors.NotFoundError(`${modelName} with id: ${id} doesn't exist`)
  }
  return ret
}

/**
 * Fetch member records and maximum ratings for a list of user ids.
 *
 * @param idList Member ids accepted by the members Prisma BigInt filter.
 * @returns Member records with their optional `maxRating` relation.
 * @throws A Prisma driver error when the members lookup fails.
 */
async function getMemberInfoByIdList (idList) {
  return prismaMember.member.findMany({ where: { userId: { in: idList } }, include: { maxRating: true } })
}

/**
 * Resolve member details by handle.
 *
 * The members database is attempted first. Any database miss or error retains
 * the legacy fallback to the configured Members API.
 *
 * @param handle Member handle to resolve case-insensitively in the database.
 * @returns Member id, email, and handle.
 * @throws {BadRequestError} When neither source contains the member.
 * @throws Authentication, network, or API errors other than a fallback 404.
 */
async function getMemberDetailsByHandle (handle) {
  try {
    const profile = await prismaMember.member.findUnique({
      where: {
        handleLower: _.toLower(handle)
      },
      select: {
        userId: true,
        handle: true,
        email: true
      }
    })
    if (!profile || !profile.userId) {
      throw new Error(`Member profile not found for handle: ${handle}`)
    }
    return { memberId: profile.userId, email: profile.email, handle }
  } catch (e) {
    // fall back to v3 api...
    logger.warn(`Get Member by Handle from DB Failed, trying v3 Members API. Error: ${JSON.stringify(e)}`)
    return getMemberDetailsByHandleFromV3Members(handle)
  }
}

/**
 * Resolve member details by member id.
 *
 * The members database is attempted first. Any database miss or error retains
 * the legacy fallback to the configured Members API.
 *
 * @param memberId Member id to resolve, or a falsey value to skip lookup.
 * @returns Member details, or `null` for a falsey member id.
 * @throws {BadRequestError} When neither source contains the member.
 * @throws Authentication, network, or API errors other than a fallback 404.
 */
async function getMemberDetailsById (memberId) {
  if (!memberId) {
    return null
  }
  try {
    const profile = await prismaMember.member.findUnique({
      where: {
        userId: _.toNumber(memberId)
      },
      select: {
        userId: true,
        handle: true,
        email: true
      }
    })
    if (!profile || !profile.userId) {
      throw new Error(`Member profile not found for memberId: ${memberId}`)
    }
    return { memberId: profile.userId, email: profile.email, handle: profile.handle }
  } catch (e) {
    // fall back to v3 api...
    logger.warn(`Get Member by userId from DB Failed, trying v3 Members API. Error: ${JSON.stringify(e)}`)
    return getMemberDetailsByIdFromMemberApi(memberId)
  }
}

/**
 * Fetch challenge information by challenge id.
 *
 * When includeDetails is false, the challenge database is used for a lightweight
 * existence check and a local NotFoundError is raised if the record is missing.
 * When includeDetails is true, Challenge API remains authoritative for the full
 * payload and its error contract, including the 404 response shape exposed by
 * resource create/delete flows.
 *
 * @param {String} challengeId the challenge id
 * @param {Object} [options] optional parameters
 * @param {Boolean} [options.includeDetails=false] whether to fetch full challenge details from the API
 * @returns {Promise<Object>} the challenge record or detailed Challenge API payload
 * @throws {NotFoundError} when includeDetails is false and the challenge database record is missing
 */
async function getChallengeById (challengeId, options: { includeDetails?: boolean } = {}) {
  const { includeDetails = false } = options

  if (includeDetails) {
    const response = await getRequest(`${config.CHALLENGE_API_URL}/${challengeId}`)
    return _.get(response, 'body', null)
  }

  const challengeRecord = await prismaChallenge.challenge.findUnique({ where: { id: challengeId } })

  if (!challengeRecord) {
    throw new errors.NotFoundError(`Challenge ID ${challengeId} not found`)
  }

  return challengeRecord
}

/**
 * Determine whether challenge whitelist checks apply for a request.
 * Interactive users, including admins and anonymous callers, must be evaluated;
 * M2M callers are allowed to bypass this user-facing access control.
 *
 * @param {Object} currentUser the user who performs the operation
 * @returns {Boolean} true when whitelist rules should be applied
 * @throws Does not throw.
 */
function shouldApplyChallengeWhitelist (currentUser) {
  return !_.get(currentUser, 'isMachine', false)
}

/**
 * Filter challenge ids by the current challenge user whitelist state.
 * Challenges with no whitelist rows stay visible. Evaluation failures fail
 * closed and return an empty list for interactive callers.
 *
 * @param {Object} currentUser the user who performs the operation
 * @param {Array<String>} challengeIds challenge ids to filter
 * @returns {Promise<Array<String>>} challenge ids visible to the caller
 * @throws Does not throw for database evaluation failures; those failures are
 * logged and fail closed with an empty list.
 */
async function filterChallengeIdsByWhitelist (currentUser, challengeIds) {
  const ids = _.uniq((challengeIds || []).map(id => _.toString(id).trim()).filter(Boolean))
  if (ids.length === 0 || !shouldApplyChallengeWhitelist(currentUser)) {
    return ids
  }

  const userId = _.toString(_.get(currentUser, 'userId', '')).trim()

  try {
    const rows = await prismaChallenge.challengeUserWhitelist.findMany({
      where: { challengeId: { in: ids } },
      select: { challengeId: true, userId: true }
    })
    const restrictedIds = new Set(rows.map(row => row.challengeId))
    const allowedRestrictedIds = new Set(
      rows
        .filter(row => userId && _.toString(row.userId) === userId)
        .map(row => row.challengeId)
    )

    return ids.filter(id => !restrictedIds.has(id) || allowedRestrictedIds.has(id))
  } catch (err) {
    logger.warn(`filterChallengeIdsByWhitelist failed: ${err.message}`)
    return []
  }
}

/**
 * Ensure an interactive caller is allowed by the challenge whitelist.
 *
 * @param {Object} currentUser the user who performs the operation
 * @param {String} challengeId the challenge id to evaluate
 * @returns {Promise<void>}
 * @throws {ForbiddenError} when the whitelist blocks the caller or evaluation fails
 */
async function ensureChallengeWhitelistAccess (currentUser, challengeId) {
  const visibleIds = await filterChallengeIdsByWhitelist(currentUser, [challengeId])
  if (!visibleIds.includes(challengeId)) {
    throw new errors.ForbiddenError(`You don't have access to view this challenge`)
  }
}

/**
 * Resolve member details by handle through the configured Members API.
 *
 * @param handle Member handle passed in the request path.
 * @returns Member id, email, and canonical API handle.
 * @throws {BadRequestError} When the API returns 404 or no user id.
 * @throws Authentication, network, and non-404 API errors.
 */
async function getMemberDetailsByHandleFromV3Members (handle) {
  let memberId
  let email
  try {
    const res = await getRequest(`${config.MEMBER_API_URL}/${handle}`)
    if (_.get(res, 'body.userId')) {
      memberId = String(res.body.userId)
    }
    if (_.get(res, 'body.email')) {
      email = String(res.body.email)
    }
    // handle return from v3 API, handle and memberHandle are the same under case-insensitive condition
    handle = _.get(res, 'body.handle')
  } catch (error) {
    // re-throw all error except 404 Not-Founded, BadRequestError should be thrown if 404 occurs
    if (error.status !== 404) {
      throw error
    }
  }

  if (_.isUndefined(memberId)) {
    throw new errors.BadRequestError(`User with handle: ${handle} doesn't exist`)
  }

  return { memberId, email, handle }
}

/**
 * Resolve member details by id through the configured Members API.
 *
 * @param userId Member id passed as the API query parameter.
 * @returns Member id, email, and handle.
 * @throws {BadRequestError} When the API returns 404 or no user id.
 * @throws Authentication, network, and non-404 API errors.
 */
async function getMemberDetailsByIdFromMemberApi (userId) {
  let memberId
  let email
  let handle
  try {
    logger.warn(`getMemberDetailsByIdFromMemberApi ${handle} from v6`)
    const res = await getRequest(`${config.MEMBER_API_URL}?userId=${userId}`)
    if (_.get(res, 'body[0].userId')) {
      memberId = String(res.body[0].userId)
    }
    if (_.get(res, 'body[0].email')) {
      email = String(res.body[0].email)
    }
    if (_.get(res, 'body[0].handle')) {
      handle = _.get(res, 'body[0].handle')
    }
  } catch (error) {
    // re-throw all error except 404 Not-Founded, BadRequestError should be thrown if 404 occurs
    if (error.status !== 404) {
      throw error
    }
  }

  if (_.isUndefined(memberId)) {
    throw new errors.BadRequestError(`User with id: ${userId} doesn't exist`)
  }

  return { memberId, email, handle }
}

/**
 * Update an existing resources-database record and its audit fields.
 *
 * The supplied record is mutated before the complete object is passed to
 * Prisma, matching the established update semantics.
 *
 * @param authUser Authenticated user supplying `updatedBy`.
 * @param modelName Prisma model name in its exported PascalCase form.
 * @param dbItem Existing Prisma record; mutated in place.
 * @param data Fields to merge into the existing record.
 * @returns The updated Prisma record.
 * @throws A Prisma validation or driver error when the update fails.
 */
async function update (authUser, modelName, dbItem, data) {
  Object.keys(data).forEach((key) => {
    dbItem[key] = data[key]
  })
  dbItem.updatedBy = getUserIdFromToken(authUser)
  dbItem.updatedAt = moment().utc().format()
  const prismaModel = _.camelCase(modelName)
  const ret = await prisma[prismaModel].update({
    data: dbItem,
    where: { id: dbItem.id }
  })
  return ret
}

/**
 * Reject an operation when matching resources-database records already exist.
 *
 * @param modelName Prisma model name in its exported PascalCase form.
 * @param queryParams Prisma `where` filter used for the count.
 * @param errorMessage Conflict message used when a duplicate is found.
 * @returns A promise that resolves with no value when no duplicate exists.
 * @throws {ConflictError} When at least one matching record exists.
 * @throws A Prisma driver error when the count fails.
 */
async function validateDuplicate (modelName, queryParams, errorMessage) {
  const prismaModel = _.camelCase(modelName)
  const count = await prisma[prismaModel].count({ where: queryParams })
  if (count > 0) {
    throw new errors.ConflictError(errorMessage)
  }
}

/**
 * Send an authenticated GET request with the service's M2M token.
 *
 * @param url Target URL.
 * @param query Optional query parameters.
 * @returns The SuperAgent response.
 * @throws M2M authentication, network, or HTTP response errors.
 */
async function getRequest (url, query?: any) {
  const m2mToken = await m2m.getMachineToken(config.AUTH0_CLIENT_ID, config.AUTH0_CLIENT_SECRET)
  logger.debug(`GET ${url} with query ${JSON.stringify(query)}`)
  return request
    .get(url)
    .set('Authorization', `Bearer ${m2mToken}`)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .query(query || {})
}

/**
 * Send an authenticated POST request with the service's M2M token.
 *
 * Errors are logged to the console and rethrown unchanged to preserve the
 * existing API integration behavior.
 *
 * @param url Target URL.
 * @param data Optional request body.
 * @returns The SuperAgent response.
 * @throws M2M authentication, network, or HTTP response errors.
 */
async function postRequest (url, data?: any) {
  try {
    const m2mToken = await m2m.getMachineToken(config.AUTH0_CLIENT_ID, config.AUTH0_CLIENT_SECRET)

    const res = await request
      .post(url)
      .set('Authorization', `Bearer ${m2mToken}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(data)

    return res
  } catch (err) {
    console.error(err)
    throw err
  }
}

/**
 * Build an absolute pagination link while retaining existing query parameters.
 *
 * @param req HTTP request containing `path` and `query`.
 * @param page Page number to place in the link.
 * @returns Absolute page URL based on `API_BASE_URL`.
 * @throws A serialization error for unsupported query values.
 */
function getPageLink (req, page) {
  const q = _.assignIn({}, req.query, { page })
  return `${config.API_BASE_URL}${req.path}?${querystring.stringify(q)}`
}

/**
 * Set pagination and RFC 5988-style Link headers on an HTTP response.
 *
 * @param req HTTP request used to generate page links.
 * @param res HTTP response exposing a `set` method.
 * @param result Result containing `total`, `page`, and `perPage`.
 * @returns No value; headers are written to `res`.
 * @throws Errors from response header assignment or link generation.
 */
function setResHeaders (req, res, result) {
  const totalPages = Math.ceil(result.total / result.perPage)
  if (parseInt(result.page, 10) > 1) {
    res.set('X-Prev-Page', parseInt(result.page, 10) - 1)
  }
  if (parseInt(result.page, 10) < totalPages) {
    res.set('X-Next-Page', parseInt(result.page, 10) + 1)
  }
  res.set('X-Page', parseInt(result.page, 10))
  res.set('X-Per-Page', result.perPage)
  res.set('X-Total', result.total)
  res.set('X-Total-Pages', totalPages)
  // set Link header
  if (totalPages > 0) {
    let link = `<${getPageLink(req, 1)}>; rel="first", <${getPageLink(req, totalPages)}>; rel="last"`
    if (parseInt(result.page, 10) > 1) {
      link += `, <${getPageLink(req, parseInt(result.page, 10) - 1)}>; rel="prev"`
    }
    if (parseInt(result.page, 10) < totalPages) {
      link += `, <${getPageLink(req, parseInt(result.page, 10) + 1)}>; rel="next"`
    }
    res.set('Link', link)
  }
}

/**
 * Fetch and concatenate all pages from a Topcoder API endpoint.
 *
 * @param url Endpoint URL.
 * @param query Optional query parameters excluding `page` and `perPage`.
 * @returns All array records returned before an empty page or reported total.
 * @throws M2M authentication, network, or HTTP response errors.
 */
async function getAllPages (url, query?: any) {
  const perPage = 100
  let page = 1
  let result = []
  for (;;) {
    // get current page data
    const res = await getRequest(url, _.assignIn({ page, perPage }, query || {}))
    if (!_.isArray(res.body) || res.body.length === 0) {
      break
    }
    result = _.concat(result, res.body)
    if (res.headers['x-total']) {
      const total = Number(res.headers['x-total'])
      if (page * perPage >= total) {
        break
      }
    }
    // increment page
    page += 1
  }
  return result
}

/**
 * Fetch all group ids assigned to a member.
 *
 * @param userId Member id used by the Groups API.
 * @returns The Groups API response body.
 * @throws M2M authentication, network, or Groups API errors.
 */
async function getUserGroupIds (userId) {
  const url = config.GROUPS_API_URL + `/memberGroups/${userId}`
  const response = await getRequest(url, { uuid: true })
  return response.body
}

/**
 * Check whether a user may access every group assigned to a challenge.
 *
 * Machine users and administrators bypass group lookup. Despite the legacy
 * comment, this helper returns a boolean and does not itself throw a 403.
 *
 * @param authUser Authenticated user payload.
 * @param groups Challenge group ids.
 * @returns `true` when access is allowed; otherwise `false`.
 * @throws M2M authentication, network, or Groups API errors.
 */
async function checkChallengeGroupAccess (authUser, groups) {
  // allow admin user
  if (authUser.isMachine || hasAdminRole(authUser)) {
    return true
  }
  // if challenge.groups is empty, allow access
  if (!groups || groups.length === 0) {
    return true
  }
  // get user group ids
  const userGroupIds = await getUserGroupIds(authUser.userId)
  const filtered = groups.filter(e => !userGroupIds.includes(e))
  if (filtered.length > 0) {
    return false
  }
  return true
}

/**
 * Ensure a member has agreed to all terms required for a resource role.
 *
 * @param userId Member id supplied to the Terms API.
 * @param terms Term objects containing ids and role ids.
 * @returns A promise that resolves with no value when all terms are agreed.
 * @throws {ForbiddenError} With missing-term metadata when agreements are
 * incomplete.
 * @throws M2M authentication, network, or Terms API errors.
 */
async function checkAgreedTerms (userId, terms) {
  const unAgreedTerms = []
  const missingTerms = []
  for (const term of terms) {
    const res = await getRequest(`${config.TERMS_API_URL}/${term.id}`, { userId })
    if (!_.get(res, 'body.agreed', false)) {
      unAgreedTerms.push(_.get(res, 'body.title', term))
      missingTerms.push({
        termId: term.id,
        roleId: term.roleId
      })
    }
  }

  if (unAgreedTerms.length > 0) {
    throw new errors.ForbiddenError(`The user has not yet agreed to the following terms: [${unAgreedTerms.join(', ')}]`, null, { missingTerms })
  }
}

/**
 * Request a challenge phase transition, retrying failed attempts after five
 * seconds.
 *
 * The initial request plus up to three retries retain the existing behavior.
 * After the final failed attempt the function resolves with `undefined`.
 *
 * @param challengeId Challenge id used in the API path.
 * @param phase Phase name to transition.
 * @param operation Transition operation, such as `close`.
 * @param numAttempts Current one-based attempt number used by recursive retries.
 * @returns The successful response body, or `undefined` after all failures.
 * @throws {Error} Immediately when a required argument is missing.
 */
async function advanceChallengePhase (challengeId, phase, operation, numAttempts = 1) {
  if (!challengeId || !phase || !operation) {
    throw new Error('Invalid arguments')
  }

  try {
    console.log('Initiating advance phase:', challengeId, phase, operation)

    const response = await postRequest(`${config.CHALLENGE_API_URL}/${challengeId}/advance-phase`, {
      phase,
      operation
    })

    if (response.status !== 200) {
      throw new Error(`Received non-200 status code: ${response.status}`)
    }

    console.log('Successfully advanced phase with response:', response.body)
    return response.body
  } catch (err) {
    logger.warn(`Error while advancing phase for challenge ${challengeId}. ${JSON.stringify(err)}`)

    if (numAttempts <= 3) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(advanceChallengePhase(challengeId, phase, operation, ++numAttempts))
        }, 5000)
      })
    }
  }
}

module.exports = {
  wrapExpress,
  autoWrapExpress,
  getMemberInfoByIdList,
  getMemberDetailsByHandle,
  getMemberDetailsById,
  checkIfExists,
  hasAdminRole,
  getUserHandleOrSub,
  getUserIdFromToken,
  getById,
  update,
  validateDuplicate,
  getRequest,
  postEvent,
  isCustomError,
  setResHeaders,
  getAllPages,
  checkChallengeGroupAccess,
  shouldApplyChallengeWhitelist,
  filterChallengeIdsByWhitelist,
  ensureChallengeWhitelistAccess,
  checkAgreedTerms,
  postRequest,
  advanceChallengePhase,
  getChallengeById,
  // Challenge DB client (exported for targeted updates)
  prismaChallenge
}
