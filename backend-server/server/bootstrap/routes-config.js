/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2019-03-06 18:31:13
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-08 18:47:28
 */
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

import app from './express-config';
import { swaggerOptions } from '../config/swagger.config';
import testRouters from '../routes/test/test.routers';
import clientRouters from '../routes/auth/client.routers';
import userRouters from '../routes/user/user.routers';
import authRouters from '../routes/auth/auth.routers';
import postRouters from '../routes/post/post.routers';
import commentsRouters from '../routes/post/comments.routers';
import roleRouters from '../routes/user/role.routers';
import permissionRouters from '../routes/user/permission.routers';

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// mount routes
app.use('/api', testRouters);
app.use('/api', clientRouters);
app.use('/api', userRouters);
app.use('/api', authRouters);
app.use('/api', postRouters);
app.use('/api', commentsRouters);
app.use('/api', roleRouters);
app.use('/api', permissionRouters);

export default app;
