/**
 * Provides the lightweight health summary exposed by Resources API v6.
 */

interface HealthCheckResult {
  checksRun: number
}

/**
 * Returns the historical health-check result without probing external systems.
 *
 * HealthCheckController invokes this for every public health request. The fixed
 * count is retained for compatibility with existing monitoring consumers.
 *
 * @returns A promise resolving to an object whose `checksRun` value is 1.
 * @throws Does not throw.
 */
async function check (): Promise<HealthCheckResult> {
  return {
    checksRun: 1
  }
}

module.exports = {
  check
}
