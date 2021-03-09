/*
 * @Author: Chanaka Wickramasinghe
 * @Description: Common Helpers
 * @Date: 2020-02-18 12:25:52
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-09 10:21:56
 */

import { _unset, _get, _findindex } from './lodash.wrappers';

/**
 * @description Get the type of given value
 * @param (*) value
 */

const getType = (value) => {
  if (value === null) return 'undefined';

  return typeof value;
};

const getDataByFormObject = ({ ...formObject }) => {
  _unset(formObject, '_uibackProsess');
  _unset(formObject, '_formGroupLinkKey');
  _unset(formObject, '_uiFormGroup');
  _unset(formObject, '_uiFormDescription');
  _unset(formObject, '_updateStatus');
  _unset(formObject, '_errors');
  _unset(formObject, '_onLoad');
  return formObject;
};

const fromObjectToQueryString = ({ ...formObject }) => {
  let queryString = '';

  Object.keys(formObject).forEach((key) => {
    if (
      formObject[key] !== undefined &&
      formObject[key] !== null &&
      formObject[key] !== 'null'
    ) {
      queryString = queryString + `${key}=${formObject[key]}&`;
    }
  });

  if (queryString.substr(queryString.length - 1) === '&') {
    queryString = queryString.substring(0, queryString.length - 1);
  }
  return queryString;
};

const sortObjectToQueryString = ({ ...formObject }) => {
  let queryString = '';

  Object.keys(formObject).forEach((key) => {
    queryString = queryString + `${key}|${formObject[key] ? 'asc' : 'desc'},`;
  });

  if (queryString.substr(queryString.length - 1) === ',') {
    queryString = queryString.substring(0, queryString.length - 1);
  }

  return queryString ? `sort_by=${queryString}` : queryString;
};

const generateQueryString = (requestPage = 1, formData = {}, sortData = {}) => {
  let url = `page=${requestPage}`;
  const searchFormStr = fromObjectToQueryString(getDataByFormObject(formData));
  const sortStr = sortObjectToQueryString(getDataByFormObject(sortData));
  url = searchFormStr ? `${url}&${searchFormStr}` : url;
  url = sortStr ? `${url}&${sortStr}` : url;
  return url;
};

/**
 * @Author: Nisal Madusanka(EruliaF)
 * @description get from inputs for form validation
 * @param {Object|Array} formValue form data list
 * @param {string} key form value key
 */
const getInputsForValidate = (formValue, key) => {
  let value = _get(formValue, key, '');

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
const mapInputKey = (realInputKey, keyToMap) => {
  let arrayMatch = realInputKey.match(/(\.\d*\.)/g);
  let key = 0;
  let returnData = keyToMap.replace(/(\.\**\.)/g, (match) => {
    var value = arrayMatch[key];
    key++;
    return value;
  });
  return returnData;
};

/**
 * @author Nisal Madusanka(EruliaF)
 * @param (Object) object
 * @param (Array|Function) finder
 * @param {String} valueKey required value path
 * @param {any} defaultValue default Value
 * @param {any} ifNotFound return value if not found data
 */
const getValueByFilter = (
  object,
  finder,
  valueKey = '',
  defaultValue = null,
  ifNotFound = null
) => {
  const index = _findindex(object, finder);
  if (index !== -1) {
    return _get(
      object,
      valueKey ? `${index}.${valueKey}` : `${index}`,
      defaultValue
    );
  } else {
    return ifNotFound;
  }
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
  } else {
    return false;
  }
};

/**
 * @author Nisal Madusanka(EruliaF)
 * @param (string|int|boolean) value
 */
const toBoolean = (value) => {
  if (value === true || value === 1 || value === '1' || value === 'true') {
    return true;
  } else {
    return false;
  }
};

/**
 * @author Chanaka Wickramasinghe
 * @description trim object values
 * @param (object) object
 */
const formObjectToTrimValues = (object) => {
  const keys = Object.keys(object);
  let trimmedObject = {};

  keys.forEach((value) => {
    if (getType(object[value]) === 'string') {
      trimmedObject[value] = object[value].trim();
    } else {
      trimmedObject[value] = object[value];
    }
  });

  return trimmedObject;
};

export {
  getType,
  getDataByFormObject,
  fromObjectToQueryString,
  sortObjectToQueryString,
  generateQueryString,
  getInputsForValidate,
  mapInputKey,
  getValueByFilter,
  toBoolean,
  isEmptyValue,
  formObjectToTrimValues,
};
