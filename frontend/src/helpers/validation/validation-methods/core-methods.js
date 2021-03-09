/*
 * @Author: Nisal Madusanka(EruliaF) 
 * @Date: 2019-08-10 09:30:00 
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2020-06-24 12:48:26
 */

import { _isNumber } from "../../common-helpers/lodash.wrappers";
import { getInputsForValidate, mapInputKey,isEmptyValue } from "../../common-helpers/common.helpers";

/**
 * @author Nisal Madusanka(EruliaF)
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

        let formValue = getInputsForValidate(values, key);
        if (isEmptyValue(formValue)) {
            cb(message)
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
}


/**
 * @author Nisal Madusanka(EruliaF)
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

        let mainFild = getInputsForValidate(values, mapInputKey(key, param[0]));

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
}


/**
 * @author Nisal Madusanka(EruliaF)
 * @description validate required if on another field
 * @param {string} key input value key
 * @param {object} values form values
 * @param {array} param additional validation parameters
 * @param {string} message Error message
 * @param {object} filedList display name for form elements
 * @param {Function} cb callback function
 */
const requiredIFEmpty = (key, values, param, message, filedList, cb) => {
    try {        

        let formValue = getInputsForValidate(values, key);
        if(isEmptyValue(formValue)){
            required(mapInputKey(key, param[0]), values, [], message, filedList, cb);
        }else {
            cb(null, true);
        }
        

    } catch (ex) {
        console.log(
            `----------------Validation Exception At (requiredIFEmpty)-------------------`,
            `Input Key - ${key}`,
            `Exception - ${ex}`
        );

        cb(true);
    }
}



/**
 * @author Nisal Madusanka(EruliaF)
 * @description check is numeric
 * @param {string} key input value key
 * @param {object} values form values
 * @param {array} param additional validation parameters
 * @param {string} message Error message
 * @param {object} filedList display name for form elements
 * @param {Function} cb callback function
 */
const numeric = (key, values, param, message, filedList, cb) => {
    try {

        const formValue = getInputsForValidate(values, key);
        if (formValue && !_isNumber(formValue)) {
            cb(message)
        } else {
            cb(null, true);
        }

    } catch (ex) {
        console.log(
            `----------------Validation Exception At (numeric)-------------------`,
            `Input Key - ${key}`,
            `Exception - ${ex}`
        );

        cb(true);
    }
}

const same = (key, values, param, message, filedList, cb) => {
    try {

        const valueOne = getInputsForValidate(values, key);
        const valueTwo = getInputsForValidate(values, param[0]);

        if (valueOne != valueTwo) {
            message = message.replace(":other", filedList[param[0]]);
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

}

/**
 * @author Nisal Madusanka(EruliaF)
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

        let formValue = getInputsForValidate(values, key);
        if (formValue && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formValue)) {
            cb(null, true);
        } else {
            cb(message)
        }

    } catch (ex) {
        console.log(
            `----------------Validation Exception At (required)-------------------`,
            `Input Key - ${key}`,
            `Exception - ${ex}`
        );

        cb(true);
    }
}

/**
 * @author LahiruC
 * @description validate alpha numeric
 * @param {string} key input value key
 * @param {object} values form values
 * @param {array} param additional validation parameters
 * @param {string} message Error message
 * @param {object} filedList display name for form elements
 * @param {Function} cb callback function
 */
const alphaNumeric = (key, values, param, message, filedList, cb) => {
    try {

        const formValue = getInputsForValidate(values, key);
        if (formValue && /[^0-9a-zA-Z]/.test(formValue)) {
            cb(message);
        } else {
            cb(null, true)
        }

    } catch (ex) {
        console.log(
            `----------------Validation Exception At (alphaNumeric)-------------------`,
            `Input Key - ${key}`,
            `Exception - ${ex}`
        );

        cb(true);
    }
}

/**
* @author LahiruC
* @description validate alpha special
* @param {string} key input value key
* @param {object} values form values
* @param {array} param additional validation parameters
* @param {string} message Error message
* @param {object} filedList display name for form elements
* @param {Function} cb callback function
*/
const alphaSpecial = (key, values, param, message, filedList, cb) => {
    try {

        var regexp = /^[a-zA-Z0-9-_]+$/;
        const formValue = getInputsForValidate(values, key);
        if (formValue.search(regexp) === -1)
            cb(message);
        else
            cb(null, true)


    } catch (ex) {
        console.log(
            `----------------Validation Exception At (alphaSpecial)-------------------`,
            `Input Key - ${key}`,
            `Exception - ${ex}`
        );

        cb(true);
    }
}

/**
 * @author LahiruC
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
        const formValue = getInputsForValidate(values, key);
        if (formValue && formValue.length > param) {
            cb(message);
        } else {
            cb(null, true)
        }

    } catch (ex) {
        console.log(
            `----------------Validation Exception At (max)-------------------`,
            `Input Key - ${key}`,
            `Exception - ${ex}`
        );

        cb(true);
    }
}

/**
 * @author LahiruC
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
        const formValue = getInputsForValidate(values, key);
        if (formValue && formValue.length < param) {
            cb(message);
        } else {
            cb(null, true)
        }

    } catch (ex) {
        console.log(
            `----------------Validation Exception At (min)-------------------`,
            `Input Key - ${key}`,
            `Exception - ${ex}`
        );

        cb(true);
    }
}

/**
 * @author Nisal Madusanka(EruliaF) 
 * @description validate max
 * @param {string} key input value key
 * @param {object} values form values
 * @param {array} param additional validation parameters
 * @param {string} message Error message
 * @param {object} filedList display name for form elements
 * @param {Function} cb callback function
 */
const maxAmount = (key, values, param, message, filedList, cb) => {
    try {
        const formValue = getInputsForValidate(values, key);
        if (formValue && parseFloat(formValue) > parseFloat(param[0])) {
            cb(message);
        } else {
            cb(null, true)
        }

    } catch (ex) {
        console.log(
            `----------------Validation Exception At (maxAmount)-------------------`,
            `Input Key - ${key}`,
            `Exception - ${ex}`
        );

        cb(true);
    }
}

/**
 * @author Nisal Madusanka(EruliaF) 
 * @description validate max
 * @param {string} key input value key
 * @param {object} values form values
 * @param {array} param additional validation parameters
 * @param {string} message Error message
 * @param {object} filedList display name for form elements
 * @param {Function} cb callback function
 */
const minAmount = (key, values, param, message, filedList, cb) => {
    try {
        const formValue = getInputsForValidate(values, key);
        if (formValue && parseFloat(formValue) < parseFloat(param[0])) {
            cb(message);
        } else {
            cb(null, true)
        }

    } catch (ex) {
        console.log(
            `----------------Validation Exception At (minAmount)-------------------`,
            `Input Key - ${key}`,
            `Exception - ${ex}`
        );

        cb(true);
    }
}


/**
 * @author Nisal Madusanka(EruliaF) 
 * @description validate max
 * @param {string} key input value key
 * @param {object} values form values
 * @param {array} param additional validation parameters
 * @param {string} message Error message
 * @param {object} filedList display name for form elements
 * @param {Function} cb callback function
 */
const requiredAtleastOne = (key, values, param, message, filedList, cb) => {
    try {

        let status=false;
        param.forEach((value,index)=>{
            const formValue=getInputsForValidate(values, mapInputKey(key, value));
            if (formValue && formValue !== "null" && formValue !== "undefined" && formValue !== "" && formValue !== null) {
                status=true;                
                return false;                              
            }
        });
        
        if(status===false){
            cb(null, true);
        }else{
            required(key, values, [], message, filedList, cb);  
        }

    } catch (ex) {
        console.log(
            `----------------Validation Exception At (requiredAtleastOne)-------------------`,
            `Input Key - ${key}`,
            `Exception - ${ex}`
        );

        cb(true);
    }
}



export {
    required,
    requiredIf,
    numeric,
    same,
    email,
    alphaNumeric,
    alphaSpecial,
    max,
    min,
    maxAmount,
    minAmount,
    requiredAtleastOne,
    requiredIFEmpty
}