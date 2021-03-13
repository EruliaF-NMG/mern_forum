/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-09 19:45:39
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-13 14:20:49
 */

import React, { Fragment } from 'react';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';
import ViewPostPage from './pages/ViewPostPage';
import ManagePost from './pages/ManagePost';
import Authorized from '../../hoc-middlewares/Authorized';
import { Navigate } from '../../ui-components/ui-elements/common/Navigate';
import { permissions } from '../../../config/permission.config';

const PostRoutes = () => {
  return (
    <Fragment>
      <Navigate
        path="/create-post"
        exact={true}
        component={Authorized(CreatePostPage)}
        routePermissions={permissions.CREATE_POST.permissions}
      />
      <Navigate
        path="/view-post/:id"
        exact={true}
        component={Authorized(ViewPostPage)}
        routePermissions={permissions.NONE.permissions}
      />
      <Navigate
        path="/edit-post/:id"
        exact={true}
        component={Authorized(EditPostPage)}
        routePermissions={permissions.EDIT_POST.permissions}
      />
      <Navigate
        path="/manage-post"
        exact={true}
        component={Authorized(ManagePost)}
        routePermissions={permissions.MANAGE_POST_STATUS.permissions}
      />
    </Fragment>
  );
};

export default PostRoutes;
