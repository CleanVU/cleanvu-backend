import mongoose from 'mongoose';
import { object, string } from 'zod';
import type { TypeOf } from 'zod';

const payload = {
  body: object({
    email: string({
      required_error: 'Email is required',
    }),
    role: string({
      required_error: 'Role is required',
    }),
    building: string()
      .refine(val => mongoose.Types.ObjectId.isValid(val), {
        message: 'Invalid building id',
        path: ['building'],
      })
      .optional(),
    floor: string({
      required_error: 'Floor is required',
    }).optional(),
    userId: string({
      required_error: 'User ID is required',
    }),
  }),
};

const params = {
  params: object({
    userId: string({
      required_error: 'User ID is required',
    }),
  }),
};

const query = {
  query: object({
    email: string({
      required_error: 'Email is required',
    }),
  }),
};

export const createUserSchema = object({
  ...payload,
});

export const getUserSchema = object({
  ...query,
});

export const updateUserSchema = object({
  ...params,
  ...payload,
});

export const deleteUserSchema = object({
  ...params,
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type GetUserInput = TypeOf<typeof getUserSchema>;
export type UpdateUserInput = TypeOf<typeof updateUserSchema>;
export type DeleteUserInput = TypeOf<typeof deleteUserSchema>;
