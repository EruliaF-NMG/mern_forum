/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-07 19:24:04
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-14 14:06:20
 */

import postService from '../../../services/post/post.service';
import {
  generateResponseFn,
  generateErrorResponseFn,
  generatePaginationResponseFn,
} from '../../../helpers/common-helpers/common-methods';
import {
  successPostResponse,
  successGetResponse,
  failedPostResponse,
  notFoundResponse,
  exceptionOccurredResponse,
  successDeleteResponse,
  failedDeleteResponse,
} from '../../../config/api-response.config';
import { postStatus, roleCodes } from '../../../config/database-status';
import { get } from '../../../helpers/common-helpers/lodash.wrappers';
import { logger } from '../../../helpers/common-helpers/logs';

/**
 * @description create new post
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const create = (req, res) => {
  const formObject = req.validatedFromObject;
  formObject.created_by = get(req, 'authUser._id', null);

  if (req.authRoles.indexOf(roleCodes.admin) !== -1) {
    formObject.status = postStatus.APPROVED;
    formObject.activate_at = Date.now();
  } else {
    formObject.status = postStatus.PENDING;
  }

  postService.createPost(formObject, (error, user) => {
    if (error) {
      logger.error(
        `Failed To Create Your Post :: Error :: ${JSON.stringify(error)}`
      );
      return res
        .status(failedPostResponse.httpStatus)
        .json(
          generateErrorResponseFn(
            failedPostResponse,
            error,
            'Failed To Create Your Post'
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

/**
 * @description update post
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const update = (req, res) => {
  const post = req.currentPost;
  post.heading = req.validatedFromObject.heading;
  post.content = req.validatedFromObject.content;
  post.tags = req.validatedFromObject.tags;
  post.updated_by = get(req, 'authUser._id', undefined);
  post.updated_at = Date.now();

  post.save(post, (error, postObj) => {
    if (error) {
      logger.error(
        `Failed To Upate Post Details :: Error :: ${JSON.stringify(error)}`
      );
      return res
        .status(failedPostResponse.httpStatus)
        .json(
          generateErrorResponseFn(
            failedPostResponse,
            error,
            'Failed To Upate Post Details'
          )
        );
    }
    return res
      .status(successPostResponse.httpStatus)
      .json(
        generateResponseFn(
          successPostResponse,
          postObj,
          'Post Updated Successfully'
        )
      );
  });
};

/**
 * @description request all post
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const getAll = (req, res) => {
  // eslint-disable-next-line consistent-return
  postService.pagination(req.query, (error, postsObject) => {
    if (error) {
      logger.error(
        `Failed To Generate Post List :: Error :: ${JSON.stringify(error)}`
      );
      return res
        .status(exceptionOccurredResponse.httpStatus)
        .json(
          generateErrorResponseFn(
            exceptionOccurredResponse,
            error,
            'Failed To Generate Post List'
          )
        );
    }

    res
      .status(successGetResponse.httpStatus)
      .json(generatePaginationResponseFn(successGetResponse, postsObject));
  });
};

/**
 * @description get post bu ID
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const getCurrentPost = (req, res) => {
  res
    .status(successGetResponse.httpStatus)
    .json(generateResponseFn(successGetResponse, req.currentPost));
};

/**
 * @description get post bu ID
 * @param {Object} req express request object
 * @param {Object} res express response object
 * @param {Function} next
 */
const getPostByID = (req, res, next, id) => {
  // eslint-disable-next-line consistent-return
  postService.findPostByID(id, (error, post) => {
    if (error) {
      logger.error(
        `Selected Post Not Found :: Error :: ${JSON.stringify(error)}`
      );
      return res
        .status(notFoundResponse.httpStatus)
        .json(
          generateErrorResponseFn(
            notFoundResponse,
            error,
            'Selected Post Not Found'
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
    (error) => {
      if (error) {
        logger.error(
          `Unable to remove post :: Error :: ${JSON.stringify(error)}`
        );
        return res
          .status(failedDeleteResponse.httpStatus)
          .json(
            generateErrorResponseFn(
              failedDeleteResponse,
              error,
              'Unable to remove post'
            )
          );
      }
      return res
        .status(successDeleteResponse.httpStatus)
        .json(
          generateResponseFn(
            successDeleteResponse,
            {},
            'Post removed successfully'
          )
        );
    }
  );
};

/**
 * @description update post status
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const updateStatus = (req, res) => {
  const post = req.currentPost;
  post.status = req.params.status;
  post.updated_by = get(req, 'authUser._id', undefined);
  post.updated_at = Date.now();

  if (req.params.status === postStatus.APPROVED) {
    post.activate_at = Date.now();
  }

  post.save((error, postObject) => {
    if (error) {
      logger.error(
        `Unable to update post status :: Error :: ${JSON.stringify(error)}`
      );
      return res
        .status(failedPostResponse.httpStatus)
        .json(
          generateErrorResponseFn(
            failedPostResponse,
            error,
            'Unable to update post status'
          )
        );
    }
    return res
      .status(successPostResponse.httpStatus)
      .json(
        generateResponseFn(
          successPostResponse,
          postObject,
          'Post status successfully changed'
        )
      );
  });
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
