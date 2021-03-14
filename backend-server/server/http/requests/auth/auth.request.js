/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-06 19:56:38
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-14 10:10:16
 */

import validate from '../../../helpers/validation';
import { badResponse } from '../../../config/api-response.config';
import { generateErrorResponseFn } from '../../../helpers/common-helpers/common-methods';
import { get } from '../../../helpers/common-helpers/lodash.wrappers';
import { logger } from '../../../helpers/common-helpers/logs';

/**
 * @description validate login API
 * @param {Object} req express request object
 * @param {Object} res express response object
 * @param {Function} next express request pass to next
 */
const loginValidate = (req, res, next) => {
  const formData = {
    email: get(req.body, 'email', ''),
    password: get(req.body, 'password', ''),
    client_code: get(req.body, 'client_code', ''),
    client_secret: get(req.body, 'client_secret', ''),
  };

  validate(formData)
    .setFileds({
      username: 'Username',
      password: 'Password',
      client_code: 'Client ID',
      client_secret: 'Client secret',
    })
    .setRules({
      email: 'required|email',
      password: 'required',
      client_code: 'required',
      client_secret: 'required',
    })
    .setMessage({})
    // eslint-disable-next-line consistent-return
    .run((error) => {
      if (error) {
        logger.error(
          `Validation error occurred, when user login :: Error :: ${JSON.stringify(
            error
          )}`
        );
        return res
          .status(badResponse.httpStatus)
          .send(
            generateErrorResponseFn(
              badResponse,
              error,
              'Validation error occurred, when user login'
            )
          );
      }
      req.validatedFromObject = formData;
      next();
    });
};

// eslint-disable-next-line import/prefer-default-export
export { loginValidate };
