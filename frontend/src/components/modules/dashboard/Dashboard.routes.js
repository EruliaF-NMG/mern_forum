/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-09 19:45:39
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-09 19:47:19
 */

import React, { Fragment } from 'react';
import DashbordPage from './pages/DashbordPage';
import Authorized from '../../hoc-middlewares/Authorized';
import { Navigate } from '../../ui-components/ui-elements/common/Navigate';

const DashbordRoutes = () => {
  return (
    <Fragment>
      <Navigate
        path="/home"
        exact={true}
        component={Authorized(DashbordPage)}
      />
    </Fragment>
  );
};

export default DashbordRoutes;
