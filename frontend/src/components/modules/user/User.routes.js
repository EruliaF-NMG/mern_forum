/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-09 19:45:39
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-13 16:29:57
 */

import React, { Fragment } from 'react';
import Authorized from '../../hoc-middlewares/Authorized';
import { Navigate } from '../../ui-components/ui-elements/common/Navigate';
import ProfilePage from './pages/ProfilePage';
import ManageUsers from './pages/ManageUsers';
import ManageUserStatus from './pages/ManageUserStatus';
import { permissions } from '../../../config/permission.config';

const UserRoutes = () => {
  return (
    <Fragment>
      <Navigate
        path="/my-profile"
        exact={true}
        component={Authorized(ProfilePage)}
      />
      <Navigate
        path="/manage-user"
        exact={true}
        component={Authorized(ManageUsers)}
        routePermissions={permissions.MANAGE_USER_STATUS.permissions}
      />
      <Navigate
        path="/manage-user-status/:userID"
        exact={true}
        component={Authorized(ManageUserStatus)}
        routePermissions={permissions.MANAGE_USER_STATUS.permissions}
      />
    </Fragment>
  );
};

export default UserRoutes;
