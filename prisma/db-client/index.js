const { PrismaClient } = require('../generated/client')

let prisma

function getResourcesDbClient () {
  if (!prisma) {
    prisma = new PrismaClient({
      log: ['error', 'warn']
    })

    // enforce read-only by convention
    prisma.$use(async (params, next) => {
      if (['create', 'update', 'delete', 'upsert'].includes(params.action)) {
        throw new Error('Write operations are not allowed from members-api')
      }
      return next(params)
    })
  }
  return prisma
}

module.exports = { getResourcesDbClient }
