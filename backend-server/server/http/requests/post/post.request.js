/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-06 19:56:38
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-08 09:58:16
 */

import validate from '../../../helpers/validation';
import {
  badResponse,
  notFoundResponse,
} from '../../../config/api-response.config';
import { generateErrorResponseFn } from '../../../helpers/common-helpers/common-methods';
import { get } from '../../../helpers/common-helpers/lodash.wrappers';
import { postStatus } from '../../../config/database-status';
/**
 * @author Nisal Madusanka(EruliaF)
 * @description validate create Post
 * @param {Object} req express request object
 * @param {Object} res express response object
 * @param {Function} next express request pass to next
 */
const createPostValidate = (req, res, next) => {
  const formData = {
    heading: get(req.body, 'heading', ''),
    content: get(req.body, 'content', ''),
    tags: get(req.body, 'tags', ''),
  };

  validate(formData)
    .setFileds({
      heading: 'Heading',
      content: 'Content',
      tags: 'Tags',
    })
    .setRules({
      heading: 'required|max:50',
      content: 'required',
      tags: 'required',
    })
    .setMessage({})
    // eslint-disable-next-line consistent-return
    .run((error) => {
      if (error) {
        return res
          .status(badResponse.httpStatus)
          .send(
            generateErrorResponseFn(
              badResponse,
              error,
              'Validation error occurred, while creating your post'
            )
          );
      }
      req.validatedFromObject = formData;
      next();
    });
};
// eslint-disable-next-line consistent-return
const statusChangeValidate = (req, res, next) => {
  if (
    Object.prototype.hasOwnProperty.call(postStatus, req.params.status) === true
  ) {
    next();
  } else {
    return res
      .status(notFoundResponse.httpStatus)
      .send(
        generateErrorResponseFn(
          notFoundResponse,
          {},
          `Invalid status eg:=[${postStatus.PENDING},${postStatus.APPROVED},${postStatus.BLOCKED}]`
        )
      );
  }
};

export { createPostValidate, statusChangeValidate };
