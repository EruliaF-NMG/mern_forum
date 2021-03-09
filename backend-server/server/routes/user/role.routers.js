/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-08 18:12:20
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-08 18:25:20
 */

import express from 'express';

import roleController from '../../http/controllers/user/role.controller';

import { createRoleValidate } from '../../http/requests/user/role.request';
import isAuth from '../../http/middleware/auth/isauth.middleware';

const router = express.Router();

router.route('/roles').post(isAuth, createRoleValidate, roleController.create);

router.route('/roles').get(isAuth, roleController.getAll);

router
  .route('/roles/:roleID')
  .put(isAuth, createRoleValidate, roleController.update);

router.route('/roles/:roleID').get(isAuth, roleController.getCurrentRole);

router.param('roleID', roleController.getRoleByID);

export default router;
