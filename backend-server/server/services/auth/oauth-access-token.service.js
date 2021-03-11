/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-07 08:06:03
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-11 22:40:19
 */

import jwt from 'jsonwebtoken';

import CoreService from '../core-service';
import OauthAccessToken from '../../models/auth/oauthAccessToken.model';
import oauthClientService from './oauth-client.service';
import { changeDate } from '../../helpers/common-helpers/time-unit-converter';
import { salt, tokenLife, refreshTokenLife } from '../../config/core.config';

class OauthAccessTokenService extends CoreService {
  constructor() {
    super(OauthAccessToken);
  }

  generateToken(userObject, clientFilterObj, cb) {
    // eslint-disable-next-line consistent-return
    oauthClientService.findOne(clientFilterObj, (error, client) => {
      if (error) {
        return cb(error);
      }
      this.createAccessTokenANDRefreshToken(
        userObject,
        client,
        // eslint-disable-next-line consistent-return
        (createTokenerror, tokens) => {
          if (createTokenerror) {
            return cb(createTokenerror);
          }

          const roleList = userObject.roles.map((role) => role.code);
          const authPermissions = [];
          userObject.roles.map((role) =>
            role.permissions.map((permission) => {
              if (authPermissions.indexOf(permission.code) === -1) {
                authPermissions.push(permission.code);
              }
              return permission.code;
            })
          );

          const response = {
            access_token: jwt.sign(
              {
                // eslint-disable-next-line no-underscore-dangle
                token: tokens._id,
                // eslint-disable-next-line no-underscore-dangle
                userID: userObject._id,
                name: `${userObject.first_name} ${userObject.last_name}`,
                permissions: authPermissions,
                roles: roleList,
              },
              salt,
              { expiresIn: tokenLife }
            ),
            refresh_token: jwt.sign(
              {
                // eslint-disable-next-line no-underscore-dangle
                token: tokens.oauth_refresh_token._id,
              },
              salt,
              { expiresIn: refreshTokenLife }
            ),
            token_type: 'Bearer',
            expiresIn: tokenLife,
          };

          cb(null, response);
        }
      );
    });
  }

  createAccessTokenANDRefreshToken(userObject, clientObj, cb) {
    this.create(
      {
        // eslint-disable-next-line no-underscore-dangle
        user: userObject._id,
        // eslint-disable-next-line no-underscore-dangle
        client: clientObj._id,
        revoked: false,
        updated: new Date(),
        created: new Date(),
        expires_at: changeDate(new Date())
          .setSeconds(tokenLife)
          .getDate('none'),
        oauth_refresh_token: {
          revoked: false,
          created: new Date(),
          expires_at: changeDate(new Date())
            .setSeconds(refreshTokenLife)
            .getDate('none'),
        },
      },
      cb
    );
  }

  checkAccessToken(token, cb) {
    this.model
      .findOne({
        _id: token,
        revoked: false,
        expires_at: {
          $lte: changeDate(new Date()).setSeconds(tokenLife).getDate('none'),
        },
      })
      .populate({
        path: 'client',
        model: 'OauthClient',
        match: { revoked: false },
      })
      .populate({
        path: 'user',
        model: 'User',
        select: '_id first_name last_name email profile status roles',
        populate: [
          {
            path: 'roles',
            model: 'Role',
            select: '_id name code permissions',
            populate: [
              {
                path: 'permissions',
                model: 'Permission',
                select: '_id name code',
              },
            ],
          },
        ],
      })
      // eslint-disable-next-line consistent-return
      .exec((error, accessToken) => {
        if (error) {
          return cb(error);
        }
        cb(null, accessToken);
      });
  }
}

export default new OauthAccessTokenService();
