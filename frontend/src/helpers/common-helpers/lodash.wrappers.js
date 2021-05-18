/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Description: Lodash Wrappers
 * @Date: 2020-02-18 09:24:36
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-05-18 08:42:24
 */
import lodashGet from 'lodash.get';
import lodashUnset from 'lodash.unset';
import lodashFindindex from 'lodash.findindex';
import lodashSet from 'lodash.set';
import lodashIntersection from 'lodash.intersection';

/**
 * Lodash get() wrapper
 * @param (Object) object
 * @param (Array|string) path
 * @param (*) defaultValue
 */

const _get = (object, path, defaultValue) => {
  return lodashGet(object, path, defaultValue);
};

/**
 * Lodash get() wrapper(to int)
 * @param (Object) object
 * @param (Array|string) path
 * @param (*) defaultValue
 */

const _getInt = (object, path, defaultValue) => {
  const number = parseInt(_get(object, path, defaultValue));
  return isNaN(number) ? defaultValue : number;
};

/**
 * Lodash get() wrapper(to int)
 * @param (Object) object
 * @param (Array|string) path
 * @param (*) defaultValue
 */

const _getFloat = (object, path, defaultValue) => {
  const number = parseFloat(_get(object, path, defaultValue));
  return isNaN(number) ? defaultValue : number;
};

/**
 * Lodash set() wrapper
 * @param (Object) object
 * @param (Array|string) path
 * @param (*) value
 */

const _set = (object, path, value) => {
  return lodashSet(object, path, value);
};

/**
 * lodash unset() wrapper
 * @param (Object) object
 * @param (Array|string) path
 */

const _unset = (object, path) => {
  return lodashUnset(object, path);
};

/**
 * lodash findindex() wrapper
 * @param (Object) object
 * @param (Array|Function) finder
 */

const _findindex = (object, finder) => {
  return lodashFindindex(object, finder);
};

/**
 * @description Checks if value is Number or not * if true=number
 * @param {String} value
 */
const _isNumber = (value) => {
  try {
    return value.toString().match(/^\d+$/);
  } catch (ex) {
    return false;
  }
};

const _intersection = (mainArray, subArray) => {
  return lodashIntersection(mainArray, subArray);
};

export {
  _get,
  _getInt,
  _getFloat,
  _set,
  _unset,
  _findindex,
  _isNumber,
  _intersection,
};
