/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-07 09:37:53
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-11 21:26:55
 */
import fs from 'fs';
import mongoose from 'mongoose';

import userService from '../../../services/user/user.service';
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

import { uploadImage, getImage } from '../../../helpers/gird-fs/manageUploads';
import { sendFileToResponce } from '../../../helpers/gird-fs/grid-fs';

const create = (req, res) => {
  userService.createUser(req.validatedFromObject, (error, user) => {
    if (error) {
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

const getCurrentUser = (req, res) => {
  req.currentUser.password = undefined;
  res
    .status(successGetResponse.httpStatus)
    .json(generateResponseFn(successGetResponse, req.currentUser));
};

const getUserByID = (req, res, next, id) => {
  userService.findByID(id, (error, user) => {
    console.log(error);
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
    req.currentUser = user;
    next();
  });
};

const getAllUsers = (req, res) => {
  userService.find({}, (error, users) => {
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
      .json(generateResponseFn(successGetResponse, users));
  });
};

const uploadProfilePic = (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const userID = req.currentUser._id;
  uploadImage(userID, req.file, (error) => {
    if (error) {
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
      return res
        .status(failedPostResponse.httpStatus)
        .json(
          generateErrorResponseFn(
            failedPostResponse,
            error,
            'User update Failed'
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
};
