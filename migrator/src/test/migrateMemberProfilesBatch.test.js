const path = require('path')
const { migrateMemberProfiles } = require('../migrators/migrateMemberProfileBatch')

describe('migrateMemberProfiles', () => {
  it('should migrate mock data without errors', async () => {
    const mockFile = path.join(__dirname, 'mocks', 'mock_MemberProfile.json')
    await expect(migrateMemberProfiles(mockFile)).resolves.not.toThrow()
  })
})
