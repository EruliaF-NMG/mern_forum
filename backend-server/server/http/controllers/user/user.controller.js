/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-07 09:37:53
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-07 19:48:00
 */

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

export default { create, update, getUserByID, getCurrentUser, getAllUsers };
