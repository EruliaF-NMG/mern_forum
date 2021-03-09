/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2020-05-23 09:42:17
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-09 23:21:50
 */
import { useMemo, useContext, useEffect, useCallback, useState } from 'react';
import { CoreContext } from '../../modules/core/context-providers/CoreContext.provider';
import { _get } from '../../../helpers/common-helpers/lodash.wrappers';
import { generateQueryString } from '../../../helpers/common-helpers/common.helpers';
import { usePrevious } from './usePrevious.hook';

const useForumState = (apiUrl = null, forumKey = '') => {
  const [coreState, coreAction] = useContext(CoreContext);

  const [forumState, setforumStateFn] = useState({
    isShowSearch: false,
    formObject: {},
    modelStatus: {
      type: 'actionList',
      status: false,
      index: null,
      rowIndex: null,
      props: {},
    },
  });

  const _responseUpdateStatus = useMemo(() => {
    return _get(
      coreState,
      `dataTableResponses.${forumKey}._updateStatus`,
      undefined
    );
  }, [forumKey, coreState]);

  const _reloadStatus = useMemo(() => {
    return _get(
      coreState,
      `dataTableResponses.${forumKey}._reloadDataTable`,
      undefined
    );
  }, [forumKey, coreState]);

  const _responseFetchingStatus = useMemo(() => {
    return _get(
      coreState,
      `dataTableResponses.${forumKey}.fetching`,
      undefined
    );
  }, [forumKey, coreState]);

  const previousState = usePrevious({
    reloadStatus: _reloadStatus,
    apiUrl: apiUrl,
  });

  const _pagingObject = useMemo(() => {
    return {
      current_page: _get(
        coreState,
        `dataTableResponses.${forumKey}.current_page`,
        1
      ),
      per_page: _get(coreState, `dataTableResponses.${forumKey}.per_page`, 10),
      total: _get(coreState, `dataTableResponses.${forumKey}.total`, null),
      page_count: _get(
        coreState,
        `dataTableResponses.${forumKey}.page_count`,
        null
      ),
      page_size: _get(
        coreState,
        `dataTableResponses.${forumKey}.page_size`,
        10
      ),
    };
  }, [forumKey, coreState]);

  const _tableBody = useMemo(() => {
    return _get(coreState, `dataTableResponses.${forumKey}.results`, []);
  }, [coreState, forumKey]);

  const requestAPIDataFn = useCallback(
    (type = null, data = null) => {
      if (apiUrl !== null) {
        let getDataUrl = apiUrl;
        if (type === 'next') {
          getDataUrl = `${apiUrl}${
            apiUrl.includes('?') === true ? '&' : '?'
          }${generateQueryString(data, forumState.formObject)}`;
        } else if (type === 'searchFrom') {
          getDataUrl = `${apiUrl}${
            apiUrl.includes('?') === true ? '&' : '?'
          }${generateQueryString(1, data)}`;
        } else if (type === 'none') {
          getDataUrl = `${apiUrl}${
            apiUrl.includes('?') === true ? '&' : '?'
          }${generateQueryString(
            _pagingObject.current_page,
            forumState.formObject
          )}`;
        }

        coreAction
          .sendRequestFn(getDataUrl)
          .method('get')
          .setInitStoring('DATA_TABLE', forumKey)
          .send();
      }
    },
    [apiUrl, forumState, _pagingObject, coreAction, forumKey]
  );

  useEffect(() => {
    if (_responseFetchingStatus === undefined) {
      coreAction.initDataTable(forumKey);
      if (apiUrl !== null) {
        requestAPIDataFn();
      }
    }
  }, [_responseFetchingStatus, coreAction, forumKey, apiUrl, requestAPIDataFn]);

  useEffect(() => {
    if (_get(previousState, 'reloadStatus', undefined) !== _reloadStatus) {
      requestAPIDataFn('none', null);
    }
  }, [_reloadStatus, requestAPIDataFn, previousState]);

  useEffect(() => {
    if (_get(previousState, 'apiUrl', undefined) !== apiUrl) {
      requestAPIDataFn('none', null);
    }
  }, [apiUrl, requestAPIDataFn, previousState]);

  return [
    _responseUpdateStatus,
    _reloadStatus,
    _responseFetchingStatus,
    _pagingObject,
    _tableBody,
    requestAPIDataFn,
    forumState,
    setforumStateFn,
  ];
};

export { useForumState };
