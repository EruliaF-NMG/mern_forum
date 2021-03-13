/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-07 08:33:52
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-13 18:40:47
 */
import mongoose from 'mongoose';
import CoreService from '../core-service';
import User from '../../models/user/user.model';
import oauthAccessTokenService from '../auth/oauth-access-token.service';
import { BasicRoleID } from '../../config/database-status';
import { asyncParallel } from '../../helpers/common-helpers/async-method-wrapper';
import { getInt } from '../../helpers/common-helpers/lodash.wrappers';

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
      roles: [mongoose.Types.ObjectId(BasicRoleID)],
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

  /**
   *
   * @param {*} filterObject
   * @param {*} cb
   */
  pagination(filterObject, cb) {
    const page = getInt(filterObject, 'page', 1);
    const limit = getInt(filterObject, 'limit', 10);

    const skip = page <= 1 ? 0 : limit * (page - 1);
    const query = {};

    if (filterObject.status) {
      query.status = filterObject.status !== '0';
    }

    if (filterObject.serachkey) {
      query.$or = [
        { first_name: { $regex: `.*${filterObject.serachkey}.*` } },
        { last_name: { $regex: `.*${filterObject.serachkey}.*` } },
      ];
    }

    asyncParallel(
      {
        getCount: (getCountCB) => {
          this.model.count(query, getCountCB);
        },
        getResult: (getResultCB) => {
          this.model.find(query).skip(skip).limit(limit).exec(getResultCB);
        },
      },
      (error, result) => {
        if (error) {
          cb(error);
        }
        cb(null, {
          current_page: page,
          total_pages: Math.ceil(result.getCount / limit),
          data: result.getResult,
          total_items: result.getCount,
          page_size: limit,
        });
      }
    );
  }
}

export default new UserService();
