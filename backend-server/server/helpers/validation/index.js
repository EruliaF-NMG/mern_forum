/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-06 19:52:40
 * @Last Modified by:   Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-06 19:52:40
 */

import RunValidation from './run-validation';

const validate = (formObject) => {
  let validateObject = {
    rules: {},
    fileds: {},
    message: {},
    formObject,
  };
  return {
    setRules(rules) {
      validateObject = {
        ...validateObject,
        rules,
      };
      return this;
    },
    setFileds(fileds) {
      validateObject = {
        ...validateObject,
        fileds,
      };
      return this;
    },
    setMessage(message) {
      validateObject = {
        ...validateObject,
        message,
      };
      return this;
    },
    run(cb) {
      const validateObj = new RunValidation(validateObject);
      return validateObj.validate(cb);
    },
  };
};

export default validate;
