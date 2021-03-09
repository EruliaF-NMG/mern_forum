/*
 * @Author: Chanaka Wickramasinghe
 * @Description: Lodash Wrappers
 * @Date: 2020-02-18 09:24:36
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-09 11:19:45
 */
import lodashGet from 'lodash.get';
import lodashUnset from 'lodash.unset';
import lodashFindindex from 'lodash.findindex';
import lodashSet from 'lodash.set';
import lodashIntersection from 'lodash.intersection';

// import lodashSize from 'lodash.size';
// import lodashWithout from 'lodash.without';
// import lodashRound from 'lodash.round';
// import lodashFloor from 'lodash.floor';
// import lodashCeil from 'lodash.ceil';
// import lodashUniqby from 'lodash.uniqby';
// import lodashDifference from 'lodash.difference';

// /**
//  * lodash size() wrapper
//  * @param (Array|Object|string) object
//  */

// const _size = (object) => {
//   return lodashSize(object);
// };

// /**
//  * lodash without() wrapper
//  * @param (Array) array
//  * @param (Array) exclude
//  */

// const _without = (array, exclude) => {
//   return lodashWithout(array, exclude);
// };

// /**
//  * lodash round() wrapper
//  * @param (number) value
//  * @param (number=0) precision
//  */

// const _round = (value, precision = 0) => {
//   return lodashRound(value, precision);
// };

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

// /**
//  * lodash floor() wrapper
//  * @param (number) value
//  * @param (number=0) precision
//  */

// const _floor = (value, precision = 0) => {
//   return lodashFloor(value, precision);
// };

// /**
//  * lodash ceil() wrapper
//  * @param (number) value
//  * @param (number=0) precision
//  */

// const _ceil = (value, precision = 0) => {
//   return lodashCeil(value, precision);
// };

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

// /**
//  * lodash uniqby() wrapper
//  * @param {Object} object Data set
//  * @param {String|Function|Object} operation
//  */
// const _uniqby = (object, operation) => {
//   return lodashUniqby(object, operation);
// };

// const _difference = (mainArray, subArray) => {
//   return lodashDifference(mainArray, subArray);
// };

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
