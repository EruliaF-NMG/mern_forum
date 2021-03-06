/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-05 22:16:12
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-06 21:23:57
 */

import express from 'express';

import clientController from '../../http/controllers/auth/client.controller';

import { createClientValidate } from '../../http/requests/auth/client.request';

const router = express.Router();

router.route('/clients').post(createClientValidate, clientController.create);

export default router;
