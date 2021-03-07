/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-05 22:16:12
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-06 22:21:03
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
 *       - Master Apis
 *   summary: create api Client
 *   description: create api client for access apis
 *   responseClass: Client
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/ClientCreateObject'
 *   responses:
 *    200:
 *     description: newly created Client object
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/definitions/ClientResponseObject'
 *    500:
 *     description: failure in creating employee
 */
router.route('/clients').post(createClientValidate, clientController.create);

export default router;
