import mongoose, { Schema } from 'mongoose';
import type { LocationDocument } from '../interfaces/location.interface';

/**
 * Location Schema
 *
 * This schema is used to store the building information.
 *  * Location can be a room in a building or anything like that.
 *
 * @param {string} room - The room of the location.
 * @param {string} roomDescription - The room description of the location.
 * @param {string} floor - The floor of the location.
 * @param {Date} lastCleaned - The date the location was last cleaned.
 * @param {string} createdAt - The date the location was created.
 * @param {string} updatedAt - The date the location was updated.
 * @param {string} _id - The id of the location.
 * @param {string} __v - The version of the location.
 */
const locationSchema = new mongoose.Schema(
  {
    room: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    roomDescription: {
      type: String,
    },
    floor: {
      type: Number,
      required: true,
    },
    lastCleaned: {
      type: Date,
      required: true,
    },
    requests: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Request',
      },
    ],
  },
  {
    timestamps: true,
  }
);

/**
 * Location Model
 *
 * This model is used to store the location information.
 * Location can be a room in a building or anything like that.
 *
 * @param {string} room - The room of the location.
 * @param {string} roomDescription - The room description of the location.
 * @param {string} floor - The floor of the location.
 * @param {Date} lastCleaned - The date the location was last cleaned.
 * @param {string} createdAt - The date the location was created.
 * @param {string} updatedAt - The date the location was updated.
 * @param {string} _id - The id of the location.
 * @param {string} __v - The version of the location.
 */
const LocationModel = mongoose.model<LocationDocument>(
  'Location',
  locationSchema
);

export default LocationModel;
