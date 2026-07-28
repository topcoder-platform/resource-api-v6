/**
 * Express controllers for resource-role phase-dependency endpoints.
 */

import type { Request, Response } from 'express'

const service = require('../services/ResourceRolePhaseDependencyService')
const helper = require('../common/helper')

interface AuthenticatedRequest extends Request {
  authUser?: any
}

/**
 * Lists phase dependencies matching the supplied query criteria.
 *
 * @param req The authenticated request containing optional dependency filters.
 * @param res The Express response that receives headers and dependency records.
 * @returns A promise that resolves after the response is sent.
 * @throws Propagates query validation and database errors.
 */
async function getDependencies (req: Request, res: Response): Promise<void> {
  const result = await service.getDependencies(req.query)
  helper.setResHeaders(req, res, result)
  res.send(result.data)
}

/**
 * Creates a phase dependency for a resource role.
 *
 * @param req The authenticated request containing the dependency body.
 * @param res The Express response that receives the created dependency with status 200.
 * @returns A promise that resolves after the response is sent.
 * @throws Propagates validation, phase/role lookup, conflict, and database errors.
 */
async function createDependency (req: AuthenticatedRequest, res: Response): Promise<void> {
  const result = await service.createDependency(req.authUser, req.body)
  res.send(result)
}

/**
 * Fully updates an existing phase dependency.
 *
 * @param req The authenticated request containing dependency ID and update body.
 * @param res The Express response that receives the updated dependency.
 * @returns A promise that resolves after the response is sent.
 * @throws Propagates validation, not-found, conflict, and database errors.
 */
async function updateDependency (req: AuthenticatedRequest, res: Response): Promise<void> {
  const result = await service.updateDependency(req.authUser, req.params.id, req.body)
  res.send(result)
}

/**
 * Deletes and returns one phase dependency.
 *
 * @param req The authenticated request containing the dependency ID.
 * @param res The Express response that receives the deleted dependency.
 * @returns A promise that resolves after the response is sent.
 * @throws Propagates identifier validation, not-found, and database errors.
 */
async function deleteDependency (req: Request, res: Response): Promise<void> {
  const result = await service.deleteDependency(req.params.id)
  res.send(result)
}

module.exports = {
  getDependencies,
  createDependency,
  updateDependency,
  deleteDependency
}
