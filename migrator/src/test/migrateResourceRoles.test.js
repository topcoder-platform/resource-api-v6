const path = require('path')
const { migrateResourceRoles } = require('../migrators/migrateResourceRole')

describe('migrateResourceRoles', () => {
  it('should migrate mock data without errors', async () => {
    const mockFile = path.join(__dirname, 'mocks', 'mock_ResourceRole.json')
    await expect(migrateResourceRoles(mockFile)).resolves.not.toThrow()
  })
})
