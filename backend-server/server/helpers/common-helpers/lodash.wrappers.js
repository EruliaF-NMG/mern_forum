/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-06 13:55:13
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-06 14:37:03
 */

import _ from 'lodash';

/**
 * Lodash get() wrapper
 * @param (Object) object
 * @param (Array|string) path
 * @param (*) defaultValue
 */

const get = (object, path, defaultValue) => _.get(object, path, defaultValue);

/**
 * Lodash get() wrapper(to int)
 * @param (Object) object
 * @param (Array|string) path
 * @param (Number|Any) defaultValue
 */

const getInt = (object, path, defaultValue) => {
  // eslint-disable-next-line radix
  const numberValue = parseInt(get(object, path, defaultValue));
  return Number.isNaN(numberValue) ? defaultValue : numberValue;
};

export { get, getInt };
