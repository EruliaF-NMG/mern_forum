/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2020-03-26 15:28:37
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-09 18:39:28
 */
import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';

import useInit from './useInit.hook';
//import {InitialPageLoader} from "../ui-components/templates/template-one-includes/InitialPageLoader";

function guest(Component) {
  function WrappedComponent(props) {
    const [initStatus, isAuth] = useInit(props.routeKey);

    return isAuth === null || initStatus === false ? null : (
      <Fragment>
        {isAuth === false ? (
          <Component {...props} />
        ) : (
          <Redirect to={'/home'} />
        )}
      </Fragment>
    );
  }

  return WrappedComponent;
}

export default guest;
