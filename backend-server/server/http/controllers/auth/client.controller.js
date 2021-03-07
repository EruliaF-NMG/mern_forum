/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-06 10:37:10
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-07 08:47:08
 */

import oauthClientService from '../../../services/auth/oauth-client.service';
import {
  generateResponseFn,
  generateErrorResponseFn,
} from '../../../helpers/common-helpers/common-methods';
import {
  successPostResponse,
  failedPostResponse,
} from '../../../config/api-response.config';

const create = (req, res) => {
  oauthClientService.createClient(
    req.validatedFromObject,
    (error, clientObj) => {
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
    }
  );
};

export default { create };
