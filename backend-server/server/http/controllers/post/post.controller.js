/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-07 19:24:04
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-08 11:11:14
 */

import postService from '../../../services/post/post.service';
import {
  generateResponseFn,
  generateErrorResponseFn,
} from '../../../helpers/common-helpers/common-methods';
import {
  successPostResponse,
  successGetResponse,
  failedPostResponse,
  notFoundResponse,
  exceptionOccurredResponse,
} from '../../../config/api-response.config';
import { postStatus } from '../../../config/database-status';
import { get } from '../../../helpers/common-helpers/lodash.wrappers';

const create = (req, res) => {
  const formObject = req.validatedFromObject;
  formObject.status = postStatus.PENDING; // Todo
  formObject.created_by = get(req, 'authUser._id', null);

  postService.createPost(formObject, (error, user) => {
    if (error) {
      return res
        .status(failedPostResponse.httpStatus)
        .json(
          generateErrorResponseFn(
            failedPostResponse,
            error,
            'unable to create your post'
          )
        );
    }
    return res
      .status(successPostResponse.httpStatus)
      .json(
        generateResponseFn(
          successPostResponse,
          user,
          'Post created successfully'
        )
      );
  });
};

const update = (req, res) => {
  const post = req.currentPost;
  post.heading = req.validatedFromObject.heading;
  post.content = req.validatedFromObject.content;
  post.tags = req.validatedFromObject.tags;
  post.updated_by = get(req, 'authUser._id', undefined);
  post.updated_at = Date.now();

  post.save(post, (error, postObj) => {
    if (error) {
      return res
        .status(failedPostResponse.httpStatus)
        .json(
          generateErrorResponseFn(
            failedPostResponse,
            error,
            'unable to update your post'
          )
        );
    }
    return res
      .status(successPostResponse.httpStatus)
      .json(
        generateResponseFn(
          successPostResponse,
          postObj,
          'post updated successfully'
        )
      );
  });
};

const getAll = (req, res) => {
  postService.pagination(req.query, (error, users) => {
    if (error) {
      return res
        .status(exceptionOccurredResponse.httpStatus)
        .json(
          generateErrorResponseFn(
            exceptionOccurredResponse,
            error,
            'user list not found'
          )
        );
    }

    res
      .status(successGetResponse.httpStatus)
      .json(generateResponseFn(successGetResponse, users));
  });
};

const getCurrentPost = (req, res) => {
  res
    .status(successGetResponse.httpStatus)
    .json(generateResponseFn(successGetResponse, req.currentPost));
};

const getPostByID = (req, res, next, id) => {
  postService.findByID(id, (error, post) => {
    if (error) {
      return res
        .status(notFoundResponse.httpStatus)
        .json(
          generateErrorResponseFn(
            notFoundResponse,
            error,
            'selected post not found'
          )
        );
    }
    req.currentPost = post;
    next();
  });
};

const deletePost = (req, res) => {
  const formObject = {
    deleted_by: get(req, 'authUser._id', undefined),
    deleted_at: Date.now(),
  };
  postService.updatePost(
    get(req, 'currentPost._id', null),
    formObject,
    (error, post) => {
      if (error) {
        return res
          .status(failedPostResponse.httpStatus)
          .json(
            generateErrorResponseFn(
              failedPostResponse,
              error,
              'unable to remove post'
            )
          );
      }
      return res
        .status(successPostResponse.httpStatus)
        .json(
          generateResponseFn(
            successPostResponse,
            post,
            'post removed successfully'
          )
        );
    }
  );
};

const updateStatus = (req, res) => {
  const formObject = {
    status: req.params.status,
    updated_by: get(req, 'authUser._id', undefined),
    updated_at: Date.now(),
  };
  postService.updatePost(
    get(req, 'currentPost._id', null),
    formObject,
    (error, post) => {
      if (error) {
        return res
          .status(failedPostResponse.httpStatus)
          .json(
            generateErrorResponseFn(
              failedPostResponse,
              error,
              'unable to update post status'
            )
          );
      }
      return res
        .status(successPostResponse.httpStatus)
        .json(
          generateResponseFn(
            successPostResponse,
            post,
            'post status successfully changed'
          )
        );
    }
  );
};

export default {
  create,
  update,
  getAll,
  getPostByID,
  getCurrentPost,
  deletePost,
  updateStatus,
};