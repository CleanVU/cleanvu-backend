import mongoose, { Schema } from 'mongoose';
import type { UserDocument } from '../interfaces/user.interface';

/**
 * User Schema
 *
 * This schema is used to store the user information.
 *
 * @param {string} email - The email of the user.
 * @param {string} role - The role of the user.
 * @param {string} building - The building of the user.
 * @param {string} floor - The floor of the user.
 * @param {string} createdAt - The date the user was created.
 * @param {string} updatedAt - The date the user was updated.
 * @param {string} _id - The id of the user.
 * @param {string} __v - The version of the user.
 */
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'custodian'],
      required: true,
    },
    building: {
      type: Schema.Types.ObjectId,
      ref: 'Building',
    },
    floor: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * User Model
 *
 * This model is used to store the user information.
 *
 * @param {string} email - The email of the user.
 * @param {string} role - The role of the user.
 * @param {string} building - The building of the user.
 * @param {string} floor - The floor of the user.
 * @param {string} createdAt - The date the user was created.
 * @param {string} updatedAt - The date the user was updated.
 * @param {string} _id - The id of the user.
 * @param {string} __v - The version of the user.
 */
const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;
