/**
 * PostgreSQL driver-adapter configuration for Prisma 7.
 *
 * Existing deployments encode the target PostgreSQL schema and optional pool
 * overrides in their database URLs. Prisma's `pg` adapter needs the schema as
 * a separate adapter option, while node-postgres needs pool settings as
 * explicit configuration. This module bridges those formats without changing
 * or replacing the configured connection string.
 */

import { PrismaPg } from '@prisma/adapter-pg'
import type { PoolConfig } from 'pg'

const DEFAULT_POSTGRES_SCHEMA = 'public'
const PRISMA_V6_CONNECTION_TIMEOUT_MS = 5_000
const PRISMA_V6_IDLE_TIMEOUT_MS = 300_000

/**
 * Prisma adapter options derived from an existing PostgreSQL URL.
 */
export interface PostgresAdapterConfiguration {
  /** node-postgres pool configuration, including the original URL verbatim. */
  poolConfig: PoolConfig
  /** Prisma adapter options that select the schema used to qualify queries. */
  adapterOptions: {
    schema: string
  }
}

/**
 * Parse a non-negative numeric URL parameter.
 *
 * Invalid values are deliberately ignored here and left in the untouched
 * connection string for the underlying PostgreSQL driver to validate.
 *
 * @param value Raw URL parameter value.
 * @returns The parsed number, or `undefined` when the value is absent,
 * negative, or not finite.
 * @throws Does not throw.
 */
function parseNonNegativeNumber (value: string | null): number | undefined {
  if (value === null || value.trim() === '') {
    return undefined
  }

  const parsed = Number(value)
  if (!Number.isFinite(parsed) || parsed < 0) {
    return undefined
  }

  return parsed
}

/**
 * Convert a URL parameter expressed in seconds to milliseconds.
 *
 * @param value Raw URL parameter value.
 * @returns The duration in milliseconds, or `undefined` for an invalid value.
 * @throws Does not throw.
 */
function secondsToMilliseconds (value: string | null): number | undefined {
  const seconds = parseNonNegativeNumber(value)
  return seconds === undefined ? undefined : seconds * 1_000
}

/**
 * Resolve Prisma 7 adapter and node-postgres pool settings from an existing
 * PostgreSQL connection string.
 *
 * The original connection string is preserved verbatim so settings already
 * understood by node-postgres, including TLS, `statement_timeout`, and
 * `application_name`, continue to work. Prisma 6 pool overrides are copied to
 * their closest node-postgres equivalents when one exists. If both
 * `connect_timeout` and `pool_timeout` are present, `connect_timeout` wins
 * because node-postgres exposes a single timeout for both connection and pool
 * acquisition.
 *
 * @param connectionString Existing PostgreSQL connection string.
 * @param variableName Environment-variable name used in configuration errors.
 * @returns Pool and adapter settings suitable for `PrismaPg`.
 * @throws {Error} When the connection string is missing, malformed, or does
 * not use the PostgreSQL protocol.
 */
export function resolvePostgresAdapterConfiguration (
  connectionString: string | undefined,
  variableName = 'DATABASE_URL'
): PostgresAdapterConfiguration {
  if (!connectionString) {
    throw new Error(`${variableName} must be set`)
  }

  let parsedUrl: URL
  try {
    parsedUrl = new URL(connectionString)
  } catch (cause) {
    throw new Error(`${variableName} must be a valid PostgreSQL connection URL`, { cause })
  }

  if (parsedUrl.protocol !== 'postgresql:' && parsedUrl.protocol !== 'postgres:') {
    throw new Error(`${variableName} must use the postgresql:// or postgres:// protocol`)
  }

  const schema = parsedUrl.searchParams.get('schema')?.trim() || DEFAULT_POSTGRES_SCHEMA
  const poolConfig: PoolConfig = {
    connectionString,
    connectionTimeoutMillis: PRISMA_V6_CONNECTION_TIMEOUT_MS,
    idleTimeoutMillis: PRISMA_V6_IDLE_TIMEOUT_MS
  }

  const connectionLimit = parseNonNegativeNumber(parsedUrl.searchParams.get('connection_limit'))
  if (connectionLimit !== undefined && connectionLimit > 0 && Number.isInteger(connectionLimit)) {
    poolConfig.max = connectionLimit
  }

  const connectTimeout = secondsToMilliseconds(parsedUrl.searchParams.get('connect_timeout'))
  const poolTimeout = secondsToMilliseconds(parsedUrl.searchParams.get('pool_timeout'))
  if (connectTimeout !== undefined) {
    poolConfig.connectionTimeoutMillis = connectTimeout
  } else if (poolTimeout !== undefined) {
    poolConfig.connectionTimeoutMillis = poolTimeout
  }

  const idleTimeout = secondsToMilliseconds(parsedUrl.searchParams.get('max_idle_connection_lifetime'))
  if (idleTimeout !== undefined) {
    poolConfig.idleTimeoutMillis = idleTimeout
  }

  const maximumLifetime = parseNonNegativeNumber(parsedUrl.searchParams.get('max_connection_lifetime'))
  if (maximumLifetime !== undefined) {
    poolConfig.maxLifetimeSeconds = maximumLifetime
  }

  return {
    poolConfig,
    adapterOptions: { schema }
  }
}

/**
 * Create a PostgreSQL driver adapter for a generated Prisma 7 client.
 *
 * Constructing the adapter does not establish a database connection. Prisma
 * retains its existing lazy behavior and opens the pool on the first query.
 *
 * @param connectionString Existing PostgreSQL connection string.
 * @param variableName Environment-variable name used in configuration errors.
 * @returns A configured Prisma PostgreSQL driver adapter.
 * @throws {Error} When the connection string cannot be resolved by
 * `resolvePostgresAdapterConfiguration`.
 */
export function createPostgresAdapter (
  connectionString: string | undefined,
  variableName = 'DATABASE_URL'
): PrismaPg {
  const { poolConfig, adapterOptions } = resolvePostgresAdapterConfiguration(connectionString, variableName)
  return new PrismaPg(poolConfig, adapterOptions)
}
