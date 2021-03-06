/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2019-03-06 18:31:13
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-05 23:11:06
 */
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

import app from './express-config';
import { swaggerOptions } from '../config/swagger.config';
import testRouters from '../routes/test/test.routers';

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// mount routes
app.use('/api', testRouters);

app.get('*', (req, res) => {
  res.status(200).send({ page: 'home' });
});

export default app;
