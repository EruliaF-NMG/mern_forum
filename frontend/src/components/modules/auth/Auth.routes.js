/*
 * @Author: Sujith
 * @Date: 2020-03-11
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-09 13:08:57
 */

import React, { Fragment } from 'react';
import LoginRegister from './pages/login/LoginRegister';
import Guest from '../../hoc-middlewares/Guest';
import { Navigate } from '../../ui-components/ui-elements/common/Navigate';

const AuthRoutes = () => {
  return (
    <Fragment>
      <Navigate path="/" exact={true} component={Guest(LoginRegister)} />
    </Fragment>
  );
};

export default AuthRoutes;
