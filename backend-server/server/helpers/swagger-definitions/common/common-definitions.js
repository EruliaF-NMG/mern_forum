/**
 * @swagger
 * definitions:
 *  SuccessPostResponse:
 *   type: object
 *   properties:
 *    code:
 *     type: string
 *     example: 'SUCCESSFULLY_CREATED'
 *    message:
 *     type: string
 *     example: 'Resource Created Successfully'
 */

/**
 * @swagger
 * definitions:
 *  BadResponse:
 *   type: object
 *   properties:
 *    meta:
 *     type: object
 *     properties:
 *      code:
 *       type: string
 *       example: 'VALIDATION_ERROR'
 *      message:
 *       type: string
 *       example: 'Vlidation fired during execution'
 *    error:
 *      items:
 *       properties:
 *        property:
 *         type: string
 *         description: 'validation error form key'
 *         example: '<form-key>'
 *        message:
 *         type: string
 *         description: 'reason for error'
 *         example: '<Error Messsage>'
 */

/**
 * @swagger
 * definitions:
 *  SuccessPutResponse:
 *   type: object
 *   properties:
 *    code:
 *     type: string
 *     example: 'SUCCESSFULLY_UPDATED'
 *    message:
 *     type: string
 *     example: 'Resource updated successfully'
 */

/**
 * @swagger
 * definitions:
 *  NotFoundResponse:
 *   type: object
 *   properties:
 *    code:
 *     type: string
 *     example: 'NOT_FOUND'
 *    message:
 *     type: string
 *     example: 'Resource not fond'
 */

/**
 * @swagger
 * definitions:
 *  NotFoundResponse:
 *   type: object
 *   properties:
 *    code:
 *     type: string
 *     example: 'NOT_FOUND'
 *    message:
 *     type: string
 *     example: 'Resource not fond'
 */

/**
 * @swagger
 * definitions:
 *  SuccessGetResponse:
 *   type: object
 *   properties:
 *    code:
 *     type: string
 *     example: 'DATA_RECEIVED'
 *    message:
 *     type: string
 *     example: 'resource data successfully received'
 */

/**
 * @swagger
 * components:
 *  securitySchemes:
 *   bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 */

/**
 * @swagger
 * definitions:
 *  SuccessDeleteResponse:
 *   type: object
 *   properties:
 *    code:
 *     type: string
 *     example: 'SUCCESSFULLY_DELETED'
 *    message:
 *     type: string
 *     example: 'resource deleted successfully'
 */
