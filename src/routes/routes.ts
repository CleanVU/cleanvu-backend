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
import type { Express, Request, Response } from 'express';

const routes = (app: Express) => {
  // healthcheck
  app.get('/healthcheck', (_: Request, res: Response) => res.sendStatus(200));

  // user endpoints
  app.get('/api/user/:userId', validate(getUserSchema), getUserHandler);
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

  // 404
  app.use((_: Request, res: Response) => {
    res.status(404).send('404: Page not found');
  });

  return app;
};

export default routes;
