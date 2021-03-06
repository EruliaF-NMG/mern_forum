/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-05 16:57:35
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-05 22:40:02
 */

import http from 'http';

import app from './bootstrap/routes-config';
import { port } from './config/core.config';

const server = http.createServer(app);

server.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info('Server started on port %s.', port);
});
