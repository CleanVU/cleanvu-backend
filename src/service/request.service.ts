import LocationModel from '../models/location.model';
import RequestModel from '../models/request.model';
import UserModel from '../models/user.model';
import type { CreateRequestInput } from '../schema/request.schema';

/**
 * Create Request
 *
 * This function is used to create a new request.
 *
 * @param {CreateRequestInput['body']} input - The request information.
 * @returns {Promise<RequestDocument>} The request that was created.
 */
export const createRequest = async (input: CreateRequestInput['body']) => {
  const newRequest = new RequestModel({
    studentId: input.studentId,
    description: input.description,
    location: input.locationId,
    building: input.buildingId,
    status: input.status,
  });

  // add request id to student
  await UserModel.findByIdAndUpdate(input.studentId, {
    $push: { requests: newRequest._id },
  });

  // add request to matching location
  await LocationModel.findByIdAndUpdate(input.locationId, {
    $push: { requests: newRequest._id },
  });

  await newRequest.save();

  return newRequest;
};

/**
 * Get Requests
 *
 * This function is used to get all requests.
 *
 * @param {number} page - The page of the requests.
 * @returns {Promise<RequestDocument[]>} All requests.
 */
export const getRequests = async (page: number, count: number) => {
  const requests = await RequestModel.find()
    .skip((page - 1) * count)
    .limit(count)
    .populate('location')
    .populate('building');

  return requests;
};

/**
 * Get Requests
 *
 * This function is used to get all requests.
 *
 * @param {string} id - The id of the request.
 * @returns {Promise<RequestDocument[]>} All requests.
 */
export const getRequest = async (id: string) => {
  const request = await RequestModel.findById(id)
    .populate('location')
    .populate('building');

  return request;
};

/**
 * Get Requests
 *
 * This function is used to get all requests.
 *
 * @param {string} id - The id of the request.
 * @returns {Promise<RequestDocument[]>} All requests.
 */
export const updateRequest = async (
  id: string,
  input: CreateRequestInput['body']
) => {
  const request = await RequestModel.findByIdAndUpdate(
    id,
    {
      studentId: input.studentId,
      description: input.description,
      location: input.locationId,
      building: input.buildingId,
      status: input.status,
      estimatedCompletion: input.estimatedCompletion || undefined,
    },
    { new: true }
  )
    .populate('location')
    .populate('building');

  return request;
};

/**
 * Get Requests
 *
 * This function is used to get all requests.
 *
 * @param {string} id - The id of the request.
 * @returns {Promise<RequestDocument[]>} All requests.
 */
export const deleteRequest = async (id: string) => {
  const request = await RequestModel.findByIdAndDelete(id);

  return request;
};

/**
 * Get Requests by User ID
 *
 * This function is used to get all requests by user id.
 *
 * @param {string} userId - The id of the user.
 * @returns {Promise<RequestDocument[]>} All requests.
 */
export const getRequestsByUser = async (userId: string) => {
  const requests = await RequestModel.find({ studentId: userId })
    .populate('location')
    .populate('building');

  return requests;
};
