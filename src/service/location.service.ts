import BuildingModel from '../models/building.model';
import LocationModel from '../models/location.model';
import type { CreateLocationInput } from '../schema/location.schema';

/**
 * Create a new location
 *
 * @param {CreateLocationInput['body']} input - The location information.
 * @returns {Promise<LocationDocument>} The location document.
 */
export const createLocation = async (input: CreateLocationInput['body']) => {
  const newLocation = new LocationModel({
    name: input.name,
    description: input.description,
    floor: input.floor,
    lastCleaned: new Date(),
    requests: [],
  });

  // add it to the building
  await BuildingModel.findByIdAndUpdate(input.buildingId, {
    $push: { locations: newLocation._id },
  });

  await newLocation.save();

  return newLocation;
};

/**
 * Get a location by id
 *
 * @param {string} locationId - The id of the location.
 * @returns {Promise<LocationDocument>} The location document.
 */
export const getLocation = async (locationId: string) => {
  const location = await LocationModel.findById(locationId); //.populate('requests');

  return location;
};

/**
 * Get all locations
 *
 * @param {number} count - The number of locations to get.
 * @param {number} page - The page of locations to get.
 * @returns {Promise<LocationDocument[]>} The location documents.
 */
export const getLocations = async (count: number, page: number) => {
  const locations = await LocationModel.find()
    .limit(count)
    .skip((page - 1) * count);
  //.populate('requests');

  return locations;
};

/**
 * Update a location
 *
 * @param {string} locationId - The id of the location.
 * @param {CreateLocationInput['body']} input - The location information.
 * @returns {Promise<LocationDocument>} The location document.
 */
export const updateLocation = async (
  locationId: string,
  input: CreateLocationInput['body']
) => {
  const location = await LocationModel.findByIdAndUpdate(
    locationId,
    {
      name: input.name,
      description: input.description,
      floor: input.floor,
    },
    { new: true }
  );

  return location;
};

/**
 * Delete a location
 *
 * @param {string} locationId - The id of the location.
 * @returns {Promise<LocationDocument>} The location document.
 */
export const deleteLocation = async (locationId: string) => {
  const location = await LocationModel.findByIdAndDelete(locationId);

  return location;
};
