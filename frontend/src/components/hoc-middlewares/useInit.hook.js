/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2020-03-27 12:52:11
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-09 11:47:57
 */
import { useContext, useEffect, useState } from 'react';

import { checkUserINLocalStorage } from '../../helpers/common-helpers/manageStorage.helpers';
import { AuthContext } from '../modules/core/context-providers/AuthContext.provider';
import { UIContext } from '../ui-components/context-providers/UIContext.provider';

const useInit = (routeKey) => {
  const [initState, setState] = useState(false);
  const [authStatus, authAction] = useContext(AuthContext);
  const [, uiAction] = useContext(UIContext);

  useEffect(() => {
    uiAction.setCurrentRouteFn(routeKey);

    if (
      authStatus.isAuthenticated === false ||
      authStatus.isAuthenticated === true
    ) {
      setState(true);
    } else {
      const localStoreData = checkUserINLocalStorage();
      if (localStoreData.status === true) {
        authAction.setTokensFn(localStoreData.result);
      } else {
        authAction.unauthorisedUserFn();
      }
      setState(true);
    }
  }, []);

  return [initState, authStatus.isAuthenticated];
};

export default useInit;
