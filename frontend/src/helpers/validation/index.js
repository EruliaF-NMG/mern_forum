/*
 * @Author: Nisal Madusanka(EruliaF) 
 * @Date: 2019-08-10 08:56:10 
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2020-06-24 11:46:34
 */

import RunValidation from "./RunValidation"; 

const validate=(formObject)=>{   
    var validateObject={
        rules:{},
        fileds:{},
        message:{},
        formObject:formObject
    };
    return {  
        setRules:function(rules){
            validateObject={
                ...validateObject,
                rules:rules
            };
            return this;
        },setFileds:function(fileds){
            validateObject={
                ...validateObject,
                fileds:fileds
            };
            return this;
        },setMessage:function(message){
            validateObject={
                ...validateObject,
                message:message
            };
            return this;
        },run:function(cb){            
            const validateObj=new RunValidation(validateObject);
            return validateObj.validate(cb);            
        }
    }
}

export default validate;