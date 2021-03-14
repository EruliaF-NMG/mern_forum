/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-07 11:44:05
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-14 08:43:14
 */
import jwt from 'jsonwebtoken';
import userService from '../../../services/user/user.service';
import { unauthorizedResponse } from '../../../config/api-response.config';
import { get } from '../../../helpers/common-helpers/lodash.wrappers';
import { salt } from '../../../config/core.config';
import oauthAccessTokenService from '../../../services/auth/oauth-access-token.service';
import { logger } from '../../../helpers/common-helpers/logs';

/**
 * @author Nisal Madusanka(EruliaF)
 * @description get token
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const token = (req, res) => {
  userService.authUser(req.validatedFromObject, (error, tokens) => {
    if (error) {
      logger.error(
        `Access token generation failed :: Error :: ${JSON.stringify(error)}`
      );
      res.status(unauthorizedResponse.httpStatus).send('Unauthorized');
    }
    res.status(200).send(tokens);
  });
};

/**
 * @description logout user
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
// eslint-disable-next-line consistent-return
const logout = (req, res) => {
  // eslint-disable-next-line no-shadow
  let token = get(req, 'headers.authorization', undefined);
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
    // eslint-disable-next-line consistent-return
    oauthAccessTokenService.findByID(decoded.token, (error, tokenObj) => {
      if (error || !tokenObj) {
        return res.status(400).send('Unauthorized');
      }
      const tokenObject = tokenObj;
      tokenObject.revoked = true;
      tokenObject.oauth_refresh_token.revoked = true;
      tokenObj.save(() => res.status(200).send('Done'));
    });
  } catch (err) {
    return res.status(400).send('Unauthorized');
  }
};

/**
 * @description refresh token
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const refresh = (req, res) => {
  console.log(req, res);
  res.status(200).send('todo');
};

export default {
  token,
  refresh,
  logout,
};
