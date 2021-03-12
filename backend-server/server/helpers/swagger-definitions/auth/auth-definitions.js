/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-12 12:26:40
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-12 12:40:36
 */

/**
 * @swagger
 * definitions:
 *  AuthenticateRequest:
 *   type: object
 *   required:
 *     - email
 *     - password
 *     - client_code
 *     - client_secret
 *   properties:
 *    email:
 *     type: string
 *     description: user e-mail address
 *     example: 'user@gmail.com'
 *    password:
 *     type: string
 *     description: user login password
 *     example: 'user@123'
 *    client_code:
 *     type: string
 *     description: client code
 *     example: 'web'
 *    client_secret:
 *     type: string
 *     description: client secret code
 *     example: 'web@secret'
 */

/**
 * @swagger
 * definitions:
 *  SuccessLoadingResponse:
 *   type: object
 *   properties:
 *    access_token:
 *     type: string
 *     description: access token
 *     example: '<access_token>'
 *    refresh_token:
 *     type: string
 *     description: refresh toke
 *     example: '<refresh_token>'
 *    token_type:
 *     type: string
 *     description: Token type
 *     example: 'Bearer'
 *    expiresIn:
 *     type: number
 *     description: token expire time
 *     example: 36000
 */
