import connectToMongoDB from './config/mongodb.config';
import logger from './config/logger.config';
import { configureServer } from './config/server.config';

// configure our server
const app = configureServer();

// define our port
const port = Number(process.env.PORT);

// start our server
app.listen(port, async () => {
  logger.info(`[SERVER] App is running at http://localhost:${port}`);

  // connect to mongo db
  await connectToMongoDB();
});
