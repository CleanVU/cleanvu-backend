import { createTestBuildingInput } from './building.test';
import { createTestLocationInput } from './location.test';
import { createTestUserInput } from './user.test';
import { configureServer } from '../config/server.config';
import { createBuilding } from '../service/building.service';
import { createLocation } from '../service/location.service';
import { createUser } from '../service/user.service';
import RequestModel from '../models/request.model';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';

const app = configureServer();

export const createTestRequestInput = () => ({
  description: faker.lorem.sentence(),
  status: 'pending',
});

describe('request', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('POST /api/request', () => {
    it('should create a request', async () => {
      // create building
      const building = await createBuilding(createTestBuildingInput());

      // create location
      const location = await createLocation({
        ...createTestLocationInput(),
        buildingId: building._id,
      });

      // create user
      const user = await createUser(createTestUserInput());

      const testRequestInput = createTestRequestInput();

      const response = await supertest(app)
        .post('/api/request')
        .send({
          ...testRequestInput,
          locationId: location._id,
          buildingId: building._id,
          studentId: user._id,
        })
        .expect(201);

      expect(response.body).toEqual({
        _id: expect.any(String),
        description: testRequestInput.description,
        status: testRequestInput.status,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        building: building._id.toString(),
        location: location._id.toString(),
        studentId: user._id.toString(),
        __v: expect.any(Number),
      });

      // check user object
      const userResponse = await supertest(app)
        .get(`/api/user?email=${user.email}`)
        .expect(200);

      expect(userResponse.body.requests).toEqual([response.body._id]);

      // check location object
      const locationResponse = await supertest(app)
        .get(`/api/location/${location._id}`)
        .expect(200);

      expect(locationResponse.body.requests).toEqual([response.body._id]);
    });
  });

  describe('GET /api/request/:requestId', () => {
    it('should get a request', async () => {
      // create building
      const building = await createBuilding(createTestBuildingInput());

      // create location
      const location = await createLocation({
        ...createTestLocationInput(),
        buildingId: building._id,
      });

      // create user
      const user = await createUser(createTestUserInput());

      const testRequestInput = createTestRequestInput();

      const request = await supertest(app)
        .post('/api/request')
        .send({
          ...testRequestInput,
          locationId: location._id,
          buildingId: building._id,
          studentId: user._id,
        })
        .expect(201);

      const response = await supertest(app)
        .get(`/api/request/${request.body._id}`)
        .expect(200);

      expect(response.body).toEqual({
        _id: expect.any(String),
        description: testRequestInput.description,
        status: testRequestInput.status,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        building: {
          _id: building._id.toString(),
          name: building.name,
          floors: building.floors,
          locations: [location._id.toString()],
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          __v: expect.any(Number),
        },
        location: {
          _id: location._id.toString(),
          name: location.name,
          description: location.description,
          floor: location.floor,
          lastCleaned: location.lastCleaned.toISOString(),
          requests: [request.body._id],
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          __v: expect.any(Number),
        },
        studentId: user._id.toString(),
        __v: expect.any(Number),
      });
    });
  });

  describe('GET /api/requests', () => {
    it('should get all requests', async () => {
      await RequestModel.deleteMany({});

      // create building
      const building = await createBuilding(createTestBuildingInput());

      // create location
      const location = await createLocation({
        ...createTestLocationInput(),
        buildingId: building._id,
      });

      // create user
      const user = await createUser(createTestUserInput());

      const testRequestInput = createTestRequestInput();

      await supertest(app)
        .post('/api/request')
        .send({
          ...testRequestInput,
          locationId: location._id,
          buildingId: building._id,
          studentId: user._id,
        })
        .expect(201);

      const response = await supertest(app)
        .get('/api/requests')
        .query({
          page: 1,
          count: 10,
        })
        .expect(200);

      expect(response.body).toEqual([
        {
          _id: expect.any(String),
          description: testRequestInput.description,
          status: testRequestInput.status,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          building: {
            _id: building._id.toString(),
            name: building.name,
            floors: building.floors,
            locations: [location._id.toString()],
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            __v: expect.any(Number),
          },
          location: {
            _id: location._id.toString(),
            name: location.name,
            description: location.description,
            floor: location.floor,
            lastCleaned: location.lastCleaned.toISOString(),
            requests: [expect.any(String)],
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            __v: expect.any(Number),
          },
          studentId: user._id.toString(),
          __v: expect.any(Number),
        },
      ]);
    });
  });

  describe('PUT /api/request/:requestId', () => {
    it('should update a request', async () => {
      // create building
      const building = await createBuilding(createTestBuildingInput());

      // create location
      const location = await createLocation({
        ...createTestLocationInput(),
        buildingId: building._id,
      });

      // create user
      const user = await createUser(createTestUserInput());

      const testRequestInput = createTestRequestInput();

      const request = await supertest(app)
        .post('/api/request')
        .send({
          ...testRequestInput,
          locationId: location._id,
          buildingId: building._id,
          studentId: user._id,
        })
        .expect(201);

      const response = await supertest(app)
        .put(`/api/request/${request.body._id}`)
        .send({
          ...testRequestInput,
          status: 'completed',
          locationId: location._id,
          buildingId: building._id,
          studentId: user._id,
        })
        .expect(200);

      expect(response.body).toEqual({
        _id: expect.any(String),
        description: testRequestInput.description,
        status: 'completed',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        building: {
          _id: building._id.toString(),
          name: building.name,
          floors: building.floors,
          locations: [location._id.toString()],
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          __v: expect.any(Number),
        },
        location: {
          _id: location._id.toString(),
          name: location.name,
          description: location.description,
          floor: location.floor,
          lastCleaned: location.lastCleaned.toISOString(),
          requests: [request.body._id],
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          __v: expect.any(Number),
        },
        studentId: user._id.toString(),
        __v: expect.any(Number),
      });
    });
  });

  describe('DELETE /api/request/:requestId', () => {
    it('should delete a request', async () => {
      // create building
      const building = await createBuilding(createTestBuildingInput());

      // create location
      const location = await createLocation({
        ...createTestLocationInput(),
        buildingId: building._id,
      });

      // create user
      const user = await createUser(createTestUserInput());

      const testRequestInput = createTestRequestInput();

      const request = await supertest(app)
        .post('/api/request')
        .send({
          ...testRequestInput,
          locationId: location._id,
          buildingId: building._id,
          studentId: user._id,
        })
        .expect(201);

      await supertest(app).delete(`/api/request/${request.body._id}`).expect(204);
    });
  });
});
