const { PrismaClient } = require('@prisma/client');
const config = require('config')

const prisma = new PrismaClient({
  transactionOptions: {
    timeout: config.MEMBER_SERVICE_PRISMA_TIMEOUT,
  },
});

module.exports = prisma;

