/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-06 10:39:18
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-13 22:17:30
 */

const successGetResponse = {
  code: 'DATA_RECEIVED',
  message: 'resource data successfully received',
  httpStatus: 200,
};

const successPostResponse = {
  code: 'SUCCESSFULLY_CREATED',
  message: 'resource created successfully',
  httpStatus: 201,
};

const failedPostResponse = {
  code: 'FAILED_CREATED',
  message: 'resource creation failed',
  httpStatus: 400,
};

const successPutResponse = {
  code: 'SUCCESSFULLY_UPDATED',
  message: 'resource updated successfully',
  httpStatus: 200,
};

const successDeleteResponse = {
  code: 'SUCCESSFULLY_DELETED',
  message: 'resource deleted successfully',
  httpStatus: 200,
};

const failedDeleteResponse = {
  code: 'FAILED_DELETED',
  message: 'failed to delete resource',
  httpStatus: 200,
};

const unauthorizedResponse = {
  code: 'UNAUTHORIZED',
  message: 'unauthorized user',
  httpStatus: 401,
};

const badResponse = {
  code: 'VALIDATION_ERROR',
  message: 'validation fired during execution',
  httpStatus: 400,
};

const exceptionOccurredResponse = {
  code: 'EXCEPTION_OCCURRED',
  message: 'exception occurs during execution',
  httpStatus: 400,
};

const notFoundResponse = {
  code: 'NOT_FOUND',
  message: 'resource not fond',
  httpStatus: 404,
};

const permissionDeniedResponse = {
  code: 'PERMISSION_DENIED',
  message: 'User doesn`t have enough permissions',
  httpStatus: 403,
};

export {
  successGetResponse,
  successPostResponse,
  failedPostResponse,
  successPutResponse,
  unauthorizedResponse,
  exceptionOccurredResponse,
  badResponse,
  notFoundResponse,
  successDeleteResponse,
  failedDeleteResponse,
  permissionDeniedResponse,
};
