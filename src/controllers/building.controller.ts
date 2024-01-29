import {
  createBuilding,
  updateBuilding,
  getBuilding,
  getBuildings,
  deleteBuilding,
} from '../service/building.service';
import type {
  CreateBuildingInput,
  GetBuildingsInput,
  UpdateBuildingInput,
  DeleteBuildingInput,
  GetBuildingInput,
} from '../schema/building.schema';
import type { Request, Response } from 'express';

/**
 * Create Building Handler
 *
 * @description Creates a new building
 *
 * @param req Request
 * @param res Response
 * @returns 400 - invalid building input
 * @returns 404 - building was not found
 * @returns 201 - building object was created
 */
export const createBuildingHandler = async (
  req: Request<object, object, CreateBuildingInput['body']>,
  res: Response
) => {
  const body = req.body;

  const building = await createBuilding(body);

  if (!building)
    return res.status(404).send([
      {
        code: 'not_found',
        message: 'Building not found',
      },
    ]);

  return res.status(201).send(building);
};

/**
 * Get Building Handler
 *
 * @description Gets a building by id
 *
 * @param req Request
 * @param res Response
 * @returns 200 - building object
 * @returns 400 - invalid building id
 * @returns 404 - building was not found
 */
export const getBuildingHandler = async (
  req: Request<GetBuildingInput['params'], object, object>,
  res: Response
) => {
  const { buildingId } = req.params;

  const building = await getBuilding(buildingId);

  if (!building)
    return res.status(404).send([
      {
        code: 'not_found',
        message: 'Building not found',
      },
    ]);

  return res.status(200).send(building);
};

/**
 * Get Buildings Handler
 *
 * @description Gets all buildings
 *
 * @param req Request
 * @param res Response
 * @returns 200 - building objects
 * @returns 400 - invalid query input
 * @returns 404 - buildings were not found
 */
export const getBuildingsHandler = async (
  req: Request<GetBuildingsInput['query'], object, object>,
  res: Response
) => {
  const { page, count } = req.query;

  const buildings = await getBuildings(Number(page), Number(count));

  if (!buildings)
    return res.status(404).send([
      {
        code: 'not_found',
        message: 'Buildings not found',
      },
    ]);

  return res.status(200).send(buildings);
};

/**
 * Update Building Handler
 *
 * @description Updates a building by id
 *
 * @param req Request
 * @param res Response
 * @returns 400 - invalid building id or building input
 * @returns 404 - building was not found
 * @returns 200 - building object was updated
 */
export const updateBuildingHandler = async (
  req: Request<
    UpdateBuildingInput['params'],
    object,
    UpdateBuildingInput['body']
  >,
  res: Response
) => {
  const { buildingId } = req.params;
  const body = req.body;

  const building = await updateBuilding(body, buildingId);

  if (!building)
    return res.status(404).send([
      {
        code: 'not_found',
        message: 'Building not found',
      },
    ]);

  return res.status(200).send(building);
};

/**
 * Delete Building Handler
 *
 * @description Deletes a building by id
 *
 * @param req Request
 * @param res Response
 * @returns 400 - invalid building id
 * @returns 404 - building was not found
 * @returns 200 - building object was deleted
 */
export const deleteBuildingHandler = async (
  req: Request<DeleteBuildingInput['params'], object, object>,
  res: Response
) => {
  const { buildingId } = req.params;

  const building = await deleteBuilding(buildingId);

  if (!building)
    return res.status(404).send([
      {
        code: 'not_found',
        message: 'Building not found',
      },
    ]);

  return res.status(200).send(building);
};
