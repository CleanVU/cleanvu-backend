import routes from '../routes/routes';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Configure Server
 *
 * This function is used to configure the server.
 *
 * @returns The configured server.
 */
export const configureServer = () => {
  const app = express();

  // Middleware
  app.use(express.json()); // Parse JSON bodies
  app.use(cors()); // Enable CORS

  // Security
  app.use(helmet());
  app.disable('x-powered-by');

  // Logging
  if (
    process.env.ENVIRONMENT === 'development' ||
    process.env.ENVIRONMENT === 'seed' ||
    process.env.ENVIRONMENT === 'test'
  ) {
    app.use(morgan('dev'));
  }

  // Routes
  routes(app);

  // Create the server
  return app;
};
