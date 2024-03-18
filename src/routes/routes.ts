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
import type { Express, Request, Response } from 'express';

const routes = (app: Express) => {
  // healthcheck
  app.get('/healthcheck', (_: Request, res: Response) => res.sendStatus(200));

  // user endpoints
  app.get('/api/user', validate(getUserSchema), getUserHandler);
  app.post('/api/user', validate(createUserSchema), createUserHandler);
  app.put('/api/user/:userId', validate(updateUserSchema), updateUserHandler);
  app.delete('/api/user/:userId', validate(deleteUserSchema), deleteUserHandler);

  // building endpoints
  app.get(
    '/api/building/:buildingId',
    validate(getBuildingSchema),
    getBuildingHandler
  );
  app.post(
    '/api/building',
    validate(createBuildingSchema),
    createBuildingHandler
  );
  app.put(
    '/api/building/:buildingId',
    validate(updateBuildingSchema),
    updateBuildingHandler
  );
  app.delete(
    '/api/building/:buildingId',
    validate(deleteBuildingSchema),
    deleteBuildingHandler
  );
  app.get('/api/buildings', validate(getBuildingsSchema), getBuildingsHandler);

  // location endpoints
  app.get(
    '/api/location/:locationId',
    validate(getLocationSchema),
    getLocationHandler
  );
  app.post(
    '/api/location',
    validate(createLocationSchema),
    createLocationHandler
  );
  app.get('/api/locations', validate(getLocationsSchema), getLocationsHandler);
  app.put(
    '/api/location/:locationId',
    validate(updateLocationSchema),
    updateLocationHandler
  );
  app.delete(
    '/api/location/:locationId',
    validate(deleteLocationSchema),
    deleteLocationHandler
  );

  // request routes
  app.get(
    '/api/request/:requestId',
    validate(getRequestSchema),
    getRequestHandler
  );
  app.post('/api/request', validate(createRequestSchema), createRequestHandler);
  app.get('/api/requests', validate(getRequestsSchema), getRequestsHandler);
  app.put(
    '/api/request/:requestId',
    validate(updateRequestSchema),
    updateRequestHandler
  );
  app.delete(
    '/api/request/:requestId',
    validate(deleteRequestSchema),
    deleteRequestHandler
  );
  app.get(
    '/api/requests/:userId',
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
