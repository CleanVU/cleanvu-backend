import { configureServer } from '../config/server.config';
import { createBuilding, getBuilding } from '../service/building.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import type { BuildingDocument } from '../interfaces/building.interface';

const app = configureServer();

export const createTestBuildingInput = () => ({
  name: faker.company.name(),
  // random array of strings from 1 to 5 elements
  floors: Array.from(
    { length: faker.number.int({ min: 1, max: 5 }) },
    (_: any, index: number) =>
      // convert the number to a string
      String(index + 1)
  ),
});

describe('building', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('POST /api/building', () => {
    it('should create a building', async () => {
      const testBuildingInput = createTestBuildingInput();

      const response = await supertest(app)
        .post('/api/building')
        .send(testBuildingInput)
        .expect(201);

      expect(response.body).toEqual({
        _id: expect.any(String),
        name: testBuildingInput.name,
        floors: testBuildingInput.floors,
        locations: [],
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        __v: expect.any(Number),
      });
    });
  });

  describe('GET /api/building/:buildingId', () => {
    it('should get a building', async () => {
      const building: BuildingDocument = await createBuilding(
        createTestBuildingInput()
      );

      const response = await supertest(app)
        .get(`/api/building/${building._id}`)
        .expect(200);

      expect(response.body).toEqual({
        _id: building._id.toString(),
        name: building.name,
        floors: building.floors,
        locations: [],
        createdAt: building.createdAt.toISOString(),
        updatedAt: building.updatedAt.toISOString(),
        __v: building.__v,
      });
    });
  });

  describe('GET /api/buildings/', () => {
    it('should get all buildings', async () => {
      const building1: BuildingDocument = await createBuilding(
        createTestBuildingInput()
      );
      const building2: BuildingDocument = await createBuilding(
        createTestBuildingInput()
      );

      const response = await supertest(app)
        .get(`/api/buildings`)
        .query({
          page: 1,
          count: 10,
        })
        .expect(200);

      expect(response.body).toEqual([
        {
          _id: building1._id.toString(),
          name: building1.name,
          floors: building1.floors,
          locations: [],
          createdAt: building1.createdAt.toISOString(),
          updatedAt: building1.updatedAt.toISOString(),
          __v: building1.__v,
        },
        {
          _id: building2._id.toString(),
          name: building2.name,
          floors: building2.floors,
          locations: [],
          createdAt: building2.createdAt.toISOString(),
          updatedAt: building2.updatedAt.toISOString(),
          __v: building2.__v,
        },
      ]);
    });
  });

  describe('PUT /api/building/:buildingId', () => {
    it('should update a building', async () => {
      const testInput = createTestBuildingInput();

      const building: BuildingDocument = await createBuilding(testInput);

      const response = await supertest(app)
        .put(`/api/building/${building._id}`)
        .send({
          ...testInput,
          name: 'new name',
        })
        .expect(200);

      expect(response.body).toEqual({
        _id: building._id.toString(),
        name: 'new name',
        floors: building.floors,
        locations: [],
        createdAt: building.createdAt.toISOString(),
        updatedAt: expect.any(String),
        __v: building.__v,
      });
    });
  });

  describe('DELETE /api/building/:buildingId', () => {
    it('should delete a building', async () => {
      const building: BuildingDocument = await createBuilding(
        createTestBuildingInput()
      );

      const response = await supertest(app)
        .delete(`/api/building/${building._id}`)
        .expect(200);

      expect(response.body).toEqual({
        _id: building._id.toString(),
        name: building.name,
        floors: building.floors,
        locations: [],
        createdAt: building.createdAt.toISOString(),
        updatedAt: building.updatedAt.toISOString(),
        __v: building.__v,
      });

      const deletedBuilding = await getBuilding(building._id);

      expect(deletedBuilding).toBeNull();
    });
  });
});
