/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-05 16:57:35
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-06 09:35:05
 */

import http from 'http';
import mongoose from 'mongoose';

import app from './bootstrap/routes-config';
import { port } from './config/core.config';
import { mongoUri } from './config/database.config';

const server = http.createServer(app);

// Database Connection URL
mongoose.Promise = global.Promise;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

server.listen(port, (err) => {
  if (err) {
    throw new Error(err);
  }
  console.info('Server started on port %s.', port);
});
