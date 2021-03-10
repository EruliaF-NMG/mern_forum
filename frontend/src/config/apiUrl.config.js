/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2020-03-21 15:02:30
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-10 22:17:42
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

export const createPostAPI = {
  url: `${apiBaseURL}posts`,
  key: 'createPostAPIKey',
};

export const editPostAPI = {
  url: `${apiBaseURL}posts/`,
  key: 'editPostAPIKey',
};

export const addCommentAPI = {
  url: `${apiBaseURL}comments/`,
  key: 'addCommentAPIKEY',
};

export const editUserAPI = {
  url: `${apiBaseURL}users/`,
  key: 'editUserAPIKey',
};
