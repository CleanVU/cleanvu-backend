import mongoose, { Schema } from 'mongoose';
import type { RequestDocument } from '../interfaces/request.interface';

/**
 * Request Schema
 *
 * This schema is used to store the request information.
 *
 * @param {string} studentId - The id of the student.
 * @param {string} details - The details of the request.
 * @param {string} status - The status of the request.
 * @param {Date} estimatedCompletion - The estimated completion date of the request.
 * @param {string} location - The location of the request.
 * @param {string} building - The building of the request.
 * @param {string} createdAt - The date the request was created.
 * @param {string} updatedAt - The date the request was updated.
 * @param {string} _id - The id of the request.
 * @param {string} __v - The version of the request.
 */
const requestSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    estimatedCompletion: {
      type: Date,
      required: false,
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: 'Location',
      required: true,
    },
    building: {
      type: Schema.Types.ObjectId,
      ref: 'Building',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Request Model
 *
 * This schema is used to store the request information.
 *
 * @param {string} studentId - The id of the student.
 * @param {string} details - The details of the request.
 * @param {string} status - The status of the request.
 * @param {Date} estimatedCompletion - The estimated completion date of the request.
 * @param {string} location - The location of the request.
 * @param {string} building - The building of the request.
 * @param {string} createdAt - The date the request was created.
 * @param {string} updatedAt - The date the request was updated.
 * @param {string} _id - The id of the request.
 * @param {string} __v - The version of the request.
 */
const RequestModel = mongoose.model<RequestDocument>('Request', requestSchema);

export default RequestModel;
