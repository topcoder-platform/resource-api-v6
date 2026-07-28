/**
 * Express controllers for resource-role endpoints.
 */

import type { Request, Response } from 'express'

const service = require('../services/ResourceRoleService')
const helper = require('../common/helper')

interface AuthenticatedRequest extends Request {
  authUser?: any
}

/**
 * Lists resource roles matching the supplied query criteria.
 *
 * @param req The public Express request containing optional role filters.
 * @param res The Express response that receives pagination headers and roles.
 * @returns A promise that resolves after the response is sent.
 * @throws Propagates query validation and database errors.
 */
async function getResourceRoles (req: Request, res: Response): Promise<void> {
  const result = await service.getResourceRoles(req.query)
  helper.setResHeaders(req, res, result)
  res.send(result.data)
}

/**
 * Creates a resource role using the authenticated caller for audit data.
 *
 * @param req The authenticated request containing the complete role body.
 * @param res The Express response that receives the created role with status 200.
 * @returns A promise that resolves after the response is sent.
 * @throws Propagates validation, duplicate, event, and database errors.
 */
async function createResourceRole (req: AuthenticatedRequest, res: Response): Promise<void> {
  const result = await service.createResourceRole(req.authUser, req.body)
  res.send(result)
}

/**
 * Fully updates an existing resource role.
 *
 * @param req The authenticated request containing role ID and complete update body.
 * @param res The Express response that receives the updated role.
 * @returns A promise that resolves after the response is sent.
 * @throws Propagates validation, not-found, duplicate, event, and database errors.
 */
async function updateResourceRole (req: AuthenticatedRequest, res: Response): Promise<void> {
  const result = await service.updateResourceRole(req.authUser, req.params.resourceRoleId, req.body)
  res.send(result)
}

module.exports = {
  getResourceRoles,
  createResourceRole,
  updateResourceRole
}
