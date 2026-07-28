const config = require('config')
const fs = require('fs/promises')
const path = require('path')
const newman = require('newman')
const helper = require('../../src/common/helper')
const logger = require('../../src/common/logger')

const m2m = require('tc-core-library-js').auth.m2m({
  AUTH0_URL: config.AUTH0_URL,
  AUTH0_AUDIENCE: config.AUTH0_AUDIENCE,
  TOKEN_CACHE_TIME: config.TOKEN_CACHE_TIME,
  AUTH0_PROXY_SERVER_URL: config.AUTH0_PROXY_SERVER_URL
})

let executions = 0
let failures = 0
const reportData = { folders: [] }

/**
 * Create a validation error that the Postman entrypoint can identify without
 * depending on a validation framework.
 *
 * @param {string} message description of the invalid test configuration
 * @returns {Error} an error whose name is ValidationError
 */
function createValidationError (message) {
  const error = new Error(message)
  error.name = 'ValidationError'
  return error
}

/**
 * Convert the reporter configuration to an array. Environment overrides may
 * be supplied as JSON or as a comma-separated string.
 *
 * @param {string|string[]} value configured Newman reporter names
 * @returns {string[]} normalized reporter names
 * @throws {Error} if the value cannot be converted to reporter names
 */
function parseReporters (value) {
  if (Array.isArray(value)) {
    return value
  }
  if (typeof value !== 'string' || value.trim() === '') {
    throw createValidationError('AUTOMATED_TESTING_REPORTERS_FORMAT must contain at least one reporter.')
  }
  if (value.trim().startsWith('[')) {
    try {
      const parsed = JSON.parse(value)
      if (Array.isArray(parsed)) {
        return parsed
      }
    } catch (error) {
      throw createValidationError('AUTOMATED_TESTING_REPORTERS_FORMAT is not valid JSON: ' + error.message)
    }
  }
  return value.split(',').map(reporter => reporter.trim()).filter(Boolean)
}

/**
 * Validate the credentials and runner settings used by the resource Postman
 * collection.
 *
 * @returns {string[]} configured Newman reporters
 * @throws {Error} if required credentials or runner settings are missing
 */
function validateConfig () {
  const requiredStrings = [
    'AUTH0_CLIENT_ID',
    'AUTH0_CLIENT_SECRET',
    'AUTH_V2_URL',
    'AUTH_V2_CLIENT_ID',
    'AUTH_V3_URL',
    'ADMIN_CREDENTIALS_USERNAME',
    'ADMIN_CREDENTIALS_PASSWORD',
    'COPILOT_CREDENTIALS_USERNAME',
    'COPILOT_CREDENTIALS_PASSWORD',
    'USER_CREDENTIALS_USERNAME',
    'USER_CREDENTIALS_PASSWORD'
  ]
  const missing = requiredStrings.filter(key => typeof config[key] !== 'string' || config[key].trim() === '')
  if (missing.length > 0) {
    throw createValidationError('Missing required Postman configuration: ' + missing.join(', '))
  }
  if (!Number.isFinite(Number(config.WAIT_TIME)) || Number(config.WAIT_TIME) < 0) {
    throw createValidationError('WAIT_TIME must be a non-negative number.')
  }
  const reporters = parseReporters(config.AUTOMATED_TESTING_REPORTERS_FORMAT)
  const allowedReporters = new Set(['cli', 'html', 'json', 'junit'])
  if (reporters.length === 0 || reporters.some(reporter => typeof reporter !== 'string' || !allowedReporters.has(reporter))) {
    throw createValidationError('AUTOMATED_TESTING_REPORTERS_FORMAT supports cli, html, json, and junit.')
  }
  return reporters
}

/**
 * Post JSON and parse a JSON response using Node's built-in Fetch API.
 *
 * @param {string} url endpoint to call
 * @param {object} body request payload
 * @returns {Promise<object>} parsed response body
 * @throws {Error} when the endpoint rejects the request or returns invalid JSON
 */
async function postJson (url, body) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'cache-control': 'no-cache',
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  const responseBody = await response.text()
  if (!response.ok) {
    throw new Error('Token endpoint ' + url + ' returned ' + response.status + ': ' + responseBody)
  }
  try {
    return JSON.parse(responseBody)
  } catch (error) {
    throw new Error('Token endpoint ' + url + ' returned invalid JSON: ' + error.message)
  }
}

/**
 * Get the machine token used by M2M Postman requests.
 *
 * @returns {Promise<string>} machine token without a Bearer prefix
 * @throws {Error} when Auth0 cannot issue the configured client a token
 */
async function getM2MToken () {
  return m2m.getMachineToken(config.AUTH0_CLIENT_ID, config.AUTH0_CLIENT_SECRET)
}

/**
 * Exchange user credentials for a Topcoder v3 token.
 *
 * @param {string} username Topcoder account username
 * @param {string} password Topcoder account password
 * @param {string} roleLabel role name used in validation errors
 * @returns {Promise<string>} user token without a Bearer prefix
 * @throws {Error} when either token exchange fails or omits the expected token
 */
async function getUserToken (username, password, roleLabel) {
  const v2 = await postJson(config.AUTH_V2_URL, {
    username,
    password,
    client_id: config.AUTH_V2_CLIENT_ID,
    sso: false,
    scope: 'openid profile offline_access',
    response_type: 'token',
    connection: 'TC-User-Database',
    grant_type: 'password',
    device: 'Browser'
  })
  const v3 = await postJson(config.AUTH_V3_URL, {
    param: {
      externalToken: v2.id_token,
      refreshToken: v2.refresh_token
    }
  })
  const token = v3 && v3.result && v3.result.content && v3.result.content.token
  if (typeof token !== 'string' || token === '') {
    throw new Error('The v3 authorization response did not include a ' + roleLabel + ' token.')
  }
  return token
}

/**
 * Run Newman with Promise semantics.
 *
 * @param {object} options Newman runner options
 * @returns {Promise<object>} Newman run summary
 * @throws {Error} when Newman cannot start or complete the run
 */
function runNewman (options) {
  return new Promise((resolve, reject) => {
    newman.run(options, (error, results) => {
      if (error) {
        reject(error)
        return
      }
      resolve(results)
    })
  })
}

/**
 * Pause between Postman folders so downstream services are not overwhelmed.
 *
 * @param {number} milliseconds delay duration
 * @returns {Promise<void>} resolves after the delay
 */
function sleep (milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

/**
 * Escape untrusted report values before writing them into HTML.
 *
 * @param {unknown} value report value
 * @returns {string} HTML-safe value
 */
function escapeHtml (value) {
  const replacements = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
  return String(value).replace(/[&<>"']/g, character => replacements[character])
}

/**
 * Convert milliseconds to the duration format used in test summaries.
 *
 * @param {number} milliseconds elapsed duration
 * @returns {string} minutes and seconds
 */
function convertDuration (milliseconds) {
  const minutes = Math.floor(milliseconds / 60000)
  const seconds = ((milliseconds % 60000) / 1000).toFixed(0)
  return minutes + ' m ' + seconds + ' s'
}

/**
 * Write the aggregate Postman HTML report retained by CircleCI and print the
 * execution summary.
 *
 * @param {number} startTime epoch timestamp when the suite started
 * @returns {Promise<void>} resolves after the report has been written
 * @throws {Error} when the report directory or file cannot be written
 */
async function outputResults (startTime) {
  const totalTime = convertDuration(Date.now() - startTime)
  const rows = reportData.folders.map(result => [
    '<tr>',
    '<td>' + escapeHtml(result.folder) + '</td>',
    '<td>' + escapeHtml(result.total) + '</td>',
    '<td>' + escapeHtml(result.failed) + '</td>',
    '<td>' + escapeHtml(result.spentTime) + '</td>',
    '</tr>'
  ].join('')).join('\n')
  const report = [
    '<!doctype html>',
    '<html lang="en"><head><meta charset="utf-8"><title>Newman Report</title>',
    '<style>body{font-family:sans-serif;margin:2rem}table{border-collapse:collapse;width:100%}th,td{border:1px solid #ddd;padding:.5rem;text-align:left}th{background:#f5f5f5}</style>',
    '</head><body><h1>Newman Report</h1>',
    '<p>Time: ' + escapeHtml(totalTime) + '</p>',
    '<p>Total tests: ' + executions + '; Success: ' + (executions - failures) + '; Failures: ' + failures + '</p>',
    '<table><thead><tr><th>Request folder</th><th>Total</th><th>Failed</th><th>Time</th></tr></thead><tbody>',
    rows,
    '</tbody></table></body></html>'
  ].join('\n')
  const reportDirectory = path.resolve('newman')
  await fs.mkdir(reportDirectory, { recursive: true })
  await fs.writeFile(path.join(reportDirectory, 'reports.html'), report)
  console.info('────────────────────────────────────────────────────────────────────')
  console.info('Total tests: ' + executions + '\tSuccess: ' + (executions - failures) + '\tFailures: ' + failures)
  console.info('Report saved')
}

/**
 * Convert Postman iteration data without mutating the imported JSON fixtures.
 * Newman expects request bodies to be serialized strings.
 *
 * @param {object[]|undefined} iterationData fixture rows for a request folder
 * @returns {object[]} cloned and normalized fixture rows
 */
function normalizeIterationData (iterationData) {
  return (iterationData || []).map(data => ({
    ...data,
    ...(data.requestBody ? { requestBody: JSON.stringify(data.requestBody) } : {})
  }))
}

/**
 * Execute each selected resource Postman folder with fresh environment data,
 * stopping on the first failed folder and always producing the aggregate report.
 *
 * @param {object[]} requests Postman folder and iteration-data definitions
 * @param {string} collectionPath path to the Postman collection
 * @param {string} environmentPath path to the Postman environment
 * @returns {Promise<void>} resolves when every selected folder succeeds
 * @throws {Error} when configuration, authentication, or a Newman run fails
 */
async function runTests (requests, collectionPath, environmentPath) {
  const startTime = Date.now()
  const configuredReporters = validateConfig()
  const reporters = configuredReporters.filter(reporter => reporter !== 'html')
  executions = 0
  failures = 0
  reportData.folders = []

  const tests = requests.reduce((count, request) => count + (request.iterationData ? request.iterationData.length : 1), 0)
  console.info('\t        Number of Requests to Run : ' + requests.length + '\n')
  console.info('\tNumber of Tests/Iterations to Run : ' + tests + '\n')

  const m2mToken = await getM2MToken()
  const adminToken = await getUserToken(
    config.ADMIN_CREDENTIALS_USERNAME,
    config.ADMIN_CREDENTIALS_PASSWORD,
    'administrator'
  )
  const copilotToken = await getUserToken(
    config.COPILOT_CREDENTIALS_USERNAME,
    config.COPILOT_CREDENTIALS_PASSWORD,
    'copilot'
  )
  const userToken = await getUserToken(
    config.USER_CREDENTIALS_USERNAME,
    config.USER_CREDENTIALS_PASSWORD,
    'user'
  )
  const originalEnvVars = [
    { key: 'm2m_token', value: m2mToken },
    { key: 'M2M_TOKEN', value: m2mToken },
    { key: 'admin_token', value: adminToken },
    { key: 'copilot_token', value: copilotToken },
    { key: 'user_token', value: userToken }
  ]
  const options = {
    collection: collectionPath,
    exportEnvironment: environmentPath,
    reporters: reporters.length > 0 ? reporters : ['cli']
  }

  for (const request of requests) {
    options.envVar = [
      ...originalEnvVars,
      ...Object.entries(request.iterationData || {}).map(([key, value]) => ({ key, value }))
    ]
    delete require.cache[environmentPath]
    options.environment = require(environmentPath)
    options.folder = request.folder
    options.iterationData = normalizeIterationData(request.iterationData)

    const requestStart = Date.now()
    const results = await runNewman(options)
    const runs = results.run && results.run.executions ? results.run.executions.length : 0
    const failed = results.run && results.run.failures ? results.run.failures.length : 0
    executions += runs
    failures += failed
    reportData.folders.push({
      folder: request.folder,
      total: runs,
      failed,
      spentTime: (Date.now() - requestStart) + ' ms'
    })
    if (failed > 0) {
      await outputResults(startTime)
      throw new Error('Postman folder "' + request.folder + '" failed ' + failed + ' assertion(s).')
    }
    await sleep(Number(config.WAIT_TIME))
  }
  await outputResults(startTime)
}

const requests = [
  {
    folder: 'create resource role by admin',
    iterationData: require('./testData/resource-role/create-resource-role-by-admin.json')
  },
  {
    folder: 'create resource role by m2m',
    iterationData: require('./testData/resource-role/create-resource-role-by-m2m.json')
  },
  {
    folder: 'create resource role with all kinds of invalid token',
    iterationData: require('./testData/resource-role/create-resource-role-with-invalid-tokens.json')
  },
  {
    folder: 'update resource role by admin',
    iterationData: require('./testData/resource-role/update-resource-role-by-admin.json')
  },
  {
    folder: 'update resource role by m2m',
    iterationData: require('./testData/resource-role/update-resource-role-by-m2m.json')
  },
  {
    folder: 'update resource role with all kinds of invalid token',
    iterationData: require('./testData/resource-role/update-resource-role-with-invalid-tokens.json')
  }, {
    folder: 'failure - update resource role invalid id 404'
  },
  {
    folder: 'create dependency by admin',
    iterationData: require('./testData/resource-role-phase-dependency/create-dependency.json')
  },
  {
    folder: 'create dependency by m2m',
    iterationData: require('./testData/resource-role-phase-dependency/create-dependency.json')
  },
  {
    folder: 'create dependency with all kinds of invalid token',
    iterationData: require('./testData/resource-role-phase-dependency/create-dependency-with-invalid-tokens.json')
  },
  {
    folder: 'create dependency with not found phase id 404'
  },
  {
    folder: 'get all dependencies'
  },
  {
    folder: 'get matched dependencies'
  },
  {
    folder: 'get dependencies with all kinds of invalid token',
    iterationData: require('./testData/resource-role-phase-dependency/get-dependency-with-invalid-tokens.json')
  },
  {
    folder: 'update dependency by admin',
    iterationData: require('./testData/resource-role-phase-dependency/update-dependency.json')
  },
  {
    folder: 'update dependency by m2m',
    iterationData: require('./testData/resource-role-phase-dependency/update-dependency.json')
  },
  {
    folder: 'update not found dependency 404'
  },
  {
    folder: 'update dependency with all kinds of invalid token',
    iterationData: require('./testData/resource-role-phase-dependency/update-dependency-with-invalid-tokens.json')
  },
  {
    folder: 'delete dependency with all kinds of invalid token',
    iterationData: require('./testData/resource-role-phase-dependency/delete-dependency-with-invalid-tokens.json')
  },
  {
    folder: 'delete dependency with admin'
  },
  {
    folder: 'delete dependency with m2m'
  },
  {
    folder: 'create resource role with all kinds of invalid request body',
    iterationData: require('./testData/resource-role/create-resource-role-with-invalid-data.json')
  },
  {
    folder: 'update resource role with all kinds of invalid request body',
    iterationData: require('./testData/resource-role/update-resource-role-with-invalid-data.json')
  },
  {
    folder: 'get all resource roles'
  },
  {
    folder: 'get matched resource roles'
  },
  {
    folder: 'get resource roles with all kinds of invalid parameter',
    iterationData: require('./testData/resource-role/get-resource-role-with-invalid-data.json')
  },
  {
    folder: 'create dependency with all kinds of invalid request body',
    iterationData: require('./testData/resource-role-phase-dependency/create-dependency-with-invalid-data.json')
  },
  {
    folder: 'update dependency with all kinds of invalid request body',
    iterationData: require('./testData/resource-role-phase-dependency/update-dependency-with-invalid-data.json')
  },
  {
    folder: 'get dependencies with all kinds of invalid parameter',
    iterationData: require('./testData/resource-role-phase-dependency/get-dependencies-with-invalid-data.json')
  },
  {
    folder: 'create resource by admin',
    iterationData: require('./testData/resource/create-resource-by-admin.json')
  },
  {
    folder: 'create resource using m2m token',
    iterationData: require('./testData/resource/create-resource-by-m2m.json')
  },
  {
    folder: 'create resource with all kinds of invalid token',
    iterationData: require('./testData/resource/create-resource-with-invalid-tokens.json')
  },
  {
    folder: 'create resource with all kinds of invalid request body',
    iterationData: require('./testData/resource/create-resource-with-invalid-data.json')
  },
  {
    folder: 'get resources by required parameter only',
    iterationData: require('./testData/resource/get-resources-with-required-parameter.json')
  },
  {
    folder: 'get resources with all parameters',
    iterationData: require('./testData/resource/get-resources-with-all-parameters.json')
  },
  {
    folder: 'get resources with all kinds of invalid parameter',
    iterationData: require('./testData/resource/get-resources-with-invalid-data.json')
  },
  {
    folder: 'get challenges by member with different users',
    iterationData: require('./testData/resource/get-resources-by-member-with-different-users.json')
  },
  {
    folder: 'get challenges by member with resource role',
    iterationData: require('./testData/resource/get-resources-by-member-with-resource-role.json')
  },
  {
    folder: 'get challenges by member with all kinds of invalid token',
    iterationData: require('./testData/resource/get-resources-by-member-with-invalid-tokens.json')
  },
  {
    folder: 'get challenges by member with all kinds of invalid parameter',
    iterationData: require('./testData/resource/get-resources-by-member-with-invalid-parameter.json')
  },
  {
    folder: 'delete resource with all kinds of invalid token',
    iterationData: require('./testData/resource/delete-resource-with-invalid-tokens.json')
  },
  {
    folder: 'delete resource with all kinds of invalid parameter',
    iterationData: require('./testData/resource/delete-resource-with-invalid-parameter.json')
  },
  {
    folder: 'delete resource with admin'
  },
  {
    folder: 'delete resource with m2m'
  }
]

/**
 * Clear the test data.
 * @return {Promise<void>}
 */
async function clearTestData () {
  logger.info('Clear the Postman test data.')
  await helper.postRequest(`${config.API_BASE_URL}/${config.API_VERSION}/resources/internal/jobs/clean`)
  logger.info('Finished clear the Postman test data.')
}

/**
 * Run the Postman tests and clean their generated API data.
 *
 * Authentication or assertion failures set a non-zero process exit code so
 * CI cannot publish a passing result for a failed regression suite.
 */
runTests(requests, require.resolve('./resource-api.postman_collection.json'),
  require.resolve('./resource-api.postman_environment.json')).then(async () => {
  logger.info('newman test completed!')
  await clearTestData()
}).catch(async (err) => {
  logger.logFullError(err)

  try {
    // Only call the cleanup function when the suite reached the API.
    if (err.name !== 'ValidationError') {
      await clearTestData()
    }
  } finally {
    process.exitCode = 1
  }
})
