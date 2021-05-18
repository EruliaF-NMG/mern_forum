/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2020-03-11
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-05-18 08:40:12
 */

import React, { Fragment } from 'react';
import LoginRegister from './pages/login/LoginRegister';
import Guest from '../../hoc-middlewares/Guest';
import { Navigate } from '../../ui-components/ui-elements/common/Navigate';

const AuthRoutes = () => {
  return (
    <Fragment>
      <Navigate path="/" exact={true} component={Guest(LoginRegister)} />
      <Navigate path="/login" exact={true} component={Guest(LoginRegister)} />
    </Fragment>
  );
};

export default AuthRoutes;
