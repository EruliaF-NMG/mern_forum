/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-07 09:57:05
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-13 23:04:44
 */

import express from 'express';

import userController from '../../http/controllers/user/user.controller';

import {
  createUserValidate,
  updateUserValidate,
  setRolesValidate,
  statusChangeValidate,
} from '../../http/requests/user/user.request';
import isAuth from '../../http/middleware/auth/isauth.middleware';
import { isProfileEditBySameUser } from '../../http/middleware/auth/isAcctionDoneBySameUser.middleware';
import isRole from '../../http/middleware/auth/isRole.middleware';
import { fileUpload } from '../../http/middleware/file-upload/multipartFrom';
import { roleCodes } from '../../config/database-status';

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *  parameters:
 *   - name: Content-Type
 *     in: header
 *     required: true
 *     schema:
 *       type: string
 *       example: 'application/json'
 *  post:
 *   tags:
 *       - User Manage Apis
 *   summary: Create User
 *   description: api for create new user
 *   responseClass: User
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/UserCreateObject'
 *   responses:
 *    201:
 *     description: User Successfully created
 *     content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *            meta:
 *                $ref: '#/definitions/SuccessPostResponse'
 *            data:
 *                $ref: '#/definitions/UserObject'
 *    400:
 *     description: validation Errors
 *     content:
 *       application/json:
 *         schema:
 *          $ref: '#/definitions/BadResponse'
 *    401:
 *     description: Unauthorized User
 *     content:
 *         schema:
 *          type: string
 *          example: 'Unauthorized'
 */
router.route('/users').post(createUserValidate, userController.create);

/**
 * @swagger
 * /api/users/{userID}:
 *  parameters:
 *   - name: Content-Type
 *     in: header
 *     required: true
 *     schema:
 *       type: string
 *       example: 'application/json'
 *   - name: userID
 *     in: path
 *     required: true
 *     schema:
 *       type: string
 *       example: '<User-ID>'
 *  put:
 *   security:
 *      - bearerAuth: []
 *   tags:
 *      - User Manage Apis
 *   summary: Edit User
 *   description: Edit api for edit user
 *   responseClass: USer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/UserEditObject'
 *   responses:
 *    200:
 *     description: User Successfully updated
 *     content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *            meta:
 *                $ref: '#/definitions/SuccessPutResponse'
 *            data:
 *                $ref: '#/definitions/UserObject'
 *    400:
 *     description: validation Errors
 *     content:
 *       application/json:
 *         schema:
 *          $ref: '#/definitions/BadResponse'
 *    401:
 *     description: Unauthorized User
 *     content:
 *         schema:
 *          type: string
 *          example: 'Unauthorized'
 *    404:
 *     description: validation Errors
 *     content:
 *       application/json:
 *         schema:
 *          $ref: '#/definitions/NotFoundResponse'
 */
router
  .route('/users/:userID')
  .put(
    isAuth,
    isProfileEditBySameUser,
    updateUserValidate,
    userController.update
  );

/**
 * @swagger
 * /api/users/{userID}:
 *  parameters:
 *   - name: Content-Type
 *     in: header
 *     required: true
 *     schema:
 *       type: string
 *       example: 'application/json'
 *   - name: userID
 *     in: path
 *     required: true
 *     schema:
 *       type: string
 *       example: '<User-ID>'
 *  get:
 *   security:
 *      - bearerAuth: []
 *   tags:
 *       - User Manage Apis
 *   summary: Get User By ID
 *   description: get user information by user id
 *   responseClass: User
 *   responses:
 *    200:
 *     description: User data successfully received
 *     content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *            meta:
 *                $ref: '#/definitions/SuccessGetResponse'
 *            data:
 *                $ref: '#/definitions/UserObject'
 *    401:
 *     description: Unauthorized User
 *     content:
 *         schema:
 *          type: string
 *          example: 'Unauthorized'
 *    404:
 *     description: validation Errors
 *     content:
 *       application/json:
 *         schema:
 *          $ref: '#/definitions/NotFoundResponse'
 */
router
  .route('/users/:userID')
  .get(isAuth, isProfileEditBySameUser, userController.getCurrentUser);

/**
 * @swagger
 * /api/users:
 *  parameters:
 *   - name: Content-Type
 *     in: header
 *     required: true
 *     schema:
 *       type: string
 *       example: 'application/json'
 *  get:
 *   security:
 *      - bearerAuth: []
 *   tags:
 *       - User Manage Apis
 *   summary: Get User List
 *   description: get user information
 *   responseClass: User
 *   responses:
 *    200:
 *     description: User data successfully received
 *     content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *            meta:
 *                $ref: '#/definitions/SuccessGetResponse'
 *            data:
 *              items:
 *                $ref: '#/definitions/UserObject'
 *    401:
 *     description: Unauthorized User
 *     content:
 *         schema:
 *          type: string
 *          example: 'Unauthorized'
 *    404:
 *     description: validation Errors
 *     content:
 *       application/json:
 *         schema:
 *          $ref: '#/definitions/NotFoundResponse'
 */
router
  .route('/users')
  .get(isAuth, isRole(roleCodes.admin), userController.getAllUsers);

/**
 * @swagger
 * /api/users/set-user-image/{userID}:
 *  parameters:
 *   - name: Content-Type
 *     in: header
 *     required: true
 *     schema:
 *       type: string
 *       example: 'application/json'
 *   - name: userID
 *     in: path
 *     required: true
 *     schema:
 *       type: string
 *       example: '<User-ID>'
 *  post:
 *   security:
 *      - bearerAuth: []
 *   tags:
 *       - User Manage Apis
 *   summary: Upload User Profile Image
 *   description: Upload User Profile Image
 *   responseClass: User
 *   requestBody:
 *    content:
 *     multipart/form-data:
 *      schema:
 *       type: object
 *       properties:
 *         profileImage:
 *           type: string
 *           format: binary
 *   responses:
 *    200:
 *     description: User profile image successfully uploaded
 *     content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *            meta:
 *                $ref: '#/definitions/SuccessPutResponse'
 *            data:
 *                $ref: '#/definitions/UserObject'
 *    400:
 *     description: validation Errors
 *     content:
 *       application/json:
 *         schema:
 *          $ref: '#/definitions/BadResponse'
 *    401:
 *     description: Unauthorized User
 *     content:
 *         schema:
 *          type: string
 *          example: 'Unauthorized'
 *    404:
 *     description: validation Errors
 *     content:
 *       application/json:
 *         schema:
 *          $ref: '#/definitions/NotFoundResponse'
 */
router
  .route('/users/set-user-image/:userID')
  .post(
    isAuth,
    isProfileEditBySameUser,
    fileUpload.single('profileImage'),
    userController.uploadProfilePic
  );

/**
 * @swagger
 * /api/users/get-user-image/{userID}:
 *  parameters:
 *   - name: Content-Type
 *     in: header
 *     required: true
 *     schema:
 *       type: string
 *       example: 'application/json'
 *   - name: userID
 *     in: path
 *     required: true
 *     schema:
 *       type: string
 *       example: '<User-ID>'
 *  get:
 *   tags:
 *       - User Manage Apis
 *   summary: Get User Profile Image By ID
 *   description: Get User Profile Image By ID
 *   responseClass: User
 *   responses:
 *    200:
 *     description: User image in Image format
 *     content:
 *       image/png:
 *         schema:
 *          type: object
 *          format: binary
 *    404:
 *     description: validation Errors
 *     content:
 *       application/json:
 *         schema:
 *          $ref: '#/definitions/NotFoundResponse'
 */
router
  .route('/users/get-user-image/:userID')
  .get(userController.getUserProfileImage, userController.defaultProfileImage);

/**
 * @swagger
 * /users/set-roles/{userID}:
 *  parameters:
 *   - name: Content-Type
 *     in: header
 *     required: true
 *     schema:
 *       type: string
 *       example: 'application/json'
 *   - name: userID
 *     in: path
 *     required: true
 *     schema:
 *       type: string
 *       example: '<User-ID>'
 *  patch:
 *   security:
 *      - bearerAuth: []
 *   tags:
 *      - User Manage Apis
 *   summary: Set Roles to user
 *   description: Set Roles to user
 *   responseClass: User
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *        type: object
 *        properties:
 *          roles:
 *            items:
 *              properties:
 *              type: string;
 *              example: '604a2c35675e504b423ec243'
 *   responses:
 *    200:
 *     description: Roles successfully assigned to user
 *     content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *            meta:
 *                $ref: '#/definitions/SuccessPutResponse'
 *            data:
 *                $ref: '#/definitions/UserObject'
 *    400:
 *     description: validation Errors
 *     content:
 *       application/json:
 *         schema:
 *          $ref: '#/definitions/BadResponse'
 *    401:
 *     description: Unauthorized User
 *     content:
 *         schema:
 *          type: string
 *          example: 'Unauthorized'
 *    404:
 *     description: validation Errors
 *     content:
 *       application/json:
 *         schema:
 *          $ref: '#/definitions/NotFoundResponse'
 */
router
  .route('/users/set-roles/:userID')
  .patch(
    isAuth,
    isRole(roleCodes.admin),
    setRolesValidate,
    userController.setRoles
  );

/**
 * @swagger
 * /api/users/status-change/{userID}/{status}:
 *  parameters:
 *   - name: Content-Type
 *     in: header
 *     required: true
 *     schema:
 *       type: string
 *       example: 'application/json'
 *   - name: userID
 *     in: path
 *     required: true
 *     schema:
 *       type: string
 *       example: '<User-ID>'
 *   - name: status
 *     in: path
 *     required: true
 *     schema:
 *       type: string
 *       enum: ['0', '1']
 *  patch:
 *   security:
 *      - bearerAuth: []
 *   tags:
 *      - User Manage Apis
 *   summary: Change User Status
 *   description: Change User Status
 *   responseClass: User
 *   responses:
 *    200:
 *     description: User Successfully updated
 *     content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *            meta:
 *                $ref: '#/definitions/SuccessPutResponse'
 *            data:
 *                $ref: '#/definitions/UserObject'
 *    401:
 *     description: Unauthorized User
 *     content:
 *         schema:
 *          type: string
 *          example: 'Unauthorized'
 *    404:
 *     description: validation Errors
 *     content:
 *       application/json:
 *         schema:
 *          $ref: '#/definitions/NotFoundResponse'
 */
router
  .route('/users/status-change/:userID/:status')
  .patch(
    isAuth,
    isRole(roleCodes.admin),
    statusChangeValidate,
    userController.statusChange
  );

router.param('userID', userController.getUserByID);

export default router;
