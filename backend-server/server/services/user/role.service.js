/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-07 08:33:52
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-08 18:08:23
 */

import CoreService from '../core-service';
import Permission from '../../models/user/permission.model';

class RoleService extends CoreService {
  constructor() {
    super(Permission);
  }

  /**
   * @description add data to db
   * @param {Object} roleObject
   * @param {Function} cb
   */

  createRole(roleObject = {}, cb) {
    this.create(roleObject, cb);
  }
}

export default new RoleService();
