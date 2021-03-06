/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-06 10:37:10
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-06 13:51:10
 */

import OauthClient from '../../../models/auth/oauthClient.model';
import {
  generateResponseFn,
  generateErrorResponseFn,
} from '../../../helpers/common-helpers/common-methods';
import {
  successPostResponse,
  failedPostResponse,
} from '../../../config/api-response.config';

const create = (req, res) => {
  const formData = req.body;
  const client = new OauthClient(formData);
  client.save((error, clientObj) => {
    if (error) {
      return res
        .status(failedPostResponse.httpStatus)
        .json(
          generateErrorResponseFn(
            failedPostResponse,
            error,
            'API Client Creation Failed'
          )
        );
    }
    return res
      .status(successPostResponse.httpStatus)
      .json(
        generateResponseFn(
          successPostResponse,
          clientObj,
          'API Client created successfully'
        )
      );
  });
};

export default { create };
