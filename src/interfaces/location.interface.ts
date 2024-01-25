import type mongoose from 'mongoose';
import type { RequestDocument } from './request.interface';

export interface LocationDocument extends mongoose.Document {
  room: string;
  roomDescription?: string;
  floor: string;
  lastCleaned: Date;
  requests: RequestDocument[];
}
