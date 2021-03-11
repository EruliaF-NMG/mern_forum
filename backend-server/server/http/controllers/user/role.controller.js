/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-08 17:53:16
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-11 20:48:09
 */
import mongoose from 'mongoose';
import roleService from '../../../services/user/role.service';
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
  roleService.createRole(formObject, (error, roleObj) => {
    if (error) {
      return res
        .status(failedPostResponse.httpStatus)
        .json(
          generateErrorResponseFn(
            failedPostResponse,
            error,
            'Role Creation Failed'
          )
        );
    }
    return res
      .status(successPostResponse.httpStatus)
      .json(
        generateResponseFn(
          successPostResponse,
          roleObj,
          'Role created successfully'
        )
      );
  });
};

const update = (req, res) => {
  const role = req.currentRole;

  role.name = req.validatedFromObject.name;
  role.code = req.validatedFromObject.code;
  role.updated_at = Date.now();
  // eslint-disable-next-line no-underscore-dangle
  role.updated_by = req.authUser._id;

  role.save((error, roleObj) => {
    if (error) {
      return res
        .status(failedPostResponse.httpStatus)
        .json(
          generateErrorResponseFn(
            failedPostResponse,
            error,
            'Role update Failed'
          )
        );
    }
    return res
      .status(successPostResponse.httpStatus)
      .json(
        generateResponseFn(
          successPostResponse,
          roleObj,
          'Role update successfully'
        )
      );
  });
};

const getCurrentRole = (req, res) => {
  res
    .status(successGetResponse.httpStatus)
    .json(generateResponseFn(successGetResponse, req.currentRole));
};

const getRoleByID = (req, res, next, id) => {
  // eslint-disable-next-line consistent-return
  roleService.findByID(id, (error, role) => {
    if (error) {
      return res
        .status(notFoundResponse.httpStatus)
        .json(
          generateErrorResponseFn(
            notFoundResponse,
            error,
            'request user not found'
          )
        );
    }
    req.currentRole = role;
    next();
  });
};

const getAll = (req, res) => {
  // eslint-disable-next-line consistent-return
  roleService.find({}, (error, roles) => {
    if (error) {
      return res
        .status(exceptionOccurredResponse.httpStatus)
        .json(
          generateErrorResponseFn(
            exceptionOccurredResponse,
            error,
            'user list not found'
          )
        );
    }

    res
      .status(successGetResponse.httpStatus)
      .json(generateResponseFn(successGetResponse, roles));
  });
};

const setPermissions = (req, res) => {
  const role = req.currentRole;

  role.permissions = req.validatedFromObject.permissions.map((value) =>
    mongoose.Types.ObjectId(value)
  );

  role.updated_at = Date.now();
  // eslint-disable-next-line no-underscore-dangle
  role.updated_by = req.authUser._id;

  role.save((error, roleObj) => {
    if (error) {
      return res
        .status(failedPostResponse.httpStatus)
        .json(
          generateErrorResponseFn(
            failedPostResponse,
            error,
            'Role update Failed'
          )
        );
    }
    return res
      .status(successPostResponse.httpStatus)
      .json(
        generateResponseFn(
          successPostResponse,
          roleObj,
          'Role update successfully'
        )
      );
  });
};

export default {
  create,
  update,
  getRoleByID,
  getCurrentRole,
  setPermissions,
  getAll,
};
