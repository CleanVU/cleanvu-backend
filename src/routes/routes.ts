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
import type { Express, Request, Response } from 'express';

const routes = (app: Express) => {
  // healthcheck
  app.get('/healthcheck', (_: Request, res: Response) => res.sendStatus(200));

  // user endpoints
  app.get('/api/user/:userId', validate(getUserSchema), getUserHandler);
  app.post('/api/user', validate(createUserSchema), createUserHandler);
  app.put('/api/user/:userId', validate(updateUserSchema), updateUserHandler);
  app.delete('/api/user/:userId', validate(deleteUserSchema), deleteUserHandler);

  // 404
  app.use((_: Request, res: Response) => {
    res.status(404).send('404: Page not found');
  });

  return app;
};

export default routes;
