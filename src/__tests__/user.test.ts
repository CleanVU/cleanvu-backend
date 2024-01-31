import { configureServer } from '../config/server.config';
import { createUser, getUser } from '../service/user.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';

const app = configureServer();

export const createTestUserInput = () => ({
  email: faker.internet.email(),
  role: 'custodian',
  building: new mongoose.Types.ObjectId().toString(),
  floor: '1',
});

describe('user', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('POST /api/user', () => {
    it('should create a user', async () => {
      const testUserInput = createTestUserInput();

      const response = await supertest(app)
        .post('/api/user')
        .send(testUserInput)
        .expect(201);

      expect(response.body).toEqual({
        _id: expect.any(String),
        email: testUserInput.email,
        role: testUserInput.role,
        building: testUserInput.building,
        floor: testUserInput.floor,
        requests: [],
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        __v: expect.any(Number),
      });
    });
  });

  describe('GET /api/user/:userId', () => {
    it('should get a user', async () => {
      const testUserInput = createTestUserInput();

      const user = await createUser(testUserInput);

      const response = await supertest(app)
        .get(`/api/user/${user._id}`)
        .expect(200);

      expect(response.body).toEqual({
        _id: expect.any(String),
        email: testUserInput.email,
        role: testUserInput.role,
        building: testUserInput.building,
        floor: testUserInput.floor,
        requests: [],
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        __v: expect.any(Number),
      });
    });
  });

  describe('PUT /api/user/:userId', () => {
    it('should update a user', async () => {
      const testUserInput = createTestUserInput();

      const user = await createUser(testUserInput);

      const response = await supertest(app)
        .put(`/api/user/${user._id}`)
        .send({
          ...testUserInput,
          role: 'student',
        })
        .expect(200);

      expect(response.body).toEqual({
        _id: expect.any(String),
        email: testUserInput.email,
        role: 'student',
        requests: [],
        building: testUserInput.building,
        floor: testUserInput.floor,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        __v: expect.any(Number),
      });
    });
  });

  describe('DELETE /api/user/:userId', () => {
    it('should delete a user', async () => {
      const testUserInput = createTestUserInput();

      const user = await createUser(testUserInput);

      await supertest(app).delete(`/api/user/${user._id}`).expect(204);

      // check if user was deleted
      const deletedUser = await getUser(user._id);

      expect(deletedUser).toBeNull();
    });
  });
});
