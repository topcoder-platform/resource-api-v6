import 'dotenv/config'
import { defineConfig } from 'prisma/config'

/**
 * Configures Prisma CLI commands for the existing resources database.
 *
 * Client generation does not require a live database. Migration deployment
 * continues to read the existing DATABASE_URL variable and the unchanged
 * migration history under prisma/migrations.
 */
export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations'
  },
  datasource: {
    url: process.env.DATABASE_URL ?? ''
  }
})
