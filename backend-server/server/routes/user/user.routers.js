/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-07 09:57:05
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-11 21:28:12
 */

import express from 'express';

import userController from '../../http/controllers/user/user.controller';

import {
  createUserValidate,
  updateUserValidate,
  setRolesValidate,
} from '../../http/requests/user/user.request';
import isAuth from '../../http/middleware/auth/isauth.middleware';
import { fileUpload } from '../../http/middleware/file-upload/multipartFrom';

const router = express.Router();

router.route('/users').post(createUserValidate, userController.create);
router.route('/users').get(isAuth, userController.getAllUsers);
router
  .route('/users/:userID')
  .put(isAuth, updateUserValidate, userController.update);
router.route('/users/:userID').get(isAuth, userController.getCurrentUser);

router
  .route('/set-user-image/:userID')
  .post(
    isAuth,
    fileUpload.single('profileImage'),
    userController.uploadProfilePic
  );

router
  .route('/get-user-image/:userID')
  .get(userController.getUserProfileImage, userController.defaultProfileImage);

router
  .route('/set-roles-to-user/:userID')
  .patch(isAuth, setRolesValidate, userController.setRoles);

router.param('userID', userController.getUserByID);

export default router;
