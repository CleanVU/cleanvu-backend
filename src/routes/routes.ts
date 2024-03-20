import validate from '../middleware/validateResource';
import {
  createUserSchema,
  deleteUserSchema,
  getUserSchema,
  updateUserSchema,
} from '../schema/user.schema';
import {
  createUserHandler,
  deleteUserHandler,
  getUserHandler,
  updateUserHandler,
} from '../controllers/user.controller';
import {
  getBuildingSchema,
  createBuildingSchema,
  updateBuildingSchema,
  deleteBuildingSchema,
  getBuildingsSchema,
} from '../schema/building.schema';
import {
  createBuildingHandler,
  deleteBuildingHandler,
  getBuildingHandler,
  getBuildingsHandler,
  updateBuildingHandler,
} from '../controllers/building.controller';
import {
  getLocationHandler,
  createLocationHandler,
  getLocationsHandler,
  updateLocationHandler,
  deleteLocationHandler,
} from '../controllers/location.controller';
import {
  createLocationSchema,
  deleteLocationSchema,
  getLocationSchema,
  getLocationsSchema,
  updateLocationSchema,
} from '../schema/location.schema';
import {
  getRequestHandler,
  createRequestHandler,
  getRequestsHandler,
  updateRequestHandler,
  deleteRequestHandler,
  getRequestByUserIdHandler,
} from '../controllers/request.controller';
import {
  getRequestSchema,
  createRequestSchema,
  getRequestsSchema,
  updateRequestSchema,
  deleteRequestSchema,
  getRequestByUserIdSchema,
} from '../schema/request.schema';
import validateAuth from '../middleware/validateAuth';
import type { LooseAuthProp } from '@clerk/clerk-sdk-node';
import type { Express, Request, Response } from 'express';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request extends LooseAuthProp {}
  }
}

const routes = (app: Express) => {
  // healthcheck
  app.get('/healthcheck', (_: Request, res: Response) => res.sendStatus(200));
  app.get('/auth-healthcheck', validateAuth, (_: Request, res: Response) =>
    res.sendStatus(200)
  );

  // user endpoints
  app.get('/api/user', validateAuth, validate(getUserSchema), getUserHandler);
  app.post(
    '/api/user',
    validateAuth,
    validate(createUserSchema),
    createUserHandler
  );
  app.put(
    '/api/user/:userId',
    validateAuth,
    validate(updateUserSchema),
    updateUserHandler
  );
  app.delete(
    '/api/user/:userId',
    validateAuth,
    validate(deleteUserSchema),
    deleteUserHandler
  );

  // building endpoints
  app.get(
    '/api/building/:buildingId',
    validateAuth,
    validate(getBuildingSchema),
    getBuildingHandler
  );
  app.post(
    '/api/building',
    validateAuth,
    validate(createBuildingSchema),
    createBuildingHandler
  );
  app.put(
    '/api/building/:buildingId',
    validateAuth,
    validate(updateBuildingSchema),
    updateBuildingHandler
  );
  app.delete(
    '/api/building/:buildingId',
    validateAuth,
    validate(deleteBuildingSchema),
    deleteBuildingHandler
  );
  app.get(
    '/api/buildings',
    validateAuth,
    validate(getBuildingsSchema),
    getBuildingsHandler
  );

  // location endpoints
  app.get(
    '/api/location/:locationId',
    validateAuth,
    validate(getLocationSchema),
    getLocationHandler
  );
  app.post(
    '/api/location',
    validateAuth,
    validate(createLocationSchema),
    createLocationHandler
  );
  app.get(
    '/api/locations',
    validateAuth,
    validate(getLocationsSchema),
    getLocationsHandler
  );
  app.put(
    '/api/location/:locationId',
    validateAuth,
    validate(updateLocationSchema),
    updateLocationHandler
  );
  app.delete(
    '/api/location/:locationId',
    validateAuth,
    validate(deleteLocationSchema),
    deleteLocationHandler
  );

  // request routes
  app.get(
    '/api/request/:requestId',
    validateAuth,
    validate(getRequestSchema),
    getRequestHandler
  );
  app.post(
    '/api/request',
    validateAuth,
    validate(createRequestSchema),
    createRequestHandler
  );
  app.get(
    '/api/requests',
    validateAuth,
    validate(getRequestsSchema),
    getRequestsHandler
  );
  app.put(
    '/api/request/:requestId',
    validateAuth,
    validate(updateRequestSchema),
    updateRequestHandler
  );
  app.delete(
    '/api/request/:requestId',
    validateAuth,
    validate(deleteRequestSchema),
    deleteRequestHandler
  );
  app.get(
    '/api/requests/:userId',
    validateAuth,
    validate(getRequestByUserIdSchema),
    getRequestByUserIdHandler
  );

  // 404
  app.use((_: Request, res: Response) => {
    res.status(404).send('404: Page not found');
  });

  return app;
};

export default routes;
