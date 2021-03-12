/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-07 21:28:10
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-12 22:03:28
 */
import express from 'express';

import postController from '../../http/controllers/post/post.controller';
import commentController from '../../http/controllers/post/comment.controller';

import { createCommentValidate } from '../../http/requests/post/comment.request';
import isAuth from '../../http/middleware/auth/isauth.middleware';

const router = express.Router();

/**
 * @swagger
 * /api/posts/comments/{postID}:
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
 *  post:
 *   security:
 *      - bearerAuth: []
 *   tags:
 *      - Post Manage Apis
 *   summary: Add Comment to Post
 *   description: Add Comment to Post
 *   responseClass: Post
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/CommentCreateObject'
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
  .route('/posts/comments/:postID')
  .post(isAuth, createCommentValidate, commentController.create);

router.param('postID', postController.getPostByID);

export default router;
