/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2020-03-21 10:00:34
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-09 12:13:09
 */

import {
  setPageLoaderKey,
  setRouteKey,
  setFlashMessageKey,
  removeFlashMessageKey,
  setSideMenuStatusKey,
} from '../../../config/actionKeys.config';

import { dateObjectToString } from '../../../helpers/common-helpers/dateTime.helpers';

const setFlashMessage = (dispatch, messageObject) => {
  const key = dateObjectToString(new Date(), 'YYmmddHHMMII');

  dispatch({
    type: setFlashMessageKey,
    playload: {
      ...messageObject,
      key: key,
    },
  });

  setTimeout(() => {
    removeFlashMessage(dispatch, key);
  }, 5000);
};

const removeFlashMessage = (dispatch, key) => {
  dispatch({
    type: removeFlashMessageKey,
    key: key,
  });
};

const setSideToggleStatus = (dispatch, status) => {
  dispatch({
    type: setSideMenuStatusKey,
    playload: status,
  });
};

const setPageLoader = (dispatch, status) => {
  dispatch({
    type: setPageLoaderKey,
    playload: status,
  });
};

const setCurrentRouteFn = (dispatch, key) => {
  dispatch({
    type: setRouteKey,
    playload: key,
  });
};

const uiAction = (dispatch) => {
  return {
    setSideToggleStatus: (status) => setSideToggleStatus(dispatch, status),
    setPageLoader: (status) => setPageLoader(dispatch, status),
    setCurrentRouteFn: (key) => setCurrentRouteFn(dispatch, key),
    setFlashMessage: (messageObject) =>
      setFlashMessage(dispatch, messageObject),
    removeFlashMessage: (key) => removeFlashMessage(dispatch, key),
  };
};

export { uiAction };
