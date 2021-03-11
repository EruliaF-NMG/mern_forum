/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-07 08:33:52
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-11 22:35:11
 */

import CoreService from '../core-service';
import User from '../../models/user/user.model';
import oauthAccessTokenService from '../auth/oauth-access-token.service';

class UserService extends CoreService {
  constructor() {
    super(User);
  }

  checkUser(userObject, cb) {
    this.model
      .findOne({
        email: userObject.email,
      })
      .populate([
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
      ])
      // eslint-disable-next-line consistent-return
      .exec((error, user) => {
        if (error) {
          return cb(error);
        }
        if (!user || user.authenticate(userObject.password) !== true) {
          return cb('Unauthorized');
        }
        cb(null, user);
      });
  }

  authUser(userObject = {}, cb) {
    // eslint-disable-next-line consistent-return
    this.checkUser(userObject, (error, user) => {
      if (error) {
        return cb(error);
      }
      const clientFilterObj = {
        client_code: userObject.client_code,
        secret: userObject.client_secret,
      };
      oauthAccessTokenService.generateToken(user, clientFilterObj, cb);
    });
  }

  /**
   * @description add data to db
   * @param {Object} userObject
   * @param {Function} cb
   */

  createUser(userObject = {}, cb) {
    const userObj = {
      first_name: userObject.first_name,
      last_name: userObject.last_name,
      email: userObject.email,
      encrypted_password: userObject.password,
    };

    this.create(userObj, cb);
  }

  /**
   * @description add data to db
   * @param {Object} userObject
   * @param {Function} cb
   */

  updateeUser(userObject = {}, cb) {
    const userObj = {
      first_name: userObject.first_name,
      last_name: userObject.last_name,
      email: userObject.email,
      profile: {
        about: userObject.about,
        address: userObject.address,
        contact: userObject.contact,
      },
      updated_at: Date.now(),
    };
    this.create(userObj, cb);
  }
}

export default new UserService();
