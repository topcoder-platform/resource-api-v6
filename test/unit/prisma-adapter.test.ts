/**
 * Unit tests for Prisma 7 PostgreSQL adapter configuration.
 */

const assert = require('node:assert/strict')
const {
  resolvePostgresAdapterConfiguration
} = require('../../src/common/prisma-adapter')

describe('Prisma PostgreSQL adapter configuration', () => {
  it('preserves the full URL and applies Prisma 6-compatible defaults', () => {
    const connectionString = 'postgresql://user:pass@localhost:5432/resources?schema=resources&statement_timeout=60000'

    const configuration = resolvePostgresAdapterConfiguration(connectionString)

    assert.equal(configuration.poolConfig.connectionString, connectionString)
    assert.equal(configuration.poolConfig.connectionTimeoutMillis, 5000)
    assert.equal(configuration.poolConfig.idleTimeoutMillis, 300000)
    assert.equal(configuration.adapterOptions.schema, 'resources')
  })

  it('defaults to the public schema for postgres URLs without a schema parameter', () => {
    const configuration = resolvePostgresAdapterConfiguration(
      'postgres://user:pass@localhost:5432/resources'
    )

    assert.equal(configuration.adapterOptions.schema, 'public')
  })

  it('decodes the schema and translates supported Prisma 6 pool overrides', () => {
    const configuration = resolvePostgresAdapterConfiguration(
      'postgresql://user:pass@localhost:5432/resources' +
      '?schema=tenant%20schema' +
      '&connection_limit=7' +
      '&connect_timeout=2' +
      '&pool_timeout=9' +
      '&max_idle_connection_lifetime=12.5' +
      '&max_connection_lifetime=30'
    )

    assert.equal(configuration.adapterOptions.schema, 'tenant schema')
    assert.equal(configuration.poolConfig.max, 7)
    assert.equal(configuration.poolConfig.connectionTimeoutMillis, 2000)
    assert.equal(configuration.poolConfig.idleTimeoutMillis, 12500)
    assert.equal(configuration.poolConfig.maxLifetimeSeconds, 30)
  })

  it('uses pool_timeout when connect_timeout is not configured', () => {
    const configuration = resolvePostgresAdapterConfiguration(
      'postgresql://user:pass@localhost:5432/resources?pool_timeout=11'
    )

    assert.equal(configuration.poolConfig.connectionTimeoutMillis, 11000)
  })

  it('rejects missing, malformed, and non-PostgreSQL connection strings', () => {
    assert.throws(
      () => resolvePostgresAdapterConfiguration(undefined, 'MEMBER_DB_URL'),
      /MEMBER_DB_URL must be set/
    )
    assert.throws(
      () => resolvePostgresAdapterConfiguration('not-a-url', 'DATABASE_URL'),
      /DATABASE_URL must be a valid PostgreSQL connection URL/
    )
    assert.throws(
      () => resolvePostgresAdapterConfiguration('mysql://user:pass@localhost/db', 'DATABASE_URL'),
      /DATABASE_URL must use the postgresql:\/\/ or postgres:\/\/ protocol/
    )
  })
})
