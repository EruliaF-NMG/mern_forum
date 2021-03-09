/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-08 17:53:16
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-08 18:41:13
 */

import permissionService from '../../../services/user/permission.service';
import {
  generateResponseFn,
  generateErrorResponseFn,
} from '../../../helpers/common-helpers/common-methods';
import {
  successPostResponse,
  successGetResponse,
  failedPostResponse,
  notFoundResponse,
  exceptionOccurredResponse,
} from '../../../config/api-response.config';

const create = (req, res) => {
  const formObject = req.validatedFromObject;
  // eslint-disable-next-line no-underscore-dangle
  formObject.created_by = req.authUser._id;
  permissionService.createPermission(formObject, (error, permissionObj) => {
    if (error) {
      return res
        .status(failedPostResponse.httpStatus)
        .json(
          generateErrorResponseFn(
            failedPostResponse,
            error,
            'Permission Creation Failed'
          )
        );
    }
    return res
      .status(successPostResponse.httpStatus)
      .json(
        generateResponseFn(
          successPostResponse,
          permissionObj,
          'Permission created successfully'
        )
      );
  });
};

const update = (req, res) => {
  const permission = req.currentPermission;

  permission.name = req.validatedFromObject.name;
  permission.code = req.validatedFromObject.code;
  permission.updated_at = Date.now();
  // eslint-disable-next-line no-underscore-dangle
  permission.updated_by = req.authUser._id;

  permission.save((error, permissionObj) => {
    if (error) {
      return res
        .status(failedPostResponse.httpStatus)
        .json(
          generateErrorResponseFn(
            failedPostResponse,
            error,
            'Permission update Failed'
          )
        );
    }
    return res
      .status(successPostResponse.httpStatus)
      .json(
        generateResponseFn(
          successPostResponse,
          permissionObj,
          'Permission update successfully'
        )
      );
  });
};

const getCurrentPermission = (req, res) => {
  res
    .status(successGetResponse.httpStatus)
    .json(generateResponseFn(successGetResponse, req.currentPermission));
};

const getPermissionByID = (req, res, next, id) => {
  // eslint-disable-next-line consistent-return
  permissionService.findByID(id, (error, permissionObj) => {
    if (error) {
      return res
        .status(notFoundResponse.httpStatus)
        .json(
          generateErrorResponseFn(
            notFoundResponse,
            error,
            'request permissionObj not found'
          )
        );
    }
    req.currentPermission = permissionObj;
    next();
  });
};

const getAll = (req, res) => {
  // eslint-disable-next-line consistent-return
  permissionService.find({}, (error, permissionObj) => {
    if (error) {
      return res
        .status(exceptionOccurredResponse.httpStatus)
        .json(
          generateErrorResponseFn(
            exceptionOccurredResponse,
            error,
            'permission list not found'
          )
        );
    }

    res
      .status(successGetResponse.httpStatus)
      .json(generateResponseFn(successGetResponse, permissionObj));
  });
};

export default {
  create,
  update,
  getCurrentPermission,
  getPermissionByID,
  getAll,
};
