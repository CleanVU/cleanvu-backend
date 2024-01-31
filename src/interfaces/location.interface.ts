import type mongoose from 'mongoose';
import type { RequestDocument } from './request.interface';

export interface LocationDocument extends mongoose.Document {
  name: string;
  description?: string;
  floor: string;
  lastCleaned: Date;
  requests: RequestDocument[];
  createdAt: Date;
  updatedAt: Date;
}
