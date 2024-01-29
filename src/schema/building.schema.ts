import { object, string } from 'zod';
import type { TypeOf } from 'zod';

const payload = {
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    // string array
    floors: string({
      required_error: 'Floors is required',
    }).array(),
  }),
};

const params = {
  params: object({
    buildingId: string({
      required_error: 'Building ID is required',
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

export const createBuildingSchema = object({
  ...payload,
});

export const getBuildingSchema = object({
  ...params,
});

export const updateBuildingSchema = object({
  ...params,
  ...payload,
});

export const deleteBuildingSchema = object({
  ...params,
});

export const getBuildingsSchema = object({
  ...query,
});

export type CreateBuildingInput = TypeOf<typeof createBuildingSchema>;
export type GetBuildingInput = TypeOf<typeof getBuildingSchema>;
export type UpdateBuildingInput = TypeOf<typeof updateBuildingSchema>;
export type DeleteBuildingInput = TypeOf<typeof deleteBuildingSchema>;
export type GetBuildingsInput = TypeOf<typeof getBuildingsSchema>;
