/**
 * Express controller for the internal automated-test cleanup endpoint.
 */

import type { Request, Response } from 'express'

const service = require('../services/CleanUpService')

/**
 * Removes resource data created by the Postman automation suite.
 *
 * The route registry invokes this handler for the protected internal cleanup
 * endpoint. It intentionally returns Express's text `OK` response with status
 * 200 after the service completes.
 *
 * @param req The authenticated Express request; its body is not used.
 * @param res The Express response used to send status 200.
 * @returns A promise that resolves after the cleanup response is sent.
 * @throws Propagates database errors to the application error middleware.
 */
async function cleanUpTestData (req: Request, res: Response): Promise<void> {
  await service.cleanUpTestData()
  res.sendStatus(200)
}

module.exports = {
  cleanUpTestData
}
