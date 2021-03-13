/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-13 22:05:26
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-13 23:13:18
 */
import { intersection } from '../../../helpers/common-helpers/lodash.wrappers';
import { permissionDeniedResponse } from '../../../config/api-response.config';
import { generateErrorResponseFn } from '../../../helpers/common-helpers/common-methods';
/**
 * Check Role is avilable
 * @param {array} roles
 * @returns
 */
// eslint-disable-next-line consistent-return
const isRole = (roles) => (req, res, next) => {
  let roleObject = roles;
  if (typeof roleObject === 'string') {
    roleObject = [roleObject];
  }
  const result = intersection(req.authRoles, roles);

  if (result.length === 0) {
    return res
      .status(permissionDeniedResponse.httpStatus)
      .send(
        generateErrorResponseFn(
          permissionDeniedResponse,
          {},
          permissionDeniedResponse.message
        )
      );
  }
  next();
};

export default isRole;
