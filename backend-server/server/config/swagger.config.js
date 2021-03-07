/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-05 20:13:20
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-07 10:03:24
 */

import path from 'path';
import { baseUrl } from './core.config';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Assessment ',
      version: '1.0.0',
      description: 'Api for Forum',
      contact: {
        name: 'Nisal Madusanka1',
        email: 'nisal.nmg@gmail.com',
      },
      servers: [baseUrl],
    },
  },
  apis: [
    `${path.join(
      process.cwd(),
      'server',
      'helpers',
      'swagger-definitions'
    )}/**/*.js`,
    `${path.join(process.cwd(), 'server', 'routes')}/**/*.js`,
  ],
};

// eslint-disable-next-line import/prefer-default-export
export { swaggerOptions };
