/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-07 11:44:05
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-12 12:55:07
 */

import userService from '../../../services/user/user.service';
import { unauthorizedResponse } from '../../../config/api-response.config';

/**
 * @author Nisal Madusanka(EruliaF)
 * @description get token
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const token = (req, res) => {
  userService.authUser(req.validatedFromObject, (error, tokens) => {
    if (error) {
      res.status(unauthorizedResponse.httpStatus).send('Unauthorized');
    }
    res.status(200).send(tokens);
  });
};

/**
 * @description refresh token
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const refresh = (req, res) => {
  console.log(req, res);
  res.status(200).send('todo');
};

export default {
  token,
  refresh,
};
