import { object, string } from 'zod';
import type { TypeOf } from 'zod';

const payload = {
  body: object({
    studentId: string({
      required_error: 'Student ID is required',
    }),
    description: string({
      required_error: 'Description is required',
    }),
    status: string({
      required_error: 'Status is required',
    }),
    locationId: string({
      required_error: 'Location ID is required',
    }),
    buildingId: string({
      required_error: 'Building ID is required',
    }),
    estimatedCompletion: string().optional(),
  }),
};

const params = {
  params: object({
    requestId: string({
      required_error: 'Request ID is required',
    }),
  }),
};

const query = {
  query: object({
    count: string({ required_error: 'Count is required' }).refine(
      val => {
        const count = Number(val);
        return !isNaN(count) && count > 0;
      },
      { message: 'Count must be greater than 0' }
    ),
    page: string({ required_error: 'Page is required' }).refine(
      val => {
        const page = Number(val);
        return !isNaN(page) && page > 0;
      },
      { message: 'Page must be greater than 0' }
    ),
  }),
};

export const createRequestSchema = object({
  ...payload,
});

export const getRequestSchema = object({
  ...params,
});

export const getRequestsSchema = object({
  ...query,
});

export const updateRequestSchema = object({
  ...payload,
  ...params,
});

export const deleteRequestSchema = object({
  ...params,
});

export type CreateRequestInput = TypeOf<typeof createRequestSchema>;
export type GetRequestInput = TypeOf<typeof getRequestSchema>;
export type GetRequestsInput = TypeOf<typeof getRequestsSchema>;
export type UpdateRequestInput = TypeOf<typeof updateRequestSchema>;
export type DeleteRequestInput = TypeOf<typeof deleteRequestSchema>;
