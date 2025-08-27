const path = require('path')
const { migrateResourceRolePhaseDependencies } = require('../migrators/migrateResourceRolePhaseDependency')

describe('migrateResourceRolePhaseDependencies', () => {
  it('should migrate mock data without errors', async () => {
    const mockFile = path.join(__dirname, 'mocks', 'mock_ResourceRolePhaseDependency.json')
    await expect(migrateResourceRolePhaseDependencies(mockFile)).resolves.not.toThrow()
  })
})
