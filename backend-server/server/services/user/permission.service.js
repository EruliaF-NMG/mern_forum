/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-07 08:33:52
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-08 18:00:35
 */

import CoreService from '../core-service';
import Permission from '../../models/user/permission.model';

class PermissionService extends CoreService {
  constructor() {
    super(Permission);
  }

  /**
   * @description add data to db
   * @param {Object} permissionObject
   * @param {Function} cb
   */

  createPermission(permissionObject = {}, cb) {
    this.create(permissionObject, cb);
  }

  /**
   * @description update data to db
   * @param {Object} permissionObject
   * @param {Function} cb
   */

  updateePermission(permissionObject = {}, cb) {
    this.create(permissionObject, cb);
  }
}

export default new PermissionService();
