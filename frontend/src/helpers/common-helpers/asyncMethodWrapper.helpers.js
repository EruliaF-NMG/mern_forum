/*
 * @Author: Nisal Madusanka(EruliaF) 
 * @Date: 2020-04-06 20:36:28 
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2020-04-06 20:51:45
 */

import eachOf from 'async.eachof';
import eachOfLimit from 'async.eachoflimit';

 /**
 * loop each item parallel and foucus errors
 * @param {Array|Object} arrayObject 
 * @param {Function} methodBody method logic =>(item,key,cb)
 * @param {Function} cb call back Function => (error)
 */
const _asyncEachOf=(arrayObject,methodBody,cb)=>{
    eachOf(arrayObject,methodBody,cb);
}

/**
 * loop each item parallel and foucus errors
 * @param {Array|Object} arrayObject 
 * @param {Int} limit 
 * @param {Function} methodBody method logic =>(item,key,cb)
 * @param {Function} cb call back Function => (error)
 */
const _asyncEachOfLimit=(arrayObject,limit,methodBody,cb)=>{
    eachOfLimit(arrayObject,limit,methodBody,cb);
}


export {
    _asyncEachOf,
    _asyncEachOfLimit
}