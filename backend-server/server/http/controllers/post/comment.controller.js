/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-08 09:29:48
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-14 10:14:05
 */

import {
  generateResponseFn,
  generateErrorResponseFn,
} from '../../../helpers/common-helpers/common-methods';
import {
  successPostResponse,
  failedPostResponse,
} from '../../../config/api-response.config';
import { commentStatus } from '../../../config/database-status';
import { get } from '../../../helpers/common-helpers/lodash.wrappers';
import { logger } from '../../../helpers/common-helpers/logs';

/**
 * @description add new comment
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const create = (req, res) => {
  const post = req.currentPost;
  const authUserID = get(req, 'authUser._id', undefined);

  post.comments.push({
    comment: req.validatedFromObject.comment,
    status: commentStatus.UNBLOCKED,
    created_at: Date.now(),
    created_by: authUserID,
  });

  post.save(post, (error, postObj) => {
    if (error) {
      logger.error(
        `Failed To Add Your Comment :: Error :: ${JSON.stringify(error)}`
      );
      return res
        .status(failedPostResponse.httpStatus)
        .json(
          generateErrorResponseFn(
            failedPostResponse,
            error,
            'Failed To Add Your Comment'
          )
        );
    }
    return res
      .status(successPostResponse.httpStatus)
      .json(
        generateResponseFn(
          successPostResponse,
          postObj,
          'Your Comment successfully added.'
        )
      );
  });
};

export default { create };
