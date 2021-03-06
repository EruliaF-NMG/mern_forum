/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-06 15:26:26
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-06 15:27:17
 */

import map from 'async/map';
import parallel from 'async/parallel';
import eachOf from 'async/eachOf';
import mapValues from 'async/mapValues';
import waterfall from 'async/waterfall';
import eachOfLimit from 'async/eachOfLimit';

/**
 * loop an array
 * @param {Array|Object} arrayObject data object
 * @param {Function} methodBody method logic
 * @param {Function} cb call back Function
 */
const asyncMap = (arrayObject, methodBody, cb) => {
  map(arrayObject, methodBody, cb);
};

/**
 * loop an array with key
 * @param {Array|Object} arrayObject data object
 * @param {Function} methodBody method logic
 * @param {Function} cb call back Function
 */
const asyncMapValues = (arrayObject, methodBody, cb) => {
  mapValues(arrayObject, methodBody, cb);
};

/**
 * run parallel methods
 * @param {Object|Array} methodList list of parallel executing methods { one:(callback)=>{callback(null,"ok")} }
 * @param {Function} cb call back method
 */
const asyncParallel = (methodList, cb) => {
  parallel(methodList, cb);
};

/**
 * loop each item parallel and foucus errors
 * @param {Array|Object} arrayObject
 * @param {Function} methodBody method logic =>(item,key,cb)
 * @param {Function} cb call back Function => (error)
 */
const asyncEachOf = (arrayObject, methodBody, cb) => {
  eachOf(arrayObject, methodBody, cb);
};

/**
 * loop each item parallel and foucus errors
 * @param {Array|Object} arrayObject
 * @param {Int} limit
 * @param {Function} methodBody method logic =>(item,key,cb)
 * @param {Function} cb call back Function => (error)
 */
const asyncEachOfLimit = (arrayObject, limit, methodBody, cb) => {
  eachOfLimit(arrayObject, limit, methodBody, cb);
};

/**
 * run all funstions one after the another
 * @param {Function-Array} methodArray arrays of methods
 * @param {Function} cb call back Function => (error,result)
 */
const asyncWaterfall = (methodArray, cb) => {
  waterfall(methodArray, cb);
};

export {
  asyncMap,
  asyncParallel,
  asyncEachOf,
  asyncEachOfLimit,
  asyncMapValues,
  asyncWaterfall,
};
