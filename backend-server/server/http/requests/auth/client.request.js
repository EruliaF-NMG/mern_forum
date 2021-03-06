/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-06 19:56:38
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-06 21:37:52
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
const createClientValidate = (req, res, next) => {
  const formData = {
    name: get(req.body, 'name', ''),
    client_code: get(req.body, 'client_code', ''),
    secret: get(req.body, 'secret', ''),
  };

  validate(formData)
    .setFileds({
      name: 'Name',
      client_code: 'Client Code',
      secret: 'Secret',
    })
    .setRules({
      name: 'required',
      client_code: 'required|unique:oauthclients,client_code',
      secret: 'required|unique:oauthclients,secret',
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
              'Validation error occurred, when creating new client'
            )
          );
      }
      req.formObj = formData;
      next();
    });
};

// eslint-disable-next-line import/prefer-default-export
export { createClientValidate };
