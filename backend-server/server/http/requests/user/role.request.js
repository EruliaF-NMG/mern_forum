/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-06 19:56:38
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-08 18:24:19
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
const createRoleValidate = (req, res, next) => {
  const formData = {
    name: get(req.body, 'name', ''),
    code: get(req.body, 'code', ''),
    permissions: get(req.body, 'permissions', []),
  };

  validate(formData)
    .setFileds({
      name: 'Role Name',
      code: 'Role Code',
      permissions: 'Permissions',
    })
    .setRules({
      name: 'required',
      code: 'required',
      permissions: 'required',
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
              'Validation error occurred, while creating new Role'
            )
          );
      }
      req.validatedFromObject = formData;
      next();
    });
};

// eslint-disable-next-line import/prefer-default-export
export { createRoleValidate };
