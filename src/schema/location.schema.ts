import { object, string } from 'zod';
import type { TypeOf } from 'zod';

const payload = {
  body: object({
    name: string({ required_error: 'Name is required' }),
    description: string().optional(),
    floor: string({ required_error: 'Floor is required' }),
    buildingId: string({ required_error: 'Building id is required' }),
  }),
};

const params = {
  params: object({
    locationId: string({
      required_error: 'Location id is required',
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

export const createLocationSchema = object({
  ...payload,
});

export const getLocationSchema = object({
  ...params,
});

export const getLocationsSchema = object({
  ...query,
});

export const updateLocationSchema = object({
  ...payload,
  ...params,
});

export const deleteLocationSchema = object({
  ...params,
});

export type CreateLocationInput = TypeOf<typeof createLocationSchema>;
export type GetLocationInput = TypeOf<typeof getLocationSchema>;
export type GetLocationsInput = TypeOf<typeof getLocationsSchema>;
export type UpdateLocationInput = TypeOf<typeof updateLocationSchema>;
export type DeleteLocationInput = TypeOf<typeof deleteLocationSchema>;
