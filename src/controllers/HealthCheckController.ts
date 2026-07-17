/**
 * Express controller for the public Resources API health endpoint.
 */

import type { Request, Response } from 'express'

const service = require('../services/HealthCheckService')

/**
 * Returns the service's lightweight health summary.
 *
 * app-routes.ts invokes this handler without authentication for
 * `GET /resources/health`.
 *
 * @param req The Express health request; no request data is consumed.
 * @param res The Express response that receives the JSON health summary.
 * @returns A promise that resolves after the response is sent.
 * @throws Propagates health-service errors to application error middleware.
 */
async function check (req: Request, res: Response): Promise<void> {
  res.json(await service.check())
}

module.exports = {
  check
}
