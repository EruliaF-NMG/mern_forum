/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-07 09:57:05
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-07 18:17:24
 */

import express from 'express';

import userController from '../../http/controllers/user/user.controller';

import {
  createUserValidate,
  updateUserValidate,
} from '../../http/requests/user/user.request';
import isAuth from '../../http/middleware/auth/isauth.middleware';

const router = express.Router();

router.route('/users').post(createUserValidate, userController.create);
router.route('/users').get(isAuth, userController.getAllUsers);
router
  .route('/users/:userID')
  .put(isAuth, updateUserValidate, userController.update);
router.route('/users/:userID').get(isAuth, userController.getCurrentUser);

router.param('userID', userController.getUserByID);

export default router;
