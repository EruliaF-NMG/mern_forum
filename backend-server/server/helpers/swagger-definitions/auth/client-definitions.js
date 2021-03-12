/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-06 22:03:42
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-12 13:01:53
 */

/**
 * @swagger
 * definitions:
 *  ClientCreateObject:
 *   type: object
 *   properties:
 *    name:
 *     type: string
 *     description: name of the api client
 *     example: 'mobile client'
 *    client_code:
 *     type: string
 *     description: unique code for api client
 *     example: 'mobile-001'
 *    secret:
 *     type: string
 *     description: unique secret key for api client
 *     example: 'mobile@secret'
 */

/**
 * @swagger
 * definitions:
 *  ClientObject:
 *   type: object
 *   properties:
 *    name:
 *     type: string
 *     description: name of the api client
 *     example: 'mobile client'
 *    client_code:
 *     type: string
 *     description: unique code for api client
 *     example: 'mobile-001'
 *    secret:
 *     type: string
 *     description: unique secret key for api client
 *     example: 'mobile@secret'
 *    revoked:
 *     type: boolean
 *     description: client revoked or not
 *     example: false
 *    updated:
 *     type: date-time
 *     description: Updated AT
 *     example: "2018-03-20T09:12:28Z"
 *    created:
 *     type: date-time
 *     description: Created AT
 *     example: "2018-03-20T09:12:28Z"
 */

/**
 * @swagger
 * definitions:
 *  ClientResponceList:
 *   type: array
 *   items:
 *    properties:
 *     schema:
 *      $ref: '#/definitions/ClientObject'
 */
