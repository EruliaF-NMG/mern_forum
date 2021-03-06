/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-13 22:36:00
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-14 10:20:03
 */

import { permissionDeniedResponse } from '../../../config/api-response.config';
import { roleCodes } from '../../../config/database-status';
import { generateErrorResponseFn } from '../../../helpers/common-helpers/common-methods';

/**
 * Check User has Admin role Or is action performed by same user
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next pass to next
 * @returns
 */
// eslint-disable-next-line consistent-return
const isProfileEditBySameUser = (req, res, next) => {
  if (
    // eslint-disable-next-line no-underscore-dangle
    req.currentUser._id.toString() === req.authUser._id.toString() ||
    req.authRoles.indexOf(roleCodes.admin) !== -1
  ) {
    next();
  } else {
    return res
      .status(permissionDeniedResponse.httpStatus)
      .send(
        generateErrorResponseFn(
          permissionDeniedResponse,
          {},
          permissionDeniedResponse.message
        )
      );
  }
};

/**
 * Check User has Admin role Or is action performed by same user
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next pass to next
 * @returns
 */
// eslint-disable-next-line consistent-return
const isPostEditBySameUser = (req, res, next) => {
  if (
    // eslint-disable-next-line no-underscore-dangle
    req.currentPost.created_by._id.toString() === req.authUser._id.toString() ||
    req.authRoles.indexOf(roleCodes.admin) !== -1
  ) {
    next();
  } else {
    return res
      .status(permissionDeniedResponse.httpStatus)
      .send(
        generateErrorResponseFn(
          permissionDeniedResponse,
          {},
          permissionDeniedResponse.message
        )
      );
  }
};

export { isProfileEditBySameUser, isPostEditBySameUser };
