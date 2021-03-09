/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-08 18:12:20
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-08 18:45:33
 */

import express from 'express';

import permissionController from '../../http/controllers/user/permission.controller';

import { createPermissionValidate } from '../../http/requests/user/permission.request';
import isAuth from '../../http/middleware/auth/isauth.middleware';

const router = express.Router();

router
  .route('/permissions')
  .post(isAuth, createPermissionValidate, permissionController.create);

router.route('/permissions').get(isAuth, permissionController.getAll);

router
  .route('/permissions/:permissionsID')
  .put(isAuth, createPermissionValidate, permissionController.update);

router
  .route('/permissions/:permissionsID')
  .get(isAuth, permissionController.getCurrentPermission);

router.param('permissionsID', permissionController.getPermissionByID);

export default router;
