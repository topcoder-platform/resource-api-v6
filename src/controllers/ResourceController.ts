/**
 * Express controllers for resource assignment endpoints.
 */

import type { Request, Response } from 'express'

const service = require('../services/ResourceService')
const helper = require('../common/helper')

interface AuthenticatedRequest extends Request {
  authUser?: any
}

/**
 * Lists resources matching the established query filters and caller access.
 *
 * The handler forwards known query properties individually so unknown resource
 * query parameters remain ignored, then attaches legacy pagination headers.
 *
 * @param req The optional-auth Express request containing resource filters.
 * @param res The Express response that receives pagination headers and an array.
 * @returns A promise that resolves after the response is sent.
 * @throws Propagates validation, access, lookup, and database errors.
 */
async function getResources (req: AuthenticatedRequest, res: Response): Promise<void> {
  const result = await service.getResources(req.authUser, req.query.challengeId, req.query.roleId, req.query.memberId, req.query.memberHandle, req.query.page, req.query.perPage, req.query.sortBy, req.query.sortOrder)
  helper.setResHeaders(req, res, result)
  res.send(result.data)
}

/**
 * Creates a resource assignment for a challenge.
 *
 * @param req The authenticated Express request containing the resource body.
 * @param res The Express response that receives the created resource with status 200.
 * @returns A promise that resolves after the response is sent.
 * @throws Propagates validation, authorization, downstream API, event, and database errors.
 */
async function createResource (req: AuthenticatedRequest, res: Response): Promise<void> {
  const result = await service.createResource(req.authUser, req.body)
  res.send(result)
}

/**
 * Deletes the resource assignment described by the request body.
 *
 * @param req The authenticated Express request containing the deletion body.
 * @param res The Express response that receives the deleted resource with status 200.
 * @returns A promise that resolves after the response is sent.
 * @throws Propagates validation, authorization, downstream API, event, and database errors.
 */
async function deleteResource (req: AuthenticatedRequest, res: Response): Promise<void> {
  const result = await service.deleteResource(req.authUser, req.body)
  res.send(result)
}

/**
 * Updates one resource's phase-change notification preference.
 *
 * @param req The authenticated request containing the resource ID and boolean payload.
 * @param res The Express response that receives the updated resource.
 * @returns A promise that resolves after the response is sent.
 * @throws Propagates validation, ownership, whitelist, lookup, and database errors.
 */
async function updatePhaseChangeNotifications (req: AuthenticatedRequest, res: Response): Promise<void> {
  const result = await service.updatePhaseChangeNotifications(req.authUser, req.params.resourceId, req.body)
  res.send(result)
}

/**
 * Lists sorted, unique challenge IDs assigned to the requested member.
 *
 * @param req The authenticated request containing member ID and list criteria.
 * @param res The Express response that receives pagination headers and challenge IDs.
 * @returns A promise that resolves after the response is sent.
 * @throws Propagates validation, whitelist, and database errors.
 */
async function listChallengesByMember (req: AuthenticatedRequest, res: Response): Promise<void> {
  const result = await service.listChallengesByMember(req.params.memberId, req.query, req.authUser)
  helper.setResHeaders(req, res, result)
  res.send(result.data)
}

/**
 * Returns resource counts grouped by role for one challenge.
 *
 * @param req The authenticated request containing challenge and optional role IDs.
 * @param res The Express response that receives a role-ID-to-count object.
 * @returns A promise that resolves after the response is sent.
 * @throws Propagates validation, whitelist, and database errors.
 */
async function getResourceCount (req: AuthenticatedRequest, res: Response): Promise<void> {
  const result = await service.getResourceCount(req.query.challengeId, req.query.roleId, req.authUser)
  res.send(result)
}

module.exports = {
  getResources,
  createResource,
  deleteResource,
  updatePhaseChangeNotifications,
  listChallengesByMember,
  getResourceCount
}
