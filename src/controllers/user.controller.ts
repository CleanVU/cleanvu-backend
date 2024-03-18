import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from '../service/user.service';
import type {
  CreateUserInput,
  DeleteUserInput,
  GetUserInput,
  UpdateUserInput,
} from '../schema/user.schema';
import type { Request, Response } from 'express';

/**
 * Get User Handler
 *
 * @description Gets a user by id
 *
 * @param req Request
 * @param res Response
 * @returns 200 - user object
 * @returns 400 - invalid user id
 * @returns 404 - user was not found
 */
export const getUserHandler = async (
  req: Request<object, GetUserInput['query'], object>,
  res: Response
) => {
  const { email } = req.query;

  const user = await getUser(email as string);

  if (!user)
    return res.status(404).send([
      {
        code: 'not_found',
        message: 'User not found',
      },
    ]);

  return res.status(200).send(user);
};

/**
 * Create User Handler
 *
 * @description Creates a new user
 *
 * @param req Request
 * @param res Response
 * @returns 400 - invalid user input
 * @returns 201 - user object
 */
export const createUserHandler = async (
  req: Request<object, object, CreateUserInput['body']>,
  res: Response
) => {
  const body = req.body;

  const user = await createUser(body);

  return res.status(201).send(user);
};

/**
 * Update User Handler
 *
 * @description Updates a user by id
 *
 * @param req Request
 * @param res Response
 * @returns 400 - invalid user id or user input
 * @returns 404 - user was not found
 * @returns 200 - user object
 */
export const updateUserHandler = async (
  req: Request<UpdateUserInput['params'], object, UpdateUserInput['body']>,
  res: Response
) => {
  const { userId } = req.params;

  const user = await updateUser(req.body, userId);

  if (!user) {
    return res.status(404).send([
      {
        code: 'not_found',
        message: 'User not found',
      },
    ]);
  }

  return res.status(200).send(user);
};

/**
 * Delete User Handler
 *
 * @description Deletes a user by id
 *
 * @param req Request
 * @param res Response
 * @returns 400 - invalid user id
 * @returns 404 - user was not found
 * @returns 204 - no content
 */
export const deleteUserHandler = async (
  req: Request<DeleteUserInput['params'], object, object>,
  res: Response
) => {
  const { userId } = req.params;

  const user = await deleteUser(userId);

  if (!user)
    return res.status(404).send([
      {
        code: 'not_found',
        message: 'User not found',
      },
    ]);

  return res.status(204).send();
};
