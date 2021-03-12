/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-08 09:29:48
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-12 21:29:26
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

export default { create };
