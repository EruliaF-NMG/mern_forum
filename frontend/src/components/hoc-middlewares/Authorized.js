/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2020-03-26 15:28:37
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-10 22:12:24
 */
import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';

//import {InitialPageLoader} from "../ui-components/templates/template-one-includes/InitialPageLoader";
import useInit from './useInit.hook';
import { usePermission } from '../hooks/common-hooks/usePermission.hook';
import { PermissionDenial } from '../modules/error-boundary/pages/PermissionDenial';

function authorized(Component) {
  function WrappedComponent(props) {
    const [initStatus, isAuth, authUser] = useInit(props.routeKey);

    const [, checkPermissionFn] = usePermission();

    return isAuth === null || initStatus === false ? null : (
      <Fragment>
        {' '}
        {isAuth === true ? (
          <Fragment>
            {checkPermissionFn(props.routePermissions) === true ? (
              <Component
                {...{
                  ...props,
                  authUser: authUser,
                }}
              />
            ) : (
              <PermissionDenial />
            )}
          </Fragment>
        ) : (
          <Redirect to={'/login'} />
        )}{' '}
      </Fragment>
    );
  }

  return WrappedComponent;
}

export default authorized;
