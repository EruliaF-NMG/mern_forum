/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-06 19:56:38
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-14 10:10:27
 */

import validate from '../../../helpers/validation';
import { badResponse } from '../../../config/api-response.config';
import { generateErrorResponseFn } from '../../../helpers/common-helpers/common-methods';
import { get } from '../../../helpers/common-helpers/lodash.wrappers';

/**
 * @author Nisal Madusanka(EruliaF)
 * @description validate create comment
 * @param {Object} req express request object
 * @param {Object} res express response object
 * @param {Function} next express request pass to next
 */
const createCommentValidate = (req, res, next) => {
  const formData = {
    comment: get(req.body, 'comment', ''),
  };

  validate(formData)
    .setFileds({
      comment: 'Comment',
    })
    .setRules({
      comment: 'required|max:255',
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
              'Validation error occurred, while adding your comment'
            )
          );
      }
      req.validatedFromObject = formData;
      next();
    });
};

// eslint-disable-next-line import/prefer-default-export
export { createCommentValidate };
