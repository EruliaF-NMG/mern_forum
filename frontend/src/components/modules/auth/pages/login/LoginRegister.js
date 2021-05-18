/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2020-03-11
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-05-18 08:40:08
 */

import React from 'react';

import { PageLoader } from '../../../../ui-components/templates/common-includes/PageLoader';
import { SnackBarList } from '../../../../ui-components/templates/common-includes/SnackbarWrapper';
import { Login } from './includes/Login';
import { Register } from './includes/Register';

const LoginRegister = () => {
  return (
    <div className="LoginMainWrapper">
      <SnackBarList />
      <Login />
      <Register />
      <PageLoader />
    </div>
  );
};

export default LoginRegister;
