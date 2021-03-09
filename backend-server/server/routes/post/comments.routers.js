/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-07 21:28:10
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-08 10:17:06
 */
import express from 'express';

import postController from '../../http/controllers/post/post.controller';
import commentController from '../../http/controllers/post/comment.controller';

import { createCommentValidate } from '../../http/requests/post/comment.request';
import isAuth from '../../http/middleware/auth/isauth.middleware';

const router = express.Router();

router
  .route('/comments/:postID')
  .post(isAuth, createCommentValidate, commentController.create);

router.param('postID', postController.getPostByID);

export default router;
