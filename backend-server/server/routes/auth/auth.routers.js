/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-05 22:16:12
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-12 13:00:35
 */

import express from 'express';

import authController from '../../http/controllers/auth/auth.controller';

import { loginValidate } from '../../http/requests/auth/auth.request';

const router = express.Router();

/**
 * @swagger
 * /api/token:
 *  parameters:
 *   - name: Content-Type
 *     in: header
 *     required: true
 *     schema:
 *       type: string
 *       example: 'application/json'
 *  post:
 *   tags:
 *       - Auth APIs
 *   summary: Authenticate user
 *   description: Authenticate user
 *   responseClass: User
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/AuthenticateRequest'
 *   responses:
 *    200:
 *     description: Login Success
 *     content:
 *       application/json:
 *         schema:
 *          $ref: '#/definitions/SuccessLoadingResponse'
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
router.route('/token').post(loginValidate, authController.token);

export default router;
