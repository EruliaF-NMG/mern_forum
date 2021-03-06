/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-05 22:16:12
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-05 23:21:14
 */

import express from 'express';

import testController from '../../http/controllers/test/test.controller';

const router = express.Router();

/**
 * @swagger
 * definitions:
 *  Employee:
 *   type: object
 *   properties:
 *    name:
 *     type: string
 *     description: name of the employee
 *     example: 'Jayaramachandran'
 *    date_of_joining:
 *     type: string
 *     description: date of joining of the employee
 *     example: '2020-08-30'
 *    email:
 *     type: string
 *     description: email of the employee
 *     example: 'jayaramachandran@whizpath.com'
 *    gender:
 *     type: string
 *     description: gender of the employee
 *     example: 'male'
 *    bio:
 *     type: string
 *     description: biography of the employee
 *     example: 'father, software developer'
 *    designation:
 *     type: string
 *     description: designation of the employee
 *     example: 'Software Engineer'
 */

/**
 * @swagger
 * /api/test:
 *  parameters:
 *   - name: Content-Type
 *     in: header
 *     required: true
 *     schema:
 *       type: string
 *       example: 'application/json'
 *  post:
 *   summary: create employee
 *   description: create employee for the organisation
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Employee'
 *   responses:
 *    200:
 *     description: employee created succesfully
 *    500:
 *     description: failure in creating employee
 */
router.route('/test').post(testController.test1);

export default router;
