import { Module } from '@nestjs/common'

/**
 * Root NestJS module for Resources API v6.
 *
 * HTTP behavior remains registered on the compatibility Express application and
 * mounted through Nest's Express adapter. The empty module lets Nest own startup
 * and application lifecycle without changing the public API contract.
 */
@Module({})
export class AppModule {}
