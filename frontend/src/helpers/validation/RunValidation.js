/*
 * @Author: Nisal Madusanka(EruliaF) 
 * @Date: 2019-08-10 09:26:46 
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2020-06-11 15:13:58
 */
import { errorMessageList } from '../../config/validation.config';
import { _asyncEachOf, _asyncEachOfLimit } from '../common-helpers/asyncMethodWrapper.helpers';
import * as validateMethos from "./validation-methods";
import { mapInputKey } from '../common-helpers/common.helpers';
import { _get } from '../common-helpers/lodash.wrappers';



export default class RunValidation {

    constructor(formObject) {
        this.rules = formObject.rules;
        this.fileds = formObject.fileds;
        this.message = formObject.message;
        this.formObject = formObject.formObject;
    }

    /**
     * @author Nisal Madusanka(EruliaF)
     * @description run validation
     * @param {*} cb callback function
     */
    validate(cb) {
        let errorList = {
            __status: false,
            details: []
        };

        _asyncEachOf(this.rules, (rulesItem, rulesKey, callback) => {


            this.spreadAllValidationRules(rulesKey, (error, sucess) => {

                if (error) {
                    if (rulesKey.indexOf('*') > -1) {
                        errorList = {
                            ...errorList,
                            __status: true,
                            details: [
                                ...errorList.details,
                                ...error,
                            ]
                        };
                    } else {  
                        errorList = {
                            ...errorList,
                            __status: true,
                            details: [
                                ...errorList.details,
                                {
                                    "property": rulesKey,
                                    "message": error
                                }
                            ]
                        };
                    }
                }

                callback(null);
            });


        }, (error) => {
            if (errorList.__status === true) {
                cb(errorList.details);
            } else {
                cb(null, true);
            }
        })
    }

    spreadAllValidationRules(rulesKey, cb) {

        //check input items have any unknown columns (*)
        if (rulesKey.indexOf('*') > -1) {  
              
          const inputKeyList=  this.genarateInputKeys(rulesKey);
            let errorList =[]
          
          _asyncEachOf(inputKeyList, (inputKey, inputKeyindex, callback) => {
                
            const subRulesSet = this.rules[rulesKey].split("|");
                this.checkValidity(inputKey, subRulesSet, rulesKey, (error, sucess)=>{
                    if (error) {
                        errorList= [
                            ...errorList,
                            {
                                "property": inputKey,
                                "message": error
                            }
                        ]
                    }
                    callback(null);
                });

          },(error)=>{
            if (errorList.length >=1) {
                cb(errorList);
            } else {
                cb(null, true);
            }
          })


        } else {
            //const displyName = this.getFiledName(rulesKey);
            const subRulesSet = this.rules[rulesKey].split("|");
            this.checkValidity(rulesKey, subRulesSet, rulesKey, cb);
        }


    }

    checkValidity(inputKey, subRulesSet, rulesKey, cb) {



        try {

            _asyncEachOfLimit(subRulesSet, 1, (subRule, subKey, callback) => {

                let param = [];
                let method = subRule;
                if (subRule.includes(":")) {
                    param = subRule.split(":");
                    method = param[0];
                    param = param[1].split(",");
                }
                console.log("////////////////", method)
                let message = this.getMessage(inputKey, method, param,rulesKey);

                validateMethos[method](inputKey, this.formObject, param, message, this.fileds, (error, sucess) => {

                    if (error) {
                        callback(error);
                    } else {
                        callback(null)
                    }
                });



            }, (error) => {
                if (error) {
                    cb(error)
                } else {
                    cb(null, true)
                }
            });

        } catch (ex) {
            console.log(ex);
            cb(ex)
        }
    }

    getMessage(inputKey, method, param,rulesKey) {

        try {

            let messsage = ((this.message) && (this.message.hasOwnProperty(`${rulesKey}.${method}`))) ? this.message[`${rulesKey}.${method}`] : errorMessageList[method] || "";

            messsage = messsage.replace(":attribute", this.getFiledName(rulesKey));
            messsage = messsage.replace(":" + method, param);

            return messsage;

        } catch (ex) {
            console.log('----------------Validation Exception-------------------' + '\n' +
                'Exception occurred at executing ---- getMessage-' + method + '\n' +
                '' + (ex) + '\n' +
                '------------------------------------------------');
            return 'Error Message';
        }

    }


    //---

    getFiledName(key) {
        if (this.fileds) {
            if (this.fileds.hasOwnProperty(key)) {
                return this.fileds[key];
            } else {
                return key;
            }
        } else {
            return key;
        }
    }


    genarateInputKeys(rulesKey){
        const subKeyList= rulesKey.split("*"); 
        let firstKey=subKeyList[0];
        let textCount=firstKey.length;        
        let inputList=[];
        if (firstKey.slice(-1)==="."){
            firstKey=firstKey.slice(0, -1)   
        }        
        _get(this.formObject,firstKey,[]).map((value,index)=>{
            let dumyKey=rulesKey;
            inputList.push(dumyKey.replace("*", index));
        });
        return inputList;
    }


}