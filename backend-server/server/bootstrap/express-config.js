/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-05 17:26:32
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-14 13:06:55
 */

import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { logger } from '../helpers/common-helpers/logs';

dotenv.config();

const CURRENT_WORKING_DIR = process.cwd();
const app = express();

// enable CORS - Cross Origin Resource Sharing
app.use(cors());
// parse json body
app.use(express.json());
app.use(compress());
// use helmet
app.use(helmet());
// log all request
app.use(
  morgan('combined', {
    stream: logger.stream,
  })
);

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));
app.use('/public', express.static(path.join(CURRENT_WORKING_DIR, 'public')));

export default app;
