/**
 * Singleton Prisma 7 clients for the resources, members, and challenges
 * PostgreSQL databases.
 *
 * Each singleton is exposed through a lazy proxy so missing or malformed URLs
 * fail only when the corresponding database is first used, as they did with
 * the generated Prisma 6 clients. Each initialized client receives its own
 * adapter and connection pool.
 */

import { PrismaClient as ResourcesPrismaClient } from '../generated/resources/client'
import { PrismaClient as MemberPrismaClient } from '../generated/member/client'
import { PrismaClient as ChallengePrismaClient } from '../generated/challenge/client'
import { createPostgresAdapter } from './prisma-adapter'

let resourcesClient: ResourcesPrismaClient | undefined
let memberClient: MemberPrismaClient | undefined
let challengeClient: ChallengePrismaClient | undefined

/**
 * Expose a singleton client whose factory runs on its first property access.
 * Service modules keep stable client references while adapter validation and
 * pool allocation remain deferred until that database is actually used.
 *
 * @param factory Creates or returns the database-specific singleton client.
 * @returns A proxy forwarding properties and bound methods to that client.
 * @throws Errors raised by the factory, including invalid database URLs, on
 * the first operation against the proxied client.
 */
function createLazyClient<T extends object> (factory: () => T): T {
  return new Proxy({} as T, {
    get (_target, property) {
      const client = factory()
      const value = Reflect.get(client, property, client)
      return typeof value === 'function' ? value.bind(client) : value
    }
  })
}

/**
 * Create or return the resources database singleton.
 *
 * @returns The initialized resources Prisma client.
 * @throws {Error} When `DATABASE_URL` is missing or invalid.
 */
function resolveResourcesClient (): ResourcesPrismaClient {
  resourcesClient ??= new ResourcesPrismaClient({
    adapter: createPostgresAdapter(process.env.DATABASE_URL, 'DATABASE_URL'),
    log: [
      { level: 'query', emit: 'event' },
      { level: 'info', emit: 'event' },
      { level: 'warn', emit: 'event' },
      { level: 'error', emit: 'event' }
    ]
  })
  return resourcesClient
}

/**
 * Create or return the members database singleton.
 *
 * @returns The initialized members Prisma client.
 * @throws {Error} When `MEMBER_DB_URL` is missing or invalid.
 */
function resolveMemberClient (): MemberPrismaClient {
  memberClient ??= new MemberPrismaClient({
    adapter: createPostgresAdapter(process.env.MEMBER_DB_URL, 'MEMBER_DB_URL')
  })
  return memberClient
}

/**
 * Create or return the challenges database singleton.
 *
 * @returns The initialized challenges Prisma client.
 * @throws {Error} When `CHALLENGE_DB_URL` is missing or invalid.
 */
function resolveChallengeClient (): ChallengePrismaClient {
  challengeClient ??= new ChallengePrismaClient({
    adapter: createPostgresAdapter(process.env.CHALLENGE_DB_URL, 'CHALLENGE_DB_URL')
  })
  return challengeClient
}

const prisma = createLazyClient(resolveResourcesClient)
const prismaMember = createLazyClient(resolveMemberClient)
const prismaChallenge = createLazyClient(resolveChallengeClient)

/**
 * Return the singleton resources database client.
 *
 * The first query made through this client opens its PostgreSQL connection
 * pool; calling this accessor alone performs no network I/O.
 *
 * @returns The generated resources Prisma client.
 * @throws Does not throw; URL validation remains deferred until first use.
 */
function getClient (): ResourcesPrismaClient {
  return prisma
}

/**
 * Return the singleton members database client.
 *
 * The first query made through this client opens its PostgreSQL connection
 * pool; calling this accessor alone performs no network I/O.
 *
 * @returns The generated members Prisma client.
 * @throws Does not throw; URL validation remains deferred until first use.
 */
function getMemberClient (): MemberPrismaClient {
  return prismaMember
}

/**
 * Return the singleton challenges database client.
 *
 * The first query made through this client opens its PostgreSQL connection
 * pool; calling this accessor alone performs no network I/O.
 *
 * @returns The generated challenges Prisma client.
 * @throws Does not throw; URL validation remains deferred until first use.
 */
function getChallengeClient (): ChallengePrismaClient {
  return prismaChallenge
}

/**
 * Disconnect all Prisma clients during application shutdown.
 *
 * Every initialized client's disconnect operation is started together. Lazy
 * clients that were never used are skipped so shutdown does not require their
 * database URLs. The returned promise rejects if a disconnect operation fails.
 *
 * @returns A promise that resolves after every Prisma client disconnects.
 * @throws A Prisma or driver error when a client cannot disconnect cleanly.
 */
async function disconnectClients (): Promise<void> {
  await Promise.all([
    resourcesClient,
    memberClient,
    challengeClient
  ].filter((client): client is ResourcesPrismaClient | MemberPrismaClient | ChallengePrismaClient => Boolean(client))
    .map(client => client.$disconnect()))
}

module.exports = {
  getClient,
  getMemberClient,
  getChallengeClient,
  disconnectClients,
  // Descriptive alias retained for direct callers of the common layer.
  disconnectAllClients: disconnectClients
}
