import BuildingModel from '../models/building.model';
import LocationModel from '../models/location.model';
import RequestModel from '../models/request.model';
import UserModel from '../models/user.model';
import logger from '../config/logger.config';
import connectToMongoDB from '../config/mongodb.config';

const seed = async () => {
  await connectToMongoDB();

  logger.info('🍃 Seeding database...');
  await UserModel.deleteMany({});
  await LocationModel.deleteMany({});
  await BuildingModel.deleteMany({});
  await RequestModel.deleteMany({});
};

seed()
  .then(() => {
    logger.info('✅ Database seeded successfully!');
    process.exit(0);
  })
  .catch(error => {
    logger.error(error);
    process.exit(1);
  });
