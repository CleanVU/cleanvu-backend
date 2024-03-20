import connectToMongoDB from './config/mongodb.config';
import logger from './config/logger.config';
import { configureServer } from './config/server.config';
import dotenv from 'dotenv';
dotenv.config();

// configure our server
const app = configureServer();

// define our port
const port = Number(process.env.PORT);

// start our server
app.listen(port, '0.0.0.0', async () => {
  logger.info(`[SERVER] App is running at http://0.0.0.0:${port}`);

  // connect to mongo db
  await connectToMongoDB();
});
