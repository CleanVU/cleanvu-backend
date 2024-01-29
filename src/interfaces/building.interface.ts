import type mongoose from 'mongoose';
import type { LocationDocument } from './location.interface';

export interface BuildingDocument extends mongoose.Document {
  name: string;
  floors: string[];
  locations: LocationDocument[];
  createdAt: Date;
  updatedAt: Date;
}
