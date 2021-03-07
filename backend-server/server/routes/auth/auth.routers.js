/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-05 22:16:12
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-07 12:46:54
 */

import express from 'express';

import authController from '../../http/controllers/auth/auth.controller';

import { loginValidate } from '../../http/requests/auth/auth.request';

const router = express.Router();

router.route('/token').post(loginValidate, authController.token);

export default router;
