/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-07 21:28:10
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-07 23:07:37
 */
import express from 'express';

import postController from '../../http/controllers/post/post.controller';

import {
  createPostValidate,
  statusChangeValidate,
} from '../../http/requests/post/post.request';
import isAuth from '../../http/middleware/auth/isauth.middleware';

const router = express.Router();

router.route('/posts').post(createPostValidate, postController.create);
router.route('/posts').get(isAuth, postController.getAll);
router
  .route('/posts/:postID')
  .put(isAuth, createPostValidate, postController.update);

router.route('/posts/:postID').get(isAuth, postController.getCurrentPost);

router.route('/posts/:postID').delete(isAuth, postController.deletePost);
router
  .route('/posts/:postID/:status')
  .patch(isAuth, statusChangeValidate, postController.updateStatus);

router.param('postID', postController.getPostByID);

export default router;
