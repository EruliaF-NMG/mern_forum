/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-12 22:09:13
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-12 22:11:57
 */

/**
 * @swagger
 * definitions:
 *  RolesMapWithPermissionsObject:
 *   type: object
 *   properties:
 *    permissions:
 *     items:
 *       properties:
 *       type: string;
 *       example: '604a2c35675e504b423ec243'
 */

/**
 * @swagger
 * definitions:
 *  RoleObject:
 *   type: object
 *   properties:
 *    _id:
 *     type: string
 *     description: Permissions id
 *     example: '604a2c35675e504b423ec243'
 *    name:
 *     type: string
 *     description: Name
 *     example: 'Name'
 *    code:
 *     type: string
 *     description: Code
 *     example: 'Code'
 *    permissions:
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
