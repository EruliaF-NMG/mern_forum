/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-06 19:56:38
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-07 18:17:23
 */

import validate from '../../../helpers/validation';
import { badResponse } from '../../../config/api-response.config';
import { generateErrorResponseFn } from '../../../helpers/common-helpers/common-methods';
import { get } from '../../../helpers/common-helpers/lodash.wrappers';
/**
 * @author Nisal Madusanka(EruliaF)
 * @description validate create Client API
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
 * @description validate edot user API
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

export { createUserValidate, updateUserValidate };
