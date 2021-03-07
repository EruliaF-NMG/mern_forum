/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-05 17:38:43
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-07 13:22:22
 */

const currentEnv = process.env.NODE_ENV || 'development';
const port = process.env.APP_PORT || 3000;
const baseUrl = process.env.APP_URL || `http://localhost:${port}/`;
const apiVersion = 'api/v1/';
const tokenLife = 36000;
const refreshTokenLife = 96000;
const salt = '97b8c4b382ff27e31408df9d528bb9ce';

export {
  currentEnv,
  port,
  baseUrl,
  apiVersion,
  tokenLife,
  refreshTokenLife,
  salt,
};
