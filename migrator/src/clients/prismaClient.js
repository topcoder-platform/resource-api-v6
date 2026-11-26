const { createPostgresAdapter } = require('../postgres-adapter');
const { PrismaClient } = require('@prisma/client');
const config = require('config')

const prisma = new PrismaClient({
  adapter: createPostgresAdapter(process.env.DATABASE_URL),
  transactionOptions: {
    timeout: config.MEMBER_SERVICE_PRISMA_TIMEOUT,
  },
});

module.exports = prisma;

