/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-09 19:45:39
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-10 21:34:06
 */

import React, { Fragment } from 'react';
import Authorized from '../../hoc-middlewares/Authorized';
import { Navigate } from '../../ui-components/ui-elements/common/Navigate';
import ProfilePage from './pages/ProfilePage';

const UserRoutes = () => {
  return (
    <Fragment>
      <Navigate
        path="/my-profile"
        exact={true}
        component={Authorized(ProfilePage)}
      />
    </Fragment>
  );
};

export default UserRoutes;
