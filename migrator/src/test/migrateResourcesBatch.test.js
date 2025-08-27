const path = require('path')
const { migrateResource } = require('../migrators/migrateResourceBatch')

describe('migrateResource', () => {
  it('should migrate mock data without errors', async () => {
    const mockFile = path.join(__dirname, 'mocks', 'mock_Resource.json')
    await expect(migrateResource(mockFile)).resolves.not.toThrow()
  })
})
