import { createTestBuildingInput } from './building.test';
import { configureServer } from '../config/server.config';
import { createLocation } from '../service/location.service';
import { createBuilding, getBuilding } from '../service/building.service';
import LocationModel from '../models/location.model';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';

const app = configureServer();

export const createTestLocationInput = () => ({
  name: faker.location.street(),
  description: faker.lorem.sentence(),
  floor: faker.number.int({ min: 1, max: 10 }).toString(),
});

describe('location', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('POST /api/location', () => {
    it('should create a location', async () => {
      const testLocationInput = createTestLocationInput();

      const building = await createBuilding(createTestBuildingInput());

      const response = await supertest(app)
        .post('/api/location')
        .send({
          ...testLocationInput,
          buildingId: building._id,
        })
        .expect(201);

      expect(response.body).toEqual({
        _id: expect.any(String),
        name: testLocationInput.name,
        description: testLocationInput.description,
        floor: testLocationInput.floor,
        lastCleaned: expect.any(String),
        requests: [],
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        __v: expect.any(Number),
      });

      // check that the id is in the building
      const newBuilding = await getBuilding(building._id);

      // array should have id
      expect(
        newBuilding?.locations.map(location => location.toString())
      ).toContain(response.body._id);
    });
  });

  describe('GET /api/location/:locationId', () => {
    it('should get a location', async () => {
      const building = await createBuilding(createTestBuildingInput());

      const location = await createLocation({
        ...createTestLocationInput(),
        buildingId: building._id,
      });

      const response = await supertest(app)
        .get(`/api/location/${location._id}`)
        .expect(200);

      expect(response.body).toEqual({
        _id: location._id.toString(),
        name: location.name,
        description: location.description,
        floor: location.floor,
        lastCleaned: location.lastCleaned.toISOString(),
        requests: [],
        createdAt: location.createdAt.toISOString(),
        updatedAt: location.updatedAt.toISOString(),
        __v: location.__v,
      });
    });
  });

  describe('GET /api/locations/', () => {
    it('should get all locations', async () => {
      const building = await createBuilding(createTestBuildingInput());

      await LocationModel.deleteMany({});

      const location1 = await createLocation({
        ...createTestLocationInput(),
        buildingId: building._id,
      });
      const location2 = await createLocation({
        ...createTestLocationInput(),
        buildingId: building._id,
      });

      const response = await supertest(app)
        .get('/api/locations')
        .query({
          page: 1,
          count: 10,
        })
        .expect(200);

      expect(response.body).toEqual([
        {
          _id: location1._id.toString(),
          name: location1.name,
          description: location1.description,
          floor: location1.floor,
          lastCleaned: location1.lastCleaned.toISOString(),
          requests: [],
          createdAt: location1.createdAt.toISOString(),
          updatedAt: location1.updatedAt.toISOString(),
          __v: location1.__v,
        },
        {
          _id: location2._id.toString(),
          name: location2.name,
          description: location2.description,
          floor: location2.floor,
          lastCleaned: location2.lastCleaned.toISOString(),
          requests: [],
          createdAt: location2.createdAt.toISOString(),
          updatedAt: location2.updatedAt.toISOString(),
          __v: location2.__v,
        },
      ]);
    });
  });

  describe('PATCH /api/location/:locationId', () => {
    it('should update a location', async () => {
      const building = await createBuilding(createTestBuildingInput());

      const location = await createLocation({
        ...createTestLocationInput(),
        buildingId: building._id,
      });

      const response = await supertest(app)
        .put(`/api/location/${location._id}`)
        .send({
          name: 'new name',
          description: 'new description',
          floor: 'new floor',
          buildingId: building._id,
        })
        .expect(200);

      expect(response.body).toEqual({
        _id: location._id.toString(),
        name: 'new name',
        description: 'new description',
        floor: 'new floor',
        lastCleaned: location.lastCleaned.toISOString(),
        requests: [],
        createdAt: location.createdAt.toISOString(),
        updatedAt: expect.any(String),
        __v: expect.any(Number),
      });
    });
  });

  describe('DELETE /api/location/:locationId', () => {
    it('should delete a location', async () => {
      const building = await createBuilding(createTestBuildingInput());

      const location = await createLocation({
        ...createTestLocationInput(),
        buildingId: building._id,
      });

      await supertest(app).delete(`/api/location/${location._id}`).expect(204);
    });
  });
});
