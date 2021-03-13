/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-08 18:12:20
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-13 23:19:11
 */

import express from 'express';

import permissionController from '../../http/controllers/user/permission.controller';

import { createPermissionValidate } from '../../http/requests/user/permission.request';
import isAuth from '../../http/middleware/auth/isauth.middleware';
import { roleCodes } from '../../config/database-status';
import isRole from '../../http/middleware/auth/isRole.middleware';

const router = express.Router();

/**
 * @swagger
 * /api/permissions:
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
 *       - Manage Permissions Apis
 *   summary: Create Permissions
 *   description: api for create new Permissions
 *   responseClass: Permissions
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/RolePermissionsCreateObject'
 *   responses:
 *    201:
 *     description: Permissions Successfully created
 *     content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *            meta:
 *                $ref: '#/definitions/SuccessPostResponse'
 *            data:
 *                $ref: '#/definitions/PermissionsObject'
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
router
  .route('/permissions')
  .post(
    isAuth,
    isRole(roleCodes.admin),
    createPermissionValidate,
    permissionController.create
  );

/**
 * @swagger
 * /api/permissions:
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
 *       - Manage Permissions Apis
 *   summary: Get Permissions List
 *   description: get all Permissions
 *   responseClass: Permissions
 *   responses:
 *    200:
 *     description: Permissions data successfully received
 *     content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *            meta:
 *                $ref: '#/definitions/SuccessGetResponse'
 *            data:
 *              items:
 *                $ref: '#/definitions/PermissionsObject'
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
  .route('/permissions')
  .get(isAuth, isRole(roleCodes.admin), permissionController.getAll);

/**
 * @swagger
 * /api/permissions/{permissionsID}:
 *  parameters:
 *   - name: Content-Type
 *     in: header
 *     required: true
 *     schema:
 *       type: string
 *       example: 'application/json'
 *   - name: permissionsID
 *     in: path
 *     required: true
 *     schema:
 *       type: string
 *       example: '<Permissions-ID>'
 *  put:
 *   security:
 *      - bearerAuth: []
 *   tags:
 *      - Manage Permissions Apis
 *   summary: Edit Permissions
 *   description: Edit api for edit Permissions
 *   responseClass: Permissions
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/RolePermissionsCreateObject'
 *   responses:
 *    200:
 *     description: Permissions Successfully updated
 *     content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *            meta:
 *                $ref: '#/definitions/SuccessPutResponse'
 *            data:
 *                $ref: '#/definitions/PermissionsObject'
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
  .route('/permissions/:permissionsID')
  .put(
    isAuth,
    isRole(roleCodes.admin),
    createPermissionValidate,
    permissionController.update
  );

/**
 * @swagger
 * /api/permissions/{permissionsID}:
 *  parameters:
 *   - name: Content-Type
 *     in: header
 *     required: true
 *     schema:
 *       type: string
 *       example: 'application/json'
 *   - name: permissionsID
 *     in: path
 *     required: true
 *     schema:
 *       type: string
 *       example: '<Permissions-ID>'
 *  get:
 *   security:
 *      - bearerAuth: []
 *   tags:
 *       - Manage Permissions Apis
 *   summary: Get Permissions By ID
 *   description: get Permissions information by Permissions id
 *   responseClass: Permissions
 *   responses:
 *    200:
 *     description: Permissions data successfully received
 *     content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *            meta:
 *                $ref: '#/definitions/SuccessGetResponse'
 *            data:
 *                $ref: '#/definitions/PermissionsObject'
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
  .route('/permissions/:permissionsID')
  .get(
    isAuth,
    isRole(roleCodes.admin),
    permissionController.getCurrentPermission
  );

router.param('permissionsID', permissionController.getPermissionByID);

export default router;
