/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-07 13:21:04
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-14 10:09:33
 */

import jwt from 'jsonwebtoken';
import { salt } from '../../../config/core.config';
import oauthAccessTokenService from '../../../services/auth/oauth-access-token.service';
import { get } from '../../../helpers/common-helpers/lodash.wrappers';
import { logger } from '../../../helpers/common-helpers/logs';

/**
 * Check User authentication
 * @param {*} req request object
 * @param {*} res response object
 * @param {*} next pass to next
 * @returns
 */
// eslint-disable-next-line consistent-return
const isAuth = (req, res, next) => {
  let token =
    get(req, 'headers.x-access-token', undefined) ||
    get(req, 'headers.authorization', undefined);
  if (!token) {
    logger.error('Unauthorized Request');
    return res.status(401).send('Unauthorized');
  }

  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (!token) {
    logger.error('Unauthorized Request');
    return res.status(401).send('Unauthorized');
  }

  try {
    const decoded = jwt.verify(token, salt);
    oauthAccessTokenService.checkAccessToken(
      decoded.token,
      // eslint-disable-next-line consistent-return
      (error, tokenObj) => {
        if (error || !tokenObj) {
          return res.status(401).send('Unauthorized');
        }
        const { user } = tokenObj;

        const roleList = user.roles.map((value) => value.code);
        const authPermissions = [];
        user.roles.map((role) =>
          role.permissions.map((permission) => {
            if (authPermissions.indexOf(permission.code) === -1) {
              authPermissions.push(permission.code);
            }
            return permission.code;
          })
        );

        req.authUser = user;
        req.authRoles = roleList;
        req.authPermissions = authPermissions;
        next();
      }
    );
  } catch (err) {
    logger.error('Unauthorized Request');
    return res.status(401).send('Unauthorized');
  }
};

export default isAuth;
