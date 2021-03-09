/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2020-03-21 09:25:21
 * @Last Modified by: Sujith
 * @Last Modified time: 2021-03-09 18:48:56
 * @Last Modified by: Nisal Madusanka(EruliaF)
 */

import {
  setAuthTokenKey,
  setUnauthorisedUserKey,
  setAuthUserObjectKey,
} from '../../../../config/actionKeys.config';
import { authAPI } from '../../../../config/apiUrl.config';
import {
  setAuthData,
  logoutUser,
} from '../../../../helpers/common-helpers/manageStorage.helpers';
import { callApi } from '../../../../helpers/common-helpers/callApi.helpers';
import { _get } from '../../../../helpers/common-helpers/lodash.wrappers';
import { responseCode } from '../../../../config/apiResponseKey';
/**
 * @Author: Nisal Madusanka(EruliaF)
 * @description : set user auth token
 * @param {Function} dispatch auth  dispatch function
 * @param {Object} tokenObject
 */
const setTokensFn = (dispatch, tokenObject) => {
  dispatch({
    type: setAuthTokenKey,
    playload: tokenObject,
  });

  const userData = JSON.parse(atob(tokenObject.access_token.split('.')[1]));
  setAuthUserFn(dispatch, {
    id: userData.sub,
    name: userData.name,
    avatar: userData.avatar,
    organizations: userData.organizations,
    roles: userData.roles,
    permissions: userData.permissions,
    authUserId: userData.auth_user_id,
  });
};

/**
 * @Author: Nisal Madusanka(EruliaF)
 * @description : unauthoried user
 * @param {Function} dispatch auth  dispatch function
 */
const unauthorisedUserFn = (dispatch) => {
  logoutUser();
  dispatch({
    type: setUnauthorisedUserKey,
  });
};

/**
 * @Author: Nisal Madusanka(EruliaF)
 * @description : set user auth token
 * @param {Function} dispatch auth  dispatch function
 * @param {Object} userObject
 */
const setAuthUserFn = (dispatch, userObject) => {
  dispatch({
    type: setAuthUserObjectKey,
    playload: userObject,
  });
};

/**
 * @Author: Nisal Madusanka(EruliaF)
 * @description : unauthoried user
 * @param {Function} dispatch auth  dispatch function
 * @param {Function} uiDispatch ui  dispatch function
 * @param {Object} formObject form object
 * @param {Object} formAction form dispatch function
 */
const onLoginFn = (
  dispatch,
  uiDispatch,
  formObject,
  formAction,
  formGroupKey
) => {
  uiDispatch.setPageLoader(true);
  callApi(authAPI.url)
    .body({
      email: formObject.email || '',
      password: formObject.password || '',
      client_code: 'Web',
      client_secret: 'Web',
    })
    .headers(false)
    .method('post')
    .send((error, response) => {
      uiDispatch.setPageLoader(false);
      if (error) {
        if (
          _get(error, 'data.meta.code', undefined) ===
          responseCode.VALIDATION_ERROR
        ) {
          return formAction.setFormErrorFn(
            formGroupKey,
            _get(error, 'data.error', [])
          );
        } else {
          return formAction.setFormErrorFn(formGroupKey, [
            {
              property: 'email',
              message: 'Invalid username or password',
            },
            {
              property: 'password',
              message: 'Invalid username or password',
            },
          ]);
        }
      } else {
        uiDispatch.setPageLoader(false);
        if (response.data.access_token) {
          setAuthData(response.data);
          setTokensFn(dispatch, response.data);
          return;
        } else {
          uiDispatch.setFlashMessage({
            status: true,
            message: 'Something went wrong please try again',
            messageType: 'error',
          });
          return;
        }
      }
    });
};

/**
 * @author Nisal Madusanka (EruliaF)
 * @description connect all methods as one
 * @param {Object} dispatch
 */
const authAction = (dispatch, uiDispatch) => {
  return {
    setTokensFn: (tokenObject) => setTokensFn(dispatch, tokenObject),
    unauthorisedUserFn: () => unauthorisedUserFn(dispatch),
    onLoginFn: (formObject, formAction, formGroupKey) =>
      onLoginFn(dispatch, uiDispatch, formObject, formAction, formGroupKey),
  };
};

export { authAction };
