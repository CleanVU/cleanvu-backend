import BuildingModel from '../models/building.model';
import type {
  CreateBuildingInput,
  DeleteBuildingInput,
  GetBuildingInput,
  UpdateBuildingInput,
} from '../schema/building.schema';

/**
 * Create a new building
 *
 * @param {CreateBuildingInput['body']} input The building input
 * @returns {Promise<BuildingModel>} A promise that resolves with the created building
 */
export const createBuilding = async (input: CreateBuildingInput['body']) => {
  const newBuilding = new BuildingModel(input);

  await newBuilding.save();

  return newBuilding;
};

/**
 * Get a building by id
 *
 * @param {GetBuildingInput['params']['buildingId']} buildingId The building id
 * @returns {Promise<BuildingModel>} A promise that resolves with the building or null if not found
 */
export const getBuilding = async (
  buildingId: GetBuildingInput['params']['buildingId']
) => {
  const building = await BuildingModel.findById(buildingId);

  if (!building) return null;

  return building;
};

/**
 * Get all buildings
 *
 * @param {GetBuildingsInput['query']} query The query input
 * @returns {Promise<BuildingModel[]>} A promise that resolves with all buildings or null if not found
 */
export const getBuildings = async (page: number, count: number) => {
  const buildings = await BuildingModel.find()
    .skip((page - 1) * count)
    .limit(count);

  if (!buildings) return null;

  return buildings;
};

/**
 * Update a building by id
 *
 * @param {UpdateBuildingInput['body']} input The building input
 * @param {UpdateBuildingInput['params']['buildingId']} buildingId The building id
 * @returns {Promise<BuildingModel>} A promise that resolves with the updated building or null if not found
 */
export const updateBuilding = async (
  input: UpdateBuildingInput['body'],
  buildingId: UpdateBuildingInput['params']['buildingId']
) => {
  const updateBuilding = await BuildingModel.findByIdAndUpdate(
    buildingId,
    input,
    {
      new: true,
    }
  );

  if (!updateBuilding) return null;

  return updateBuilding;
};

/**
 * Delete a building by id
 *
 * @param {DeleteBuildingInput['params']['buildingId']} buildingId The building id
 * @returns {Promise<BuildingModel>} A promise that resolves with the deleted building or null if not found
 */
export const deleteBuilding = async (
  buildingId: DeleteBuildingInput['params']['buildingId']
) => {
  const deletedBuilding = await BuildingModel.findByIdAndDelete(buildingId);

  if (!deletedBuilding) return null;

  return deletedBuilding;
};
