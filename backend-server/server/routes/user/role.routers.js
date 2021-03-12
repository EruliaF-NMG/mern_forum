/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-08 18:12:20
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-12 22:24:52
 */

import express from 'express';

import roleController from '../../http/controllers/user/role.controller';

import {
  createRoleValidate,
  setPermissionsValidate,
} from '../../http/requests/user/role.request';
import isAuth from '../../http/middleware/auth/isauth.middleware';

const router = express.Router();

/**
 * @swagger
 * /api/roles:
 *  parameters:
 *   - name: Content-Type
 *     in: header
 *     required: true
 *     schema:
 *       type: string
 *       example: 'application/json'
 *  post:
 *   security:
 *      - bearerAuth: []
 *   tags:
 *       - Manage Roles Apis
 *   summary: Create Roles
 *   description: api for create new Roles
 *   responseClass: Roles
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/RolePermissionsCreateObject'
 *   responses:
 *    201:
 *     description: Roles Successfully created
 *     content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *            meta:
 *                $ref: '#/definitions/SuccessPostResponse'
 *            data:
 *                $ref: '#/definitions/RoleObject'
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
router.route('/roles').post(isAuth, createRoleValidate, roleController.create);

// Todo
router.route('/roles').get(isAuth, roleController.getAll);

/**
 * @swagger
 * /api/roles/{roleID}:
 *  parameters:
 *   - name: Content-Type
 *     in: header
 *     required: true
 *     schema:
 *       type: string
 *       example: 'application/json'
 *   - name: roleID
 *     in: path
 *     required: true
 *     schema:
 *       type: string
 *       example: '<Role-ID>'
 *  put:
 *   security:
 *      - bearerAuth: []
 *   tags:
 *      - Manage Roles Apis
 *   summary: Edit Role
 *   description: Edit api for edit Role
 *   responseClass: Role
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/RolePermissionsCreateObject'
 *   responses:
 *    200:
 *     description: Role Successfully updated
 *     content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *            meta:
 *                $ref: '#/definitions/SuccessPutResponse'
 *            data:
 *                $ref: '#/definitions/RoleObject'
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
  .route('/roles/:roleID')
  .put(isAuth, createRoleValidate, roleController.update);

/**
 * @swagger
 * /api/roles/{roleID}:
 *  parameters:
 *   - name: Content-Type
 *     in: header
 *     required: true
 *     schema:
 *       type: string
 *       example: 'application/json'
 *   - name: roleID
 *     in: path
 *     required: true
 *     schema:
 *       type: string
 *       example: '<Role-ID>'
 *  get:
 *   security:
 *      - bearerAuth: []
 *   tags:
 *       - Manage Roles Apis
 *   summary: Get Roles By ID
 *   description: get Roles information by Roles id
 *   responseClass: Roles
 *   responses:
 *    200:
 *     description: Roles data successfully received
 *     content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *            meta:
 *                $ref: '#/definitions/SuccessGetResponse'
 *            data:
 *                $ref: '#/definitions/RoleObject'
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
router.route('/roles/:roleID').get(isAuth, roleController.getCurrentRole);

/**
 * @swagger
 * /api/roles/set-permissions/{roleID}:
 *  parameters:
 *   - name: Content-Type
 *     in: header
 *     required: true
 *     schema:
 *       type: string
 *       example: 'application/json'
 *   - name: roleID
 *     in: path
 *     required: true
 *     schema:
 *       type: string
 *       example: '<Role-ID>'
 *  patch:
 *   security:
 *      - bearerAuth: []
 *   tags:
 *      - Manage Roles Apis
 *   summary: Attach permission to role
 *   description: Attach permission to role
 *   responseClass: Role
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/RolesMapWithPermissionsObject'
 *   responses:
 *    200:
 *     description: Role Successfully updated
 *     content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *            meta:
 *                $ref: '#/definitions/SuccessPutResponse'
 *            data:
 *                $ref: '#/definitions/RoleObject'
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
  .route('/roles/set-permissions/:roleID')
  .patch(isAuth, setPermissionsValidate, roleController.setPermissions);

router.param('roleID', roleController.getRoleByID);

export default router;
