import type { BuildingDocument } from './building.interface';
import type { LocationDocument } from './location.interface';
import type mongoose from 'mongoose';

/* eslint-disable autofix/no-unused-vars */
export interface RequestDocument extends mongoose.Document {
  studentId: string;
  details: string;
  status: RequestStatus;
  estimatedCompletion?: string;
  location: LocationDocument | string;
  building: BuildingDocument | string;
}

export enum RequestStatus {
  REQUESTED = 'requested',
  ACCEPTED = 'accepted',
  COMPLETED = 'completed',
  DENIED = 'denied',
}
