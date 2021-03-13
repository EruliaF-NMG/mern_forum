/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-06 10:55:01
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-13 10:08:01
 */
import { errorMessageList } from '../../config/validation.config';
import { get } from './lodash.wrappers';

const genarateErrorObjectFn = (err) => {
  if (err && err.code === 11000) {
    return [
      {
        property: Object.keys(err.keyPattern)[0],
        message: errorMessageList.unique.replace(
          ':attribute',
          Object.keys(err.keyPattern)[0]
        ),
      },
    ];
  }

  return err;
};

/**
 * @author Nisal Madusanka(EruliaF)
 * @description generate success response structure
 * @param {Object} commonResponse
 * @param {Object|Array} data data body
 * @param {String} message api meta message
 */
const generateResponseFn = (commonResponse = {}, data = {}, message = '') => {
  const response = {
    meta: {
      code: commonResponse.code,
      message: message === '' ? commonResponse.message : message,
    },
    data,
  };
  return response;
};

/**
 * @author Nisal Madusanka(EruliaF)
 * @description generate success response structure
 * @param {Object} commonResponse
 * @param {Object|Array} data data body
 * @param {String} message api meta message
 */
const generatePaginationResponseFn = (
  commonResponse = {},
  data = {},
  message = ''
) => {
  const response = {
    meta: {
      code: commonResponse.code,
      message: message === '' ? commonResponse.message : message,
      current_page: data.current_page,
      total_pages: data.total_pages,
      total_items: data.total_items,
      page_size: data.page_size,
    },
    data: data.data,
  };
  return response;
};

/**
 * @author Nisal Madusanka(EruliaF)
 * @description generate success response structure
 * @param {Object} commonResponse
 * @param {Object|Array} errorObj Error Object
 * @param {String} message api meta message
 */
const generateErrorResponseFn = (
  commonResponse = {},
  errorObj = {},
  message = ''
) => {
  const response = {
    meta: {
      code: commonResponse.code,
      message: message === '' ? commonResponse.message : message,
    },
    error: genarateErrorObjectFn(errorObj),
  };
  return response;
};

/**
 * @Author: Nisal Madusanka(EruliaF)
 * @description get from inputs for form validation
 * @param {Object|Array} formValue form data list
 * @param {string} key form value key
 */
const getInputsForValidateFn = (formValue, key) => {
  let value = get(formValue, key, '');

  switch (typeof value) {
    case 'string': {
      value = value.trim();
      break;
    }
    default: {
      break;
    }
  }
  return value;
};

/**
 * @author Nisal Madusanka(EruliaF)
 * @description genarate map key for form validation
 * @param {string} realInputKey known key
 * @param {string} keyToMap key should find
 */
const mapInputKeyFn = (realInputKey, keyToMap) => {
  const arrayMatch = realInputKey.match(/(\.\d*\.)/g);
  let key = 0;
  const returnData = keyToMap.replace(/(\.\**\.)/g, () => {
    const value = arrayMatch[key];
    key += 1;
    return value;
  });
  return returnData;
};

/**
 * @author Nisal Madusanka(EruliaF)
 * @param (any) value
 */
const isEmptyValue = (value) => {
  if (
    value === null ||
    value === undefined ||
    value === '' ||
    value === 'null' ||
    value === 'undefined'
  ) {
    return true;
  }
  return false;
};

export {
  generateResponseFn,
  generateErrorResponseFn,
  getInputsForValidateFn,
  mapInputKeyFn,
  isEmptyValue,
  generatePaginationResponseFn,
};
