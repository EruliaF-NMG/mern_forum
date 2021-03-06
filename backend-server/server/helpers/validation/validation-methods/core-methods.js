/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-06 13:49:17
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-06 14:56:44
 */

import {
  getInputsForValidateFn,
  mapInputKeyFn,
} from '../../common-helpers/common-methods';

/**
 * @description validate required fields
 * @param {string} key input value key
 * @param {object} values form values
 * @param {array} param additional validation parameters
 * @param {string} message Error message
 * @param {object} filedList display name for form elements
 * @param {Function} cb callback function
 */
const required = (key, values, param, message, filedList, cb) => {
  try {
    const formValue = getInputsForValidateFn(values, key);
    if (formValue === null || formValue === undefined || formValue === '') {
      cb(message);
    } else {
      cb(null, true);
    }
  } catch (ex) {
    console.log(
      `----------------Validation Exception At (required)-------------------`,
      `Input Key - ${key}`,
      `Exception - ${ex}`
    );

    cb(true);
  }
};

/**
 * @description validate required if on another field
 * @param {string} key input value key
 * @param {object} values form values
 * @param {array} param additional validation parameters
 * @param {string} message Error message
 * @param {object} filedList display name for form elements
 * @param {Function} cb callback function
 */
const requiredIf = (key, values, param, message, filedList, cb) => {
  try {
    const mainFild = getInputsForValidateFn(
      values,
      mapInputKeyFn(key, param[0])
    );

    if (String(mainFild) === String(param[1])) {
      required(key, values, [], message, filedList, cb);
    } else {
      cb(null, true);
    }
  } catch (ex) {
    console.log(
      `----------------Validation Exception At (requiredIf)-------------------`,
      `Input Key - ${key}`,
      `Exception - ${ex}`
    );

    cb(true);
  }
};

/**
 * @description compare two fields having same value
 * @param {string} key input value key
 * @param {object} values form values
 * @param {array} param additional validation parameters
 * @param {string} message Error message
 * @param {object} filedList display name for form elements
 * @param {Function} cb callback function
 */
const same = (key, values, param, message, filedList, cb) => {
  try {
    const valueOne = getInputsForValidateFn(values, key);
    const valueTwo = getInputsForValidateFn(values, param[0]);

    if (`${valueOne}` !== `${valueTwo}`) {
      message.replace(':other', filedList[param[0]]);
      cb(message);
    } else {
      cb(null, true);
    }
  } catch (ex) {
    console.log(
      `----------------Validation Exception At (same)-------------------`,
      `Input Key - ${key}`,
      `Exception - ${ex}`
    );
  }
};

/**
 * @description validate email address
 * @param {string} key input value key
 * @param {object} values form values
 * @param {array} param additional validation parameters
 * @param {string} message Error message
 * @param {object} filedList display name for form elements
 * @param {Function} cb callback function
 */
const email = (key, values, param, message, filedList, cb) => {
  try {
    const formValue = getInputsForValidateFn(values, key);
    // eslint-disable-next-line no-useless-escape
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formValue)) {
      cb(null, true);
    } else {
      cb(message);
    }
  } catch (ex) {
    console.log(
      `----------------Validation Exception At (email)-------------------`,
      `Input Key - ${key}`,
      `Exception - ${ex}`
    );

    cb(true);
  }
};

/**
 * @description validate max
 * @param {string} key input value key
 * @param {object} values form values
 * @param {array} param additional validation parameters
 * @param {string} message Error message
 * @param {object} filedList display name for form elements
 * @param {Function} cb callback function
 */
const max = (key, values, param, message, filedList, cb) => {
  try {
    const formValue = getInputsForValidateFn(values, key);
    if (formValue && formValue.length > param) {
      cb(message);
    } else {
      cb(null, true);
    }
  } catch (ex) {
    console.log(
      `----------------Validation Exception At (max)-------------------`,
      `Input Key - ${key}`,
      `Exception - ${ex}`
    );

    cb(true);
  }
};

/**
 * @description validate min
 * @param {string} key input value key
 * @param {object} values form values
 * @param {array} param additional validation parameters
 * @param {string} message Error message
 * @param {object} filedList display name for form elements
 * @param {Function} cb callback function
 */
const min = (key, values, param, message, filedList, cb) => {
  try {
    const formValue = getInputsForValidateFn(values, key);
    if (formValue && formValue.length < param) {
      cb(message);
    } else {
      cb(null, true);
    }
  } catch (ex) {
    console.log(
      `----------------Validation Exception At (min)-------------------`,
      `Input Key - ${key}`,
      `Exception - ${ex}`
    );

    cb(true);
  }
};

export { required, requiredIf, same, email, max, min };
