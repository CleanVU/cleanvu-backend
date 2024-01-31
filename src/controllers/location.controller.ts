import {
  createLocation,
  deleteLocation,
  getLocation,
  getLocations,
  updateLocation,
} from '../service/location.service';
import type {
  CreateLocationInput,
  DeleteLocationInput,
  GetLocationInput,
  GetLocationsInput,
  UpdateLocationInput,
} from '../schema/location.schema';
import type { Request, Response } from 'express';

/**
 * Create Location Handler
 *
 * @description Creates a new location
 *
 * @param req Request
 * @param res Response
 * @returns 400 - invalid location input
 * @returns 201 - location object was created
 */
export const createLocationHandler = async (
  req: Request<object, object, CreateLocationInput['body']>,
  res: Response
) => {
  const location = await createLocation(req.body);

  return res.status(201).send(location);
};

/**
 * Get Location Handler
 *
 * @description Gets a location by id
 *
 * @param req Request
 * @param res Response
 * @returns 200 - location object
 * @returns 400 - invalid location id
 * @returns 404 - location was not found
 */
export const getLocationHandler = async (
  req: Request<GetLocationInput['params'], object, object>,
  res: Response
) => {
  const { locationId } = req.params;

  const location = await getLocation(locationId);

  if (!location) {
    return res.status(404).send([
      {
        code: 'not_found',
        message: 'Location not found',
      },
    ]);
  }

  return res.status(200).send(location);
};

/**
 * Get Locations Handler
 *
 * @description Gets all locations
 *
 * @param req Request
 * @param res Response
 * @returns 200 - location objects
 * @returns 400 - invalid count or page
 */
export const getLocationsHandler = async (
  req: Request<object, GetLocationsInput['query'], object>,
  res: Response
) => {
  const { count, page } = req.query;

  const locations = await getLocations(Number(count), Number(page));

  return res.status(200).send(locations);
};

/**
 * Update Location Handler
 *
 * @description Updates a location by id
 *
 * @param req Request
 * @param res Response
 * @returns 400 - invalid location input
 * @returns 404 - location was not found
 * @returns 200 - location object was updated
 */
export const updateLocationHandler = async (
  req: Request<
    UpdateLocationInput['params'],
    object,
    UpdateLocationInput['body']
  >,
  res: Response
) => {
  const { locationId } = req.params;
  const body = req.body;

  const location = await updateLocation(locationId, body);

  if (!location) {
    return res.status(404).send([
      {
        code: 'not_found',
        message: 'Location not found',
      },
    ]);
  }

  return res.status(200).send(location);
};

/**
 * Delete Location Handler
 *
 * @description Deletes a location by id
 *
 * @param req Request
 * @param res Response
 * @returns 400 - invalid location id
 * @returns 404 - location was not found
 * @returns 200 - location object was deleted
 */
export const deleteLocationHandler = async (
  req: Request<DeleteLocationInput['params'], object, object>,
  res: Response
) => {
  const { locationId } = req.params;

  const location = await deleteLocation(locationId);

  if (!location) {
    return res.status(404).send([
      {
        code: 'not_found',
        message: 'Location not found',
      },
    ]);
  }

  return res.status(200).send(location);
};
