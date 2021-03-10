/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2020-02-28 17:19:46
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-10 21:35:49
 */

import React, { Fragment } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

//import routers
import AuthRoutes from '../components/modules/auth/Auth.routes';
import ErrorBoundary from '../components/ui-components/ui-elements/common/ErrorBoundary';
import DisplayError from '../components/modules/error-boundary/pages/DisplayError';
import ErrorBoundaryRoutes from '../components/modules/error-boundary/ErrorBoundary.routes';
import DashboardRoutes from '../components/modules/dashboard/Dashboard.routes';
import PostRoutes from '../components/modules/post/Post.routes';
import UserRoutes from '../components/modules/user/User.routes';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Fragment>
          <ErrorBoundary displayComponent={DisplayError}>
            <AuthRoutes />
            <DashboardRoutes />
            <ErrorBoundaryRoutes />
            <PostRoutes />
            <UserRoutes />
          </ErrorBoundary>
        </Fragment>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
