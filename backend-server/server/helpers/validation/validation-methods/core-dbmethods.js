/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-06 13:49:14
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-08 23:49:58
 */

import mongoose from 'mongoose';

import { get } from '../../common-helpers/lodash.wrappers';
import { getInputsForValidateFn } from '../../common-helpers/common-methods';

/**
 * @author Nisal Madusanka(EruliaF)
 * @description validate unique with db
 * @param {string} key input value key
 * @param {object} values form values
 * @param {array} param additional validation parameters
 * @param {string} message Error message
 * @param {object} filedList display name for form elements
 * @param {Function} cb callback function
 */
const unique = (key, values, param, message, filedList, cb) => {
  try {
    const formValue = getInputsForValidateFn(values, key);
    const filterOption = {
      [get(param, '1', key)]: formValue,
    };

    if (mongoose.Types.ObjectId.isValid(get(param, '2', '-'))) {
      // eslint-disable-next-line dot-notation
      filterOption['_id'] = {
        $ne: mongoose.Types.ObjectId(get(param, '2', '-')),
      };
    }

    mongoose.connection
      .collection(get(param, '0', key))
      .findOne(filterOption, (error, result) => {
        if (result) {
          cb(message, null);
        } else {
          cb(null, true);
        }
      });
  } catch (ex) {
    console.log(
      `----------------Validation Exception At (unique)-------------------`,
      `Input Key - ${key}`,
      `Exception - ${ex}`
    );

    cb(true);
  }
};

/**
 * @author Nisal Madusanka(EruliaF)
 * @description validate unique with db
 * @param {string} key input value key
 * @param {object} values form values
 * @param {array} param additional validation parameters
 * @param {string} message Error message
 * @param {object} filedList display name for form elements
 * @param {Function} cb callback function
 */
const matchArrayWithDB = (key, values, param, message, filedList, cb) => {
  try {
    const formValue = getInputsForValidateFn(values, key);
    const filterOption = {
      [get(param, '1', key)]: formValue,
    };

    if (mongoose.Types.ObjectId.isValid(get(param, '2', '-'))) {
      // eslint-disable-next-line dot-notation
      filterOption['_id'] = {
        $ne: mongoose.Types.ObjectId(get(param, '2', '-')),
      };
    }

    mongoose.connection
      .collection(get(param, '0', key))
      .findOne(filterOption, (error, result) => {
        if (result) {
          cb(message, null);
        } else {
          cb(null, true);
        }
      });
  } catch (ex) {
    console.log(
      `----------------Validation Exception At (unique)-------------------`,
      `Input Key - ${key}`,
      `Exception - ${ex}`
    );

    cb(true);
  }
};

// eslint-disable-next-line import/prefer-default-export
export { unique };
