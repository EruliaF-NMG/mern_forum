/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2020-03-22 17:12:21
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-13 09:46:19
 */
/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2020-03-22 16:58:56
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2020-03-22 17:06:30
 */
import {
  initDataTableKey,
  setDataTableKey,
  updateDataTableObjectKey,
  shortDataTableDataKey,
  setReloadDataTableKey,
  setApiResponseKey,
  updateDataTableFieldValueKey,
  initResponseKey,
  updateDataTableRowKey,
  setApiResponseErrorKey,
} from '../../../../config/actionKeys.config';
import { emptyFun } from '../../../ui-components/ui-elements/common/BaseElements';
import { _get } from '../../../../helpers/common-helpers/lodash.wrappers';
import {
  responseCode,
  apiResponseStoringType,
} from '../../../../config/apiResponseKey';
import { callApi } from '../../../../helpers/common-helpers/callApi.helpers';
import { toBoolean } from '../../../../helpers/common-helpers/common.helpers';
import validate from '../../../../helpers/validation';

const initDataTable = (dispatch, stateKey) => {
  dispatch({
    type: initDataTableKey,
    stateKey: stateKey,
  });
};

const initResponse = (dispatch, stateKey) => {
  dispatch({
    type: initResponseKey,
    stateKey: stateKey,
  });
};

const setDataTable = (
  dispatch,
  stateKey,
  results = [],
  fetching = 'init',
  current_page = 1,
  page_count = null,
  per_page = 10,
  total = null,
  page_size = 10
) => {
  dispatch({
    type: setDataTableKey,
    stateKey: stateKey,
    fetching: fetching,
    current_page: current_page,
    page_count: page_count,
    per_page: per_page,
    total: total,
    results: results,
    page_size: page_size,
  });
};

const mergedDataTableResult = (dispatch, stateKey, result) => {
  dispatch({
    type: updateDataTableObjectKey,
    stateKey: stateKey,
    playload: result,
  });
};

const onShortFn = (dispatch, datatableKey, key, status) => {
  dispatch({
    type: shortDataTableDataKey,
    stateKey: datatableKey,
    key: key,
    status: status,
  });
};

const resetDataTable = (dispatch, stateKey) => {
  dispatch({
    type: setReloadDataTableKey,
    stateKey: stateKey,
  });
};

const onChangeDataTableFieldValue = (dispatch, stateKey, inputKey, value) => {
  console.log(stateKey, inputKey, value);
  dispatch({
    type: updateDataTableFieldValueKey,
    stateKey: stateKey,
    inputKey: inputKey,
    value: value,
  });
};

const setApiResponse = (dispatch, stateKey, result) => {
  dispatch({
    type: setApiResponseKey,
    stateKey: stateKey,
    playload: result,
  });
};

const updateDataTableRow = (dispatch, stateKey, index, result) => {
  dispatch({
    type: updateDataTableRowKey,
    stateKey: stateKey,
    index: index,
    playload: result,
  });
};

const setErrorObject = (dispatch, path, result) => {
  dispatch({
    type: setApiResponseErrorKey,
    path: path,
    playload: result,
  });
};

const sendRequestFn = (dispatch, formContext, uiDispatch, apiUrl = null) => {
  var dataStoring = {
    setLoader: false,
    storingType: '',
    storingKey: '',
    mergeToSuccessResponse: null,
    mergeToErrorResponse: null,
    flashMessages: {},
    validationObject: null,
    onRebuildResponseFn: false,
    callApiObj: {
      apiUrl: apiUrl,
      isSetHeaders: true,
      multipart: false,
      method: 'get',
      body: {},
      onUpload: false,
    },
  };

  return {
    /**
     * @description: set headers
     * @param {Boolean} status set headers
     */
    headers: function (status = true) {
      dataStoring = {
        ...dataStoring,
        callApiObj: {
          ...dataStoring.callApiObj,
          isSetHeaders: status,
        },
      };
      return this;
    },
    /**
     * @description: set multipart
     * @param {*} status
     */
    isMultipart: function (status = true) {
      dataStoring = {
        ...dataStoring,
        callApiObj: {
          ...dataStoring.callApiObj,
          multipart: status,
        },
      };
      return this;
    },
    /**
     * @description: set api method type
     * @param {String} method set api method type
     */
    method: function (method = 'post') {
      dataStoring = {
        ...dataStoring,
        callApiObj: {
          ...dataStoring.callApiObj,
          method: method,
        },
      };
      return this;
    },
    /**
     * @description: set api body
     * @param {Object|Array} status set api body
     */
    body: function (body = {}) {
      dataStoring = {
        ...dataStoring,
        callApiObj: {
          ...dataStoring.callApiObj,
          body: body,
        },
      };
      return this;
    },
    /**
     * @description: tracking uploading process
     * @param {Funtion} onUploadFn
     */
    onUpload: function (onUploadFn) {
      dataStoring = {
        ...dataStoring,
        callApiObj: {
          ...dataStoring.callApiObj,
          onUpload: onUploadFn,
        },
      };
      return this;
    },
    /**
     * @description: set loader
     * @param {string} state
     */
    setLoader: function (state = false) {
      dataStoring = {
        ...dataStoring,
        setLoader: state,
      };
      return this;
    },
    /**
     * @description: set Init Storing
     * @param {string} type storing Type
     * @param {string} key storing key
     */
    setInitStoring: function (type = null, key = null) {
      dataStoring = {
        ...dataStoring,
        storingKey: key,
        storingType: type,
      };
      return this;
    },
    /**
     * @description: set onRebuildResponseFn
     * @param {Function} onRebuildResponseFn callback funtion
     */
    setOnRebuildResponseFn: function (onRebuildResponseFn) {
      dataStoring = {
        ...dataStoring,
        onRebuildResponseFn: onRebuildResponseFn,
      };
      return this;
    },
    /**
     * @description: set Data Storing Object
     * @param {string} object storing Object
     */
    setFullObject: function (dataStoringObject = {}, callApiObject = {}) {
      dataStoring = {
        ...dataStoring,
        ...dataStoringObject,
        callApiObj: {
          ...dataStoring.callApiObj,
          ...callApiObject,
        },
      };
      return this;
    },
    /**
     * @description: set validation Object
     * @param {string} object storing Object
     */
    setValidationObject: function (fileds = {}, rules = {}, message = {}) {
      dataStoring = {
        ...dataStoring,
        validationObject: {
          fileds: fileds,
          rules: rules,
          message: message,
        },
      };
      return this;
    },
    /**
     * @description: set validation Object
     * @param {string} Object Meesage Object
     */
    setFlashMessages: function (messageList = {}) {
      dataStoring = {
        ...dataStoring,
        flashMessages: messageList,
      };
      return this;
    },
    /**
     * @description: send request to end-point
     * @param {Function} cb callback function
     */
    send: function (cb = emptyFun) {
      if (dataStoring.validationObject !== null) {
        validate(_get(dataStoring, 'callApiObj.body', {}))
          .setFileds(_get(dataStoring, 'validationObject.fileds', {}))
          .setRules(_get(dataStoring, 'validationObject.rules', {}))
          .setMessage(_get(dataStoring, 'validationObject.message', {}))
          .run((error, result) => {
            let errorStateKey = _get(dataStoring, 'storingKey.form', '');

            if (error) {
              if (
                errorStateKey.includes('dataTableResponses') ||
                errorStateKey.includes('apiResponses')
              ) {
                errorStateKey = errorStateKey.replace('results', 'errors');
                setErrorObject(dispatch, errorStateKey, error);
              } else {
                formContext.setFormErrorFn(errorStateKey, error);
              }
              cb(error, null);
            } else {
              if (
                errorStateKey.includes('dataTableResponses') ||
                errorStateKey.includes('apiResponses')
              ) {
                errorStateKey = errorStateKey.replace('results', 'errors');
                setErrorObject(dispatch, errorStateKey, []);
              } else {
                formContext.setFormErrorFn(errorStateKey, []);
              }

              if (
                dataStoring.storingType === apiResponseStoringType.dataTable
              ) {
                mergedDataTableResult(dispatch, dataStoring.storingKey, {
                  fetching: 'fetching',
                });
              }

              sendToAPIFn(dispatch, formContext, uiDispatch, dataStoring, cb);
            }
          });
      } else {
        sendToAPIFn(dispatch, formContext, uiDispatch, dataStoring, cb);
      }
    },
  };
};

const sendToAPIFn = (
  dispatch,
  formContext,
  uiDispatch,
  dataStoring,
  cb = emptyFun
) => {
  if (_get(dataStoring, 'setLoader', false) === true) {
    uiDispatch.setPageLoader(true);
  }

  callApi()
    .setFullObject(dataStoring.callApiObj)
    .send((error, response) => {
      console.log(error);
      if (_get(dataStoring, 'setLoader', false) === true) {
        uiDispatch.setPageLoader(false);
      }

      if (error) {
        if (
          _get(
            dataStoring,
            `flashMessages.${_get(error, 'data.meta.code', 'none')}`,
            false
          ) !== false
        ) {
          uiDispatch.setFlashMessage(
            _get(
              dataStoring,
              `flashMessages.${_get(error, 'data.meta.code', 'none')}`,
              {}
            )
          );
        }

        switch (dataStoring.storingType) {
          case apiResponseStoringType.dataTable:
            mergedDataTableResult(dispatch, dataStoring.storingKey, {
              results: [],
              fetching: 'error',
            });
            cb(error);
            return;
          case apiResponseStoringType.dateTableLinkedForm:
            if (
              _get(error, 'data.meta.code', null) ===
              responseCode.VALIDATION_ERROR
            ) {
              let errorStateKey = _get(dataStoring, 'storingKey.form', '');
              if (
                errorStateKey.includes('dataTableResponses') ||
                errorStateKey.includes('apiResponses')
              ) {
                errorStateKey = errorStateKey.replace('results', 'errors');
                setErrorObject(
                  dispatch,
                  errorStateKey,
                  _get(error, 'data.error', [])
                );
              } else {
                formContext.setFormErrorFn(
                  _get(dataStoring, 'storingKey.form', null),
                  _get(error, 'data.error', [])
                );
              }
            }
            cb(error);
            return;
          case apiResponseStoringType.responseLinkToFrom:
            if (
              _get(error, 'data.meta.code', null) ===
              responseCode.VALIDATION_ERROR
            ) {
              let errorStateKey = _get(dataStoring, 'storingKey.form', '');
              if (
                errorStateKey.includes('dataTableResponses') ||
                errorStateKey.includes('apiResponses')
              ) {
                errorStateKey = errorStateKey.replace('results', 'errors');
                setErrorObject(
                  dispatch,
                  errorStateKey,
                  _get(error, 'data.error', [])
                );
              } else {
                formContext.setFormErrorFn(
                  _get(dataStoring, 'storingKey.form', null),
                  _get(error, 'data.error', [])
                );
              }
            }
            cb(error);
            return;
          default:
            cb(error);
            return;
        }
      } else {
        if (
          _get(
            dataStoring,
            `flashMessages.${_get(response, 'data.meta.code', 'none')}`,
            false
          ) !== false
        ) {
          uiDispatch.setFlashMessage(
            _get(
              dataStoring,
              `flashMessages.${_get(response, 'data.meta.code', 'none')}`,
              {}
            )
          );
        }

        switch (dataStoring.storingType) {
          case apiResponseStoringType.dataTable:
            setDataTable(
              dispatch,
              dataStoring.storingKey,
              _get(response, 'data.data', []),
              'done',
              _get(response, 'data.meta.current_page', 1),
              _get(response, 'data.meta.total_pages', null),
              _get(response, 'data.data', []).length,
              _get(response, 'data.meta.total_items', null),
              _get(response, 'data.meta.page_size	', 10)
            );
            cb(null, response);
            return;

          case apiResponseStoringType.dateTableLinkedForm:
            resetDataTable(
              dispatch,
              _get(dataStoring, 'storingKey.dataTable', null)
            );
            formContext.removeFromGroupFn(
              _get(dataStoring, 'storingKey.form', null)
            );
            cb(null, response);
            return;

          case apiResponseStoringType.responseLinkToFrom:
            if (_get(dataStoring, 'storingKey.dataTable', null) !== null) {
              resetDataTable(
                dispatch,
                _get(dataStoring, 'storingKey.dataTable', null)
              );
            }

            setApiResponse(
              dispatch,
              _get(dataStoring, 'storingKey.responseKey', null),
              _get(response, 'data.data', null)
            );

            cb(null, response);
            return;

          case apiResponseStoringType.setResponse:
            setApiResponse(
              dispatch,
              _get(dataStoring, 'storingKey.responseKey', null),
              _get(response, 'data.data', null)
            );

            cb(null, response);
            return;

          case apiResponseStoringType.apiResponseToFormState:
            formContext.mergeFormObject(
              dataStoring.storingKey,
              dataStoring.onRebuildResponseFn === false
                ? _get(response, 'data.data', {})
                : dataStoring.onRebuildResponseFn(
                    _get(response, 'data.data', {})
                  )
            );

            cb(null, response);
            return;

          default:
            cb(null, response);
            return;
        }
      }
    });
};

const coreAction = (dispatch, UIDispatch, formAction) => {
  return {
    initDataTable: (stateKey) => initDataTable(dispatch, stateKey),
    resetDataTable: (stateKey) => resetDataTable(dispatch, stateKey),
    setDataTable: (
      stateKey,
      results,
      fetching,
      current_page,
      page_count,
      per_page,
      total,
      page_size
    ) =>
      setDataTable(
        dispatch,
        stateKey,
        results,
        fetching,
        current_page,
        page_count,
        per_page,
        total,
        page_size
      ),
    sendRequestFn: (api = null) =>
      sendRequestFn(dispatch, formAction, UIDispatch, api),
    mergedDataTableResult: (stateKey, result) =>
      mergedDataTableResult(dispatch, stateKey, result),
    onShortFn: (datatableKey, key, status) =>
      onShortFn(dispatch, datatableKey, key, status),
    setApiResponse: (stateKey, result) =>
      setApiResponse(dispatch, stateKey, result),
    onChangeDataTableFieldValue: (stateKey, inputKey, value) =>
      onChangeDataTableFieldValue(dispatch, stateKey, inputKey, value),
    initResponse: (stateKey) => initResponse(dispatch, stateKey),
    updateDataTableRow: (stateKey, index, result) =>
      updateDataTableRow(dispatch, stateKey, index, result),
    setErrorObject: (path, result) => setErrorObject(dispatch, path, result),
  };
};

export { coreAction };
