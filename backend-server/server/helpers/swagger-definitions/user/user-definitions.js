/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-12 13:20:46
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-12 14:04:59
 */

/**
 * @swagger
 * definitions:
 *  UserCreateObject:
 *   type: object
 *   properties:
 *    first_name:
 *     type: string
 *     description: User First Name
 *     example: 'Nisal'
 *    last_name:
 *     type: string
 *     description: User Last name
 *     example: 'Gunawardana'
 *    email:
 *     type: string
 *     description: User E-mail address
 *     example: 'user@gmail.com'
 *    password:
 *     type: string
 *     description: login password
 *     example: 'user@123'
 */

/**
 * @swagger
 * definitions:
 *  UserEditObject:
 *   type: object
 *   properties:
 *    first_name:
 *     type: string
 *     description: User First Name
 *     example: 'Nisal'
 *    last_name:
 *     type: string
 *     description: User Last name
 *     example: 'Gunawardana'
 *    about:
 *     type: string
 *     description: about user
 *     example: 'Hi....'
 *    address:
 *     type: string
 *     description: User address
 *     example: '12/2,Colombo Road,Colombo.'
 *    contact:
 *     type: string
 *     description: User contact number
 *     example: '0724062503'
 */

/**
 * @swagger
 * definitions:
 *  UserProfileObject:
 *   type: object
 *   properties:
 *    _id:
 *     type: string
 *     description: user id
 *     example: '604a2c35675e504b423ec243'
 *    about:
 *     type: string
 *     description: about user
 *     example: 'Hi....'
 *    address:
 *     type: string
 *     description: User address
 *     example: '12/2,Colombo Road,Colombo.'
 *    contact:
 *     type: string
 *     description: User contact number
 *     example: '0724062503'
 *    updated_at:
 *     type: date-time
 *     description: Updated AT
 *     example: "2018-03-20T09:12:28Z"
 *    created_at:
 *     type: date-time
 *     description: Created AT
 *     example: "2018-03-20T09:12:28Z"
 */

/**
 * @swagger
 * definitions:
 *  UserObject:
 *   type: object
 *   properties:
 *    _id:
 *     type: string
 *     description: user id
 *     example: '604a2c35675e504b423ec243'
 *    first_name:
 *     type: string
 *     description: User First Name
 *     example: 'Nisal'
 *    last_name:
 *     type: string
 *     description: User Last name
 *     example: 'Gunawardana'
 *    email:
 *     type: string
 *     description: User E-mail address
 *     example: 'user@gmail.com'
 *    status:
 *     type: boolean
 *     description: User Is active or In-active
 *     example: false
 *    profile:
 *     $ref: '#/definitions/UserProfileObject'
 *    roles:
 *     items:
 *       properties:
 *       type: string;
 *       example: '604a2c35675e504b423ec243'
 *    updated_at:
 *     type: date-time
 *     description: Updated AT
 *     example: "2018-03-20T09:12:28Z"
 *    created_at:
 *     type: date-time
 *     description: Created AT
 *     example: "2018-03-20T09:12:28Z"
 */
