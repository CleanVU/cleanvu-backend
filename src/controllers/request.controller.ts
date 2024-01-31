import {
  createRequest,
  deleteRequest,
  getRequest,
  getRequests,
  updateRequest,
} from '../service/request.service';
import type {
  CreateRequestInput,
  GetRequestInput,
  GetRequestsInput,
  UpdateRequestInput,
  DeleteRequestInput,
} from '../schema/request.schema';
import type { Request, Response } from 'express';

/**
 * Create Request Handler
 *
 * @description Creates a new request
 *
 * @param req Request
 * @param res Response
 * @returns 400 - invalid request input
 * @returns 201 - request object was created
 */
export const createRequestHandler = async (
  req: Request<object, object, CreateRequestInput['body']>,
  res: Response
) => {
  const request = await createRequest(req.body);

  return res.status(201).send(request);
};

/**
 * Get Requests Handler
 *
 * @description Gets all requests
 *
 * @param req Request
 * @param res Response
 * @returns 200 - request object
 * @returns 400 - invalid request id
 * @returns 404 - request was not found
 */
export const getRequestsHandler = async (
  req: Request<object, GetRequestsInput['query'], object>,
  res: Response
) => {
  const { page, count } = req.query;

  const requests = await getRequests(Number(page), Number(count));

  return res.status(200).send(requests);
};

/**
 * Get Request Handler
 *
 * @description Gets a request by id
 *
 * @param req Request
 * @param res Response
 * @returns 200 - request object
 * @returns 400 - invalid request id
 * @returns 404 - request was not found
 */
export const getRequestHandler = async (
  req: Request<GetRequestInput['params'], object, object>,
  res: Response
) => {
  const { requestId } = req.params;

  const request = await getRequest(requestId);

  if (!request) {
    return res.status(404).send([
      {
        code: 'not_found',
        message: 'Request not found',
      },
    ]);
  }

  return res.status(200).send(request);
};

/**
 * Update Request Handler
 *
 * @description Updates a request by id
 *
 * @param req Request
 * @param res Response
 * @returns 200 - request object
 * @returns 400 - invalid request id
 * @returns 404 - request was not found
 */
export const updateRequestHandler = async (
  req: Request<UpdateRequestInput['params'], object, UpdateRequestInput['body']>,
  res: Response
) => {
  const { requestId } = req.params;

  const body = req.body;

  const request = await updateRequest(requestId, body);

  if (!request) {
    return res.status(404).send([
      {
        code: 'not_found',
        message: 'Request not found',
      },
    ]);
  }

  return res.status(200).send(request);
};

/**
 * Delete Request Handler
 *
 * @description Deletes a request by id
 *
 * @param req Request
 * @param res Response
 * @returns 200 - request object
 * @returns 400 - invalid request id
 * @returns 404 - request was not found
 */
export const deleteRequestHandler = async (
  req: Request<DeleteRequestInput['params'], object, object>,
  res: Response
) => {
  const { requestId } = req.params;

  const request = await deleteRequest(requestId);

  if (!request) {
    return res.status(404).send([
      {
        code: 'not_found',
        message: 'Request not found',
      },
    ]);
  }

  return res.status(204).send();
};
