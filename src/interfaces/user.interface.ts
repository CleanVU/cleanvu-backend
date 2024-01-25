import type mongoose from 'mongoose';

/* eslint-disable autofix/no-unused-vars */
export interface UserDocument extends mongoose.Document {
  email: string;
  role: Role;
  building?: string;
  floor?: string;
}

export enum Role {
  ADMIN = 'admin',
  STUDENT = 'student',
  CUSTODIAN = 'custodian',
}
