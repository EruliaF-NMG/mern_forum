/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-09 19:45:39
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-10 20:51:58
 */

import React, { Fragment } from 'react';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';
import ViewPostPage from './pages/ViewPostPage';
import Authorized from '../../hoc-middlewares/Authorized';
import { Navigate } from '../../ui-components/ui-elements/common/Navigate';

const PostRoutes = () => {
  return (
    <Fragment>
      <Navigate
        path="/create-post"
        exact={true}
        component={Authorized(CreatePostPage)}
      />
      <Navigate
        path="/view-post/:id"
        exact={true}
        component={Authorized(ViewPostPage)}
      />
      <Navigate
        path="/edit-post/:id"
        exact={true}
        component={Authorized(EditPostPage)}
      />
    </Fragment>
  );
};

export default PostRoutes;
