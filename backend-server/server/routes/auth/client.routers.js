/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-05 22:16:12
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-12 21:38:18
 */

import express from 'express';

import clientController from '../../http/controllers/auth/client.controller';

import { createClientValidate } from '../../http/requests/auth/client.request';

const router = express.Router();

/**
 * @swagger
 * /api/clients:
 *  parameters:
 *   - name: Content-Type
 *     in: header
 *     required: true
 *     schema:
 *       type: string
 *       example: 'application/json'
 *  post:
 *   tags:
 *       - Auth Client Apis
 *   summary: create api Client
 *   description: create api client for access apis
 *   responseClass: Client
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/ClientCreateObject'
 *   responses:
 *    201:
 *     description: newly created Client object
 *     content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *            meta:
 *                $ref: '#/definitions/SuccessPostResponse'
 *            data:
 *                $ref: '#/definitions/ClientObject'
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
router.route('/clients').post(createClientValidate, clientController.create);

export default router;
