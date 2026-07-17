/**
 * Role names recognized by route authorization and resource access checks.
 */
const UserRoles = {
  Admin: 'administrator',
  Copilot: 'copilot',
  Manager: 'Connect Manager',
  User: 'Topcoder User'
}

/**
 * Challenge statuses that alter resource creation and deletion behavior.
 */
const ChallengeStatuses = {
  Completed: 'COMPLETED',
  Active: 'ACTIVE'
}

module.exports = {
  UserRoles,
  ChallengeStatuses
}
