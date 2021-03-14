/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-13 22:05:26
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-14 13:05:30
 */
import { intersection } from '../../../helpers/common-helpers/lodash.wrappers';
import { permissionDeniedResponse } from '../../../config/api-response.config';
import { generateErrorResponseFn } from '../../../helpers/common-helpers/common-methods';
/**
 * Check Permissions is avilable
 * @param {array} roles
 * @returns
 */
// eslint-disable-next-line consistent-return
const isPermissions = (permissions) => (req, res, next) => {
  let permissionsObject = permissions;
  if (typeof permissionsObject === 'string') {
    permissionsObject = [permissionsObject];
  }
  const result = intersection(req.authPermissions, permissionsObject);

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

export default isPermissions;
