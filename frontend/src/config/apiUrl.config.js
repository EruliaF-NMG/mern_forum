/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2020-03-21 15:02:30
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-09 23:32:36
 */

import { apiBaseURL } from './core.config';

export const authAPI = {
  url: `${apiBaseURL}token`,
  key: 'getTokenKey',
};

export const registerAPI = {
  url: `${apiBaseURL}users`,
  key: 'createUserKey',
};

export const getAllPostAPI = {
  url: `${apiBaseURL}posts`,
  key: 'getAllPostAPIKEY',
};
