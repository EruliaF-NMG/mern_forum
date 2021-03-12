/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-07 21:28:10
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-12 22:03:26
 */
import express from 'express';

import postController from '../../http/controllers/post/post.controller';

import {
  createPostValidate,
  statusChangeValidate,
} from '../../http/requests/post/post.request';
import isAuth from '../../http/middleware/auth/isauth.middleware';

const router = express.Router();
/**
 * @swagger
 * /api/posts:
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
 *       - Post Manage Apis
 *   summary: Create Post
 *   description: api for create new Post
 *   responseClass: Post
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/PostCreateObject'
 *   responses:
 *    201:
 *     description: Post Successfully created
 *     content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *            meta:
 *                $ref: '#/definitions/SuccessPostResponse'
 *            data:
 *                $ref: '#/definitions/PostObject'
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
router.route('/posts').post(isAuth, createPostValidate, postController.create);

// Todo
router.route('/posts').get(isAuth, postController.getAll);

/**
 * @swagger
 * /api/posts/{postID}:
 *  parameters:
 *   - name: Content-Type
 *     in: header
 *     required: true
 *     schema:
 *       type: string
 *       example: 'application/json'
 *   - name: postID
 *     in: path
 *     required: true
 *     schema:
 *       type: string
 *       example: '<post-ID>'
 *  put:
 *   security:
 *      - bearerAuth: []
 *   tags:
 *      - Post Manage Apis
 *   summary: Edit Post
 *   description: Edit api for edit post
 *   responseClass: Post
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/PostCreateObject'
 *   responses:
 *    200:
 *     description: Post Successfully updated
 *     content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *            meta:
 *                $ref: '#/definitions/SuccessPutResponse'
 *            data:
 *                $ref: '#/definitions/PostObject'
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
  .route('/posts/:postID')
  .put(isAuth, createPostValidate, postController.update);

/**
 * @swagger
 * /api/posts/{postID}:
 *  parameters:
 *   - name: Content-Type
 *     in: header
 *     required: true
 *     schema:
 *       type: string
 *       example: 'application/json'
 *   - name: postID
 *     in: path
 *     required: true
 *     schema:
 *       type: string
 *       example: '<Post-ID>'
 *  get:
 *   security:
 *      - bearerAuth: []
 *   tags:
 *       - Post Manage Apis
 *   summary: Get Post By ID
 *   description: get post information by post id
 *   responseClass: Post
 *   responses:
 *    200:
 *     description: Post data successfully received
 *     content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *            meta:
 *                $ref: '#/definitions/SuccessGetResponse'
 *            data:
 *                $ref: '#/definitions/PostObject'
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
router.route('/posts/:postID').get(isAuth, postController.getCurrentPost);

/**
 * @swagger
 * /api/posts/{postID}:
 *  parameters:
 *   - name: Content-Type
 *     in: header
 *     required: true
 *     schema:
 *       type: string
 *       example: 'application/json'
 *   - name: postID
 *     in: path
 *     required: true
 *     schema:
 *       type: string
 *       example: '<Post-ID>'
 *  delete:
 *   security:
 *      - bearerAuth: []
 *   tags:
 *       - Post Manage Apis
 *   summary: Soft Delete Post By ID
 *   description: Delete post by post id
 *   responseClass: Post
 *   responses:
 *    200:
 *     description: Post data successfully removed
 *     content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *            meta:
 *                $ref: '#/definitions/SuccessDeleteResponse'
 *            data:
 *              type: object
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
router.route('/posts/:postID').delete(isAuth, postController.deletePost);

/**
 * @swagger
 * /api/posts/{postID}/{status}:
 *  parameters:
 *   - name: Content-Type
 *     in: header
 *     required: true
 *     schema:
 *       type: string
 *       example: 'application/json'
 *   - name: postID
 *     in: path
 *     required: true
 *     schema:
 *       type: string
 *       example: '<post-ID>'
 *   - name: status
 *     in: path
 *     required: true
 *     schema:
 *       type: string
 *       enum: [PENDING, APPROVED,BLOCKED]
 *  patch:
 *   security:
 *      - bearerAuth: []
 *   tags:
 *      - Post Manage Apis
 *   summary: Change Post Status
 *   description: Change Post Status
 *   responseClass: Post
 *   responses:
 *    200:
 *     description: Post Successfully updated
 *     content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *            meta:
 *                $ref: '#/definitions/SuccessPutResponse'
 *            data:
 *                $ref: '#/definitions/PostObject'
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
  .route('/posts/:postID/:status')
  .patch(isAuth, statusChangeValidate, postController.updateStatus);

router.param('postID', postController.getPostByID);

export default router;
