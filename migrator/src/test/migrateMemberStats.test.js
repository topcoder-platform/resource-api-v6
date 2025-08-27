const path = require('path');
const { migrateMemberStats } = require('../migrators/migrateMemberStats');

describe('migrateMemberStats', () => {
  it('should migrate mock data without errors', async () => {
    const mockFile = path.join(__dirname, 'mocks', 'mock_MemberStats.json');
    await expect(migrateMemberStats(mockFile)).resolves.not.toThrow();
  });
});
