/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2020-03-21 15:02:30
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-13 20:12:40
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

export const getUserProfileImgAPI = {
  url: `${apiBaseURL}users/get-user-image/`,
  key: 'getUserProfileImgAPIKey',
};

export const setUserProfileImgAPI = {
  url: `${apiBaseURL}users/set-user-image/`,
  key: 'setUserProfileImgAPIKey',
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
  url: `${apiBaseURL}posts/comments/`,
  key: 'addCommentAPIKEY',
};

export const editUserAPI = {
  url: `${apiBaseURL}users/`,
  key: 'editUserAPIKey',
};

export const getUserListAPI = {
  url: `${apiBaseURL}users`,
  key: 'getUserListAPIKEY',
};

export const setUserRoleAPI = {
  url: `${apiBaseURL}users/set-roles/`,
  key: 'setUserRoleAPIKey',
};

export const getUserByIDAPI = {
  url: `${apiBaseURL}users/`,
  key: 'getUserByIDAPIKEY',
};

export const getRolesListAPI = {
  url: `${apiBaseURL}roles`,
  key: 'getRolesListAPIKey',
};

export const setStatusChangeAPI = {
  url: `${apiBaseURL}users/status-change/`,
  key: 'setStatusChangeAPIKEY',
};

export const userLogOutAPI = {
  url: `${apiBaseURL}logout`,
  key: 'userLogOutAPIKey',
};
