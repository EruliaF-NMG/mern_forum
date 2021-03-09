/*
 * @Author: Sujith
 * @Date: 2020-03-11
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-09 13:30:45
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
