/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2020-03-21 09:57:06
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-09 12:13:46
 */

import React, { createContext, useReducer } from 'react';

import { uiAction } from '../ui-components-helpers/uiContext.helpers';
import { _findindex } from '../../../helpers/common-helpers/lodash.wrappers';
import {
  setPageLoaderKey,
  setRouteKey,
  setFlashMessageKey,
  removeFlashMessageKey,
  setSideMenuStatusKey,
} from '../../../config/actionKeys.config';

const initialState = {
  setPageLoader: false,
  currentRouteKey: '',
  flashMessageList: [],
};

// const getInitState=()=>{
//     const [type]=useScreenType();
//     return {
//         ...initialState,
//         toggleSideMenu:type!==screenSizeTypes.largeDevice.key?false:true
//     }
// }

const UIContext = createContext({});

const uiReducer = (state, action) => {
  switch (action.type) {
    case setSideMenuStatusKey:
      return {
        ...state,
        toggleSideMenu: action.playload,
      };
    case setPageLoaderKey:
      return {
        ...state,
        setPageLoader: action.playload,
      };
    case setRouteKey:
      return {
        ...state,
        currentRouteKey: action.playload,
      };
    case setFlashMessageKey:
      let currentList = state.flashMessageList || [];

      if (currentList.length >= 3) {
        currentList = currentList.slice(1, currentList.length);
      }

      return {
        ...state,
        flashMessageList: [...currentList, action.playload],
      };

    case removeFlashMessageKey:
      const key = _findindex(state.flashMessageList, ['key', action.key]);

      if (key !== -1) {
        return {
          ...state,
          flashMessageList: (state.flashMessageList || []).slice(
            1,
            (state.flashMessageList || []).length
          ),
        };
      }
      break;

    default:
      return state;
  }
};

const UIContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);
  const dispatchFuntion = uiAction(dispatch);
  return (
    <UIContext.Provider value={[state, dispatchFuntion]}>
      {children}
    </UIContext.Provider>
  );
};

export { UIContext, UIContextProvider };
