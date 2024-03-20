import BuildingModel from '../models/building.model';
import LocationModel from '../models/location.model';
import RequestModel from '../models/request.model';
import UserModel from '../models/user.model';
import logger from '../config/logger.config';
import connectToMongoDB from '../config/mongodb.config';
import { createBuilding } from '../service/building.service';
import { createLocation } from '../service/location.service';

const seed = async () => {
  await connectToMongoDB();

  logger.info('🍃 Seeding database...');
  await UserModel.deleteMany({});
  await LocationModel.deleteMany({});
  await BuildingModel.deleteMany({});
  await RequestModel.deleteMany({});

  const building1 = await createBuilding({
    name: 'Rothschild College',
    floors: ['1', '2', '3', '4', '5'],
  });

  await createBuilding({
    name: 'Zeppos College',
    floors: ['1', '2', '3', '4', '5'],
  });

  await createBuilding({
    name: 'E Bronson Ingram College',
    floors: ['1', '2', '3', '4', '5'],
  });

  await createBuilding({
    name: 'Warren College',
    floors: ['1', '2', '3', '4', '5'],
  });

  await createBuilding({
    name: 'Moore College',
    floors: ['1', '2', '3', '4', '5'],
  });

  const test = await createLocation({
    floor: '1',
    name: 'Room 101',
    buildingId: building1._id.toString(),
    description: 'Dorm room',
  });

  console.log(test);

  await createLocation({
    floor: '1',
    name: 'Room 102',
    buildingId: building1._id.toString(),
    description: 'Dorm room',
  });

  await createLocation({
    floor: '1',
    name: 'Room 103',
    buildingId: building1._id.toString(),
    description: 'Dorm room',
  });

  await createLocation({
    floor: '1',
    name: 'Room 104',
    buildingId: building1._id.toString(),
    description: 'Dorm room',
  });

  await createLocation({
    floor: '1',
    name: 'Room 105',
    buildingId: building1._id.toString(),
    description: 'Dorm room',
  });
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
