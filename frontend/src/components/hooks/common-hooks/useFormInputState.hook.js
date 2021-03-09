/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2020-05-15 10:56:51
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-09 10:10:49
 */

import { useContext, useEffect, useMemo, useCallback } from 'react';

import { _get } from '../../../helpers/common-helpers/lodash.wrappers';
import { getValueByFilter } from '../../../helpers/common-helpers/common.helpers';

import { usePrevious } from './usePrevious.hook';
import {
  CoreContext,
  apiResponseStoringType,
} from '../../modules/core/context-providers/CoreContext.provider';
import { FormContext } from '../../modules/core/context-providers/FormContext.provider';

const emptyFun = (...para) => undefined;

const useBasicInput = (
  inputStatePath = '',
  formGroupName = '',
  inputName = '',
  inputValue = '',
  onEventChangeFn = emptyFun,
  onClickFn = emptyFun
) => {
  const [formState, formAction] = useContext(FormContext);

  const currentValue = useMemo(() => {
    return _get(
      formState,
      inputStatePath ? inputStatePath : `${formGroupName}.${inputName}`,
      inputValue
    );
  }, [inputStatePath, formGroupName, inputName, inputValue, formState]);

  const currentError = useMemo(() => {
    return getValueByFilter(
      _get(formState, `${formGroupName}._errors`, []),
      ['property', inputStatePath ? inputStatePath : inputName],
      'message',
      '',
      ''
    );
  }, [inputStatePath, formGroupName, inputName, formState]);

  const updateStatus = useMemo(() => {
    return _get(formState, `${formGroupName}._updateStatus`, undefined);
  }, [formGroupName, formState]);

  const handleOnChangeFn = useCallback(
    (eventData) => {
      formAction.changeInputFn(
        formGroupName,
        inputName,
        inputStatePath,
        eventData.value
      );
      onEventChangeFn(eventData);
    },
    [formGroupName, inputName, inputStatePath, formAction, onEventChangeFn]
  );

  const handleOnClickFn = useCallback(
    (eventData) => {
      onClickFn(eventData);
    },
    [onClickFn]
  );

  return [
    currentValue,
    currentError,
    updateStatus,
    handleOnChangeFn,
    handleOnClickFn,
  ];
};

const useAPIBaseInput = (
  apiUrl = '',
  apiStateKey = '',
  dataList = [],
  inputStatePath = '',
  formGroupName = '',
  inputName = '',
  inputValue = '',
  onEventChangeFn = emptyFun,
  onClickFn = emptyFun
) => {
  const [coreState, coreAction] = useContext(CoreContext);
  const [
    currentValue,
    currentError,
    updateStatus,
    handleOnChangeFn,
    handleOnClickFn,
  ] = useBasicInput(
    inputStatePath,
    formGroupName,
    inputName,
    inputValue,
    onEventChangeFn,
    onClickFn
  );
  const previousState = usePrevious({ apiUrl });

  const responseUpdateStatus = useMemo(() => {
    return _get(
      coreState,
      `apiResponses.${apiStateKey}._updateStatus`,
      undefined
    );
  }, [apiStateKey, coreState]);

  const optionList = useMemo(() => {
    if (Array.isArray(dataList) && dataList.length !== 0) {
      return dataList;
    } else {
      return _get(coreState, `apiResponses.${apiStateKey}.result`, []);
    }
  }, [coreState, apiStateKey, dataList]);

  const requestAPIDataFn = useCallback(() => {
    coreAction.initResponse(apiStateKey);
    coreAction
      .sendRequestFn(apiUrl)
      .method('get')
      .setInitStoring(apiResponseStoringType.setResponse, {
        responseKey: apiStateKey,
      })
      .send(emptyFun);
  }, [coreAction, apiStateKey, apiUrl]);

  useEffect(() => {
    if (
      (apiUrl &&
        _get(coreState, `apiResponses.${apiStateKey}.result`, []).length ===
          0 &&
        !(
          _get(coreState, `apiResponses.${apiStateKey}.status`, undefined) ===
            'done' ||
          _get(coreState, `apiResponses.${apiStateKey}.status`, undefined) ===
            'fetching'
        )) ||
      _get(previousState, 'apiUrl', undefined) !== apiUrl
    ) {
      requestAPIDataFn();
    }
  }, [
    apiUrl,
    apiStateKey,
    dataList,
    previousState,
    coreState,
    requestAPIDataFn,
  ]);

  return [
    currentValue,
    currentError,
    updateStatus,
    responseUpdateStatus,
    optionList,
    handleOnChangeFn,
    handleOnClickFn,
  ];
};

export { useAPIBaseInput, useBasicInput };
