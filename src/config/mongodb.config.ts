import logger from './logger.config';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectToMongoDB = async () => {
  try {
    // connect to mongo db
    await mongoose.connect(process.env.MONGODB_URI || '');
    // log success
    logger.info('[MONGODB] Connected to MongoDB');

    return;
  } catch (error) {
    // log error and exit process
    logger.error('[MONGODB] ' + error);
    process.exit(1);
  }
};

export default connectToMongoDB;
