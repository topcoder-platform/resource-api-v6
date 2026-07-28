import 'reflect-metadata'

import type { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ExpressAdapter } from '@nestjs/platform-express'
import { AppModule } from './src/app.module'

const config = require('config')
const expressApplication = require('./app')
const logger = require('./src/common/logger')
const { disconnectClients } = require('./src/common/prisma')

let shutdownStarted = false

/**
 * Gracefully closes the Nest-owned HTTP listener and all shared Prisma clients.
 *
 * Signal handlers invoke this once. A ten-second fallback prevents shutdown from
 * hanging indefinitely if an HTTP connection or database disconnect stalls.
 *
 * @param app The initialized Nest application that owns the HTTP listener.
 * @param signal The operating-system signal that initiated shutdown.
 * @returns A promise that resolves after the process has been terminated.
 * @throws Does not propagate shutdown errors; they are logged before exiting.
 */
async function gracefulShutdown (app: INestApplication, signal: NodeJS.Signals): Promise<void> {
  if (shutdownStarted) {
    return
  }
  shutdownStarted = true

  logger.info(`[${signal}] Received. Starting graceful shutdown...`)
  const timeout = setTimeout(() => {
    logger.error('Forced shutdown due to timeout.')
    process.exit(1)
  }, 10_000)
  timeout.unref()

  try {
    await app.close()
    await disconnectClients()
    clearTimeout(timeout)
    logger.info('HTTP server and Prisma clients closed.')
    process.exit(0)
  } catch (error) {
    clearTimeout(timeout)
    logger.error('Error during graceful shutdown:', error)
    process.exit(1)
  }
}

/**
 * Registers one-shot operating-system signal handlers for the Nest application.
 *
 * @param app The initialized Nest application to close on SIGTERM or SIGINT.
 * @returns Nothing.
 * @throws Propagates errors raised while registering process listeners.
 */
function installShutdownHandlers (app: INestApplication): void {
  process.once('SIGTERM', () => void gracefulShutdown(app, 'SIGTERM'))
  process.once('SIGINT', () => void gracefulShutdown(app, 'SIGINT'))
}

/**
 * Starts Resources API v6 through NestJS using the compatibility Express app.
 *
 * Nest body parsing is disabled because the Express application already installs
 * JSON and URL-encoded parsers in the established order. Nest logging is disabled
 * so the existing Winston logger and log configuration remain authoritative.
 *
 * @returns The initialized, listening Nest application. Tests may close the
 * returned application without terminating their process.
 * @throws Propagates Nest application creation or listener startup failures.
 */
export async function bootstrap (): Promise<INestApplication> {
  const adapter = new ExpressAdapter(expressApplication)
  const app = await NestFactory.create(AppModule, adapter, {
    bodyParser: false,
    logger: false
  })

  await app.listen(Number(config.PORT))
  logger.info(`NestJS server listening on port ${config.PORT}`)
  installShutdownHandlers(app)
  return app
}

if (require.main === module) {
  void bootstrap()
}
