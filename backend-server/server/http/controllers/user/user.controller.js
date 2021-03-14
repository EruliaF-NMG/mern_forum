/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-07 09:37:53
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-14 10:19:02
 */
import fs from 'fs';
import mongoose from 'mongoose';

import userService from '../../../services/user/user.service';
import {
  generateResponseFn,
  generateErrorResponseFn,
  generatePaginationResponseFn,
} from '../../../helpers/common-helpers/common-methods';
import {
  successPostResponse,
  successGetResponse,
  failedPostResponse,
  notFoundResponse,
  exceptionOccurredResponse,
} from '../../../config/api-response.config';

import { uploadImage, getImage } from '../../../helpers/gird-fs/manageUploads';
import { sendFileToResponce } from '../../../helpers/gird-fs/grid-fs';
import { BasicRoleID } from '../../../config/database-status';
import { logger } from '../../../helpers/common-helpers/logs';

/**
 * @description create new user
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const create = (req, res) => {
  userService.createUser(req.validatedFromObject, (error, user) => {
    if (error) {
      logger.error(
        `Failed To Create User :: Error :: ${JSON.stringify(error)}`
      );
      return res
        .status(failedPostResponse.httpStatus)
        .json(
          generateErrorResponseFn(
            failedPostResponse,
            error,
            'User Creation Failed'
          )
        );
    }
    return res
      .status(successPostResponse.httpStatus)
      .json(
        generateResponseFn(
          successPostResponse,
          user,
          'User created successfully'
        )
      );
  });
};

/**
 * @description update user
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const update = (req, res) => {
  const user = req.currentUser;

  user.first_name = req.validatedFromObject.first_name;
  user.last_name = req.validatedFromObject.last_name;
  user.profile.about = req.validatedFromObject.about;
  user.profile.address = req.validatedFromObject.address;
  user.profile.contact = req.validatedFromObject.contact;
  user.profile.updated_at = Date.now();
  // eslint-disable-next-line no-underscore-dangle
  user.updated_by = req.authUser._id;

  user.save((error, userobj) => {
    if (error) {
      logger.error(
        `Failed To Update User :: Error :: ${JSON.stringify(error)}`
      );
      return res
        .status(failedPostResponse.httpStatus)
        .json(
          generateErrorResponseFn(
            failedPostResponse,
            error,
            'User Creation Failed'
          )
        );
    }
    return res
      .status(successPostResponse.httpStatus)
      .json(
        generateResponseFn(
          successPostResponse,
          userobj,
          'User created successfully'
        )
      );
  });
};

/**
 * @description get user by id
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const getCurrentUser = (req, res) => {
  req.currentUser.password = undefined;
  res
    .status(successGetResponse.httpStatus)
    .json(generateResponseFn(successGetResponse, req.currentUser));
};

/**
 * @description get user by id
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const getUserByID = (req, res, next, id) => {
  userService.findByID(id, (error, user) => {
    if (error) {
      logger.error(
        `Selected User Not Found :: Error :: ${JSON.stringify(error)}`
      );
      return res
        .status(notFoundResponse.httpStatus)
        .json(
          generateErrorResponseFn(
            notFoundResponse,
            error,
            'Selected User Not Found'
          )
        );
    }
    req.currentUser = user;
    next();
  });
};

/**
 * @description get User List
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const getAllUsers = (req, res) => {
  userService.pagination(req.query, (error, usersObject) => {
    if (error) {
      logger.error(
        `Failed To Generate User List :: Error :: ${JSON.stringify(error)}`
      );
      return res
        .status(exceptionOccurredResponse.httpStatus)
        .json(
          generateErrorResponseFn(
            exceptionOccurredResponse,
            error,
            'Failed To Generate User List'
          )
        );
    }

    res
      .status(successGetResponse.httpStatus)
      .json(generatePaginationResponseFn(successGetResponse, usersObject));
  });
};

/**
 * @description upload porfile image
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const uploadProfilePic = (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const userID = req.currentUser._id;
  uploadImage(userID, req.file, (error) => {
    if (error) {
      logger.error(
        `User File Upload Failed :: Error :: ${JSON.stringify(error)}`
      );
      return res
        .status(failedPostResponse.httpStatus)
        .json(
          generateErrorResponseFn(
            failedPostResponse,
            error,
            'User File Upload Failed'
          )
        );
    }
    return res
      .status(successPostResponse.httpStatus)
      .json(
        generateResponseFn(
          successPostResponse,
          req.currentUser,
          'User File Upload successfully'
        )
      );
  });
};

/**
 * @description get user profile image
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const getUserProfileImage = (req, res, next) => {
  // eslint-disable-next-line no-underscore-dangle
  const userID = req.currentUser._id;
  getImage(userID, (error, file) => {
    if (error) {
      next();
    }
    if (file) {
      res.header('Content-Length', file.length);
      res.header('Content-Type', file.contentType);
      sendFileToResponce(userID, res, (fileError) => {
        if (fileError) {
          next();
        }
      });
    } else {
      next();
    }
  });
};

/**
 * @description Get Default Profile Image
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const defaultProfileImage = (req, res) => {
  res.header('Content-Type', 'image/png');
  fs.ReadStream('./assets/default-profile-img.png')
    .pipe(res)
    .on('error', (error) =>
      res
        .status(exceptionOccurredResponse.httpStatus)
        .json(
          generateErrorResponseFn(
            exceptionOccurredResponse,
            error,
            'File Not Fonnd'
          )
        )
    );
};

/**
 * @description set roles to user
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const setRoles = (req, res) => {
  const user = req.currentUser;

  user.roles = req.validatedFromObject.roles.map((value) =>
    mongoose.Types.ObjectId(value)
  );

  user.updated_at = Date.now();
  // eslint-disable-next-line no-underscore-dangle
  user.updated_by = req.authUser._id;

  user.save((error, userObject) => {
    if (error) {
      logger.error(
        `Failed to Attach Roles :: Error :: ${JSON.stringify(error)}`
      );
      return res
        .status(failedPostResponse.httpStatus)
        .json(
          generateErrorResponseFn(
            failedPostResponse,
            error,
            'Failed to Attach Roles'
          )
        );
    }
    return res
      .status(successPostResponse.httpStatus)
      .json(
        generateResponseFn(
          successPostResponse,
          userObject,
          'User update successfully'
        )
      );
  });
};

/**
 * @description change user status
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const statusChange = (req, res) => {
  const user = req.currentUser;
  const status = `${req.params.status}`;
  if (status === '1') {
    user.roles = [mongoose.Types.ObjectId(BasicRoleID)];
    user.status = true;
  } else {
    user.roles = [];
    user.status = false;
  }
  // eslint-disable-next-line no-underscore-dangle
  user.updated_by = req.authUser._id;

  user.updated_at = Date.now();
  // eslint-disable-next-line no-underscore-dangle
  user.updated_by = req.authUser._id;

  user.save((error, userObject) => {
    if (error) {
      logger.error(
        `Failed to Change User State :: Error :: ${JSON.stringify(error)}`
      );
      return res
        .status(failedPostResponse.httpStatus)
        .json(
          generateErrorResponseFn(
            failedPostResponse,
            error,
            'Failed to Change User State'
          )
        );
    }
    return res
      .status(successPostResponse.httpStatus)
      .json(
        generateResponseFn(
          successPostResponse,
          userObject,
          'User update successfully'
        )
      );
  });
};

export default {
  create,
  update,
  getUserByID,
  getCurrentUser,
  getAllUsers,
  uploadProfilePic,
  getUserProfileImage,
  defaultProfileImage,
  setRoles,
  statusChange,
};
