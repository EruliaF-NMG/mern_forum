/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-06 19:56:38
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-14 10:13:00
 */

import validate from '../../../helpers/validation';
import {
  badResponse,
  notFoundResponse,
} from '../../../config/api-response.config';
import { generateErrorResponseFn } from '../../../helpers/common-helpers/common-methods';
import { get } from '../../../helpers/common-helpers/lodash.wrappers';
/**
 * @author Nisal Madusanka(EruliaF)
 * @description validate create user API
 * @param {Object} req express request object
 * @param {Object} res express response object
 * @param {Function} next express request pass to next
 */
const createUserValidate = (req, res, next) => {
  const formData = {
    first_name: get(req.body, 'first_name', ''),
    last_name: get(req.body, 'last_name', ''),
    email: get(req.body, 'email', ''),
    password: get(req.body, 'password', ''),
  };

  validate(formData)
    .setFileds({
      first_name: 'First Name',
      last_name: 'Last Name',
      email: 'E-mail',
      password: 'Password',
    })
    .setRules({
      first_name: 'required',
      last_name: 'required',
      email: 'required|email|unique:users,email',
      password: 'required',
    })
    .setMessage({})
    // eslint-disable-next-line consistent-return
    .run((error) => {
      if (error) {
        return res
          .status(badResponse.httpStatus)
          .send(
            generateErrorResponseFn(
              badResponse,
              error,
              'Validation error occurred, while creating new user'
            )
          );
      }
      req.validatedFromObject = formData;
      next();
    });
};

/**
 * @author Nisal Madusanka(EruliaF)
 * @description validate edit user API
 * @param {Object} req express request object
 * @param {Object} res express response object
 * @param {Function} next express request pass to next
 */
const updateUserValidate = (req, res, next) => {
  const formData = {
    first_name: get(req.body, 'first_name', ''),
    last_name: get(req.body, 'last_name', ''),
    about: get(req.body, 'about', ''),
    address: get(req.body, 'address', ''),
    contact: get(req.body, 'contact', ''),
  };

  validate(formData)
    .setFileds({
      first_name: 'First Name',
      last_name: 'Last Name',
      about: 'About Me',
      address: 'Address',
      contact: 'Contact No.',
    })
    .setRules({
      first_name: 'required',
      last_name: 'required',
      about: 'max:500',
      address: 'max:255',
      contact: 'max:10',
    })
    .setMessage({})
    // eslint-disable-next-line consistent-return
    .run((error) => {
      if (error) {
        return res
          .status(badResponse.httpStatus)
          .send(
            generateErrorResponseFn(
              badResponse,
              error,
              'Validation error occurred, while editing user'
            )
          );
      }
      req.validatedFromObject = formData;
      next();
    });
};

/**
 * @author Nisal Madusanka(EruliaF)
 * @description validate set  role API
 * @param {Object} req express request object
 * @param {Object} res express response object
 * @param {Function} next express request pass to next
 */
const setRolesValidate = (req, res, next) => {
  const formData = {
    roles: get(req.body, 'roles', []),
  };

  validate(formData)
    .setFileds({
      roles: 'Roles',
    })
    .setRules({
      roles: 'required',
    })
    .setMessage({})
    // eslint-disable-next-line consistent-return
    .run((error) => {
      if (error) {
        return res
          .status(badResponse.httpStatus)
          .send(
            generateErrorResponseFn(
              badResponse,
              error,
              'Validation error occurred, while updating new Role'
            )
          );
      }
      req.validatedFromObject = formData;
      next();
    });
};

/**
 * @author Nisal Madusanka(EruliaF)
 * @description validate status change api
 * @param {Object} req express request object
 * @param {Object} res express response object
 * @param {Function} next express request pass to next
 */
// eslint-disable-next-line consistent-return
const statusChangeValidate = (req, res, next) => {
  const status = `${req.params.status}`;
  if (status === '1' || status === '0') {
    next();
  } else {
    return res
      .status(notFoundResponse.httpStatus)
      .send(
        generateErrorResponseFn(notFoundResponse, {}, `States should Be 1 or 0`)
      );
  }
};

export {
  createUserValidate,
  updateUserValidate,
  setRolesValidate,
  statusChangeValidate,
};
