/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-07 13:21:04
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-07 14:58:44
 */

import jwt from 'jsonwebtoken';
import { salt } from '../../../config/core.config';
import oauthAccessTokenService from '../../../services/auth/oauth-access-token.service';
import { get } from '../../../helpers/common-helpers/lodash.wrappers';

const isAuth = (req, res, next) => {
  let token =
    get(req, 'headers.x-access-token', undefined) ||
    get(req, 'headers.authorization', undefined);
  if (!token) {
    return res.status(400).send('Unauthorized');
  }

  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (!token) {
    return res.status(400).send('Unauthorized');
  }

  try {
    const decoded = jwt.verify(token, salt);
    oauthAccessTokenService.checkAccessToken(
      decoded.token,
      // eslint-disable-next-line consistent-return
      (error, tokenObj) => {
        if (error || !tokenObj) {
          return res.status(400).send('Unauthorized');
        }

        req.authUser = tokenObj.user;
        next();
      }
    );
  } catch (err) {
    return res.status(400).send('Unauthorized');
  }
};

export default isAuth;
