import mongoose, { Schema } from 'mongoose';
import type { BuildingDocument } from '../interfaces/building.interface';

/**
 * Building Schema
 *
 * This schema is used to store the building information.
 *
 */
const buildingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    floors: {
      type: [String],
      required: true,
    },
    locations: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Location',
      },
    ],
  },
  {
    timestamps: true,
  }
);

/**
 * Building Model
 *
 * This schema is used to store the building information.
 *
 */
const BuildingModel = mongoose.model<BuildingDocument>(
  'Building',
  buildingSchema
);

export default BuildingModel;
