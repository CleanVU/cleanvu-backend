import UserModel from '../models/user.model';
import { clerkClient } from '@clerk/clerk-sdk-node';
import dotenv from 'dotenv';
import type {
  CreateUserInput,
  DeleteUserInput,
  GetUserInput,
  UpdateUserInput,
} from '../schema/user.schema';
dotenv.config();

/**
 * Create a new user
 *
 * @param {CreateUserInput['body']} input The user input
 * @returns {Promise<UserModel>} A promise that resolves with the created user
 */
export const createUser = async (input: CreateUserInput['body']) => {
  const newUser = new UserModel(input);

  if (
    process.env.ENVIRONMENT !== 'test' &&
    process.env.ENVIRONMENT !== 'development'
  ) {
    await clerkClient.users.updateUserMetadata(input.userId, {
      publicMetadata: {
        role: input.role,
      },
    });
  }

  await newUser.save();

  return newUser;
};

/**
 * Get a user by id
 *
 * @param {GetUserInput['params']['userId']} userId The user id
 * @returns {Promise<UserModel>} A promise that resolves with the user or null if not found
 */
export const getUser = async (email: GetUserInput['query']['email']) => {
  const user = UserModel.findOne({ email: email });

  if (!user) return null;

  return user;
};

/**
 * Get all users
 *
 * @param {UpdateUserInput['body']} input The user input
 * @param {UpdateUserInput['params']['userId']} userId The user id
 * @returns {Promise<UserModel[]>} A promise that resolves with all users or null if not found
 */
export const updateUser = async (
  input: UpdateUserInput['body'],
  userId: UpdateUserInput['params']['userId']
) => {
  const updatedUser = await UserModel.findByIdAndUpdate(userId, input, {
    new: true,
  });

  if (!updatedUser) return null;

  return updatedUser;
};

/**
 * Delete a user by id
 *
 * @param {DeleteUserInput['params']['userId']} userId The user id
 * @returns {Promise<boolean>} A promise that resolves with a boolean indicating if the user was deleted
 */
export const deleteUser = async (userId: DeleteUserInput['params']['userId']) => {
  const response = await UserModel.deleteOne({ _id: userId });

  if (response.deletedCount === 0) return false;

  return true;
};
