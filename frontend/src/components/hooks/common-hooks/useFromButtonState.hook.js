/*
 * @Author: Nisal Madusanka(EruliaF) 
 * @Date: 2020-05-19 15:55:01 
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2020-06-10 18:00:11
 */

import { useContext,useMemo,useCallback } from 'react';

import {_get} from "../../../helpers/common-helpers/lodash.wrappers";
import {getDataByFormObject} from "../../../helpers/common-helpers/common.helpers";
import { FormContext } from "../../modules/core/context-providers/FormContext.provider";
import { CoreContext } from "../../modules/core/context-providers/CoreContext.provider";

const emptyFun = (...para) => undefined;

const useBasicButton=(onClickFn=emptyFun,formGroupName="",mergeToForm=null)=>{
    
    const [formState,formAction]= useContext(FormContext);   
    const [coreState,coreAction]= useContext(CoreContext);   

    const updateStatus = useMemo(() => {
        return  _get(formState,`${formGroupName}._updateStatus`,undefined);
    }, [formGroupName,formState]);

     const handleOnClickFn = useCallback(
        (eventData) => {
            if(mergeToForm!=null){
                console.log("mergeFormObject");
                formAction.mergeFormObject(formGroupName,mergeToForm);
            }
           
            onClickFn({
                ...eventData,
                "formObject":_get(formState,`${formGroupName}`,{}),
                "formAction":formAction,
                "coreState":coreState,
                "coreAction":coreAction
            });
        },
        [formAction,formState,mergeToForm,formGroupName,onClickFn,coreState,coreAction],
    )

    return [handleOnClickFn,updateStatus];
}

const useAPIBaseButton=(apiDataStoringObject={},flashMessages={},dataTableKey="",formGroupName="",validationObject={},callApiObject={},isValidate=false,onClickFn=emptyFun,onGetAPIEndPointFn=emptyFun,onChangeRequestBodyFn=emptyFun,onResponseCallBackFn=emptyFun)=>{

    const [formState]= useContext(FormContext);   
    const [coreState, coreAction] = useContext(CoreContext);

    const updateStatus = useMemo(() => {
        return  _get(formState,`${formGroupName}._updateStatus`,undefined);
    }, [formGroupName,formState]);

    const responseUpdateStatus = useMemo(() => {
        if(formGroupName.includes("dataTableResponses") || formGroupName.includes("apiResponses")){
            return _get(coreState,`${formGroupName}._updateStatus`,undefined);
        }else{
            return false;
        }
    }, [formGroupName,coreState]);

    const currentFormObject= useMemo(() => {
        if(formGroupName.includes("dataTableResponses") || formGroupName.includes("apiResponses")){
            return _get(coreState,`${formGroupName}`,{});
        }else{
            return _get(formState,`${formGroupName}`,{});
        }
    }, [formGroupName,coreState,formState]);

    const apiUrlObject = useMemo(() => {
        return  onGetAPIEndPointFn(currentFormObject);
    }, [currentFormObject,onGetAPIEndPointFn]);


    const handleOnClickFn = useCallback(
        (eventData) => {
            if(apiUrlObject){

                let formData={};
                formData=onChangeRequestBodyFn(currentFormObject);
                if(!formData){
                    formData=getDataByFormObject(currentFormObject);
                }

                let apiObj= coreAction.sendRequestFn(apiUrlObject.url)
                    .setFullObject(apiDataStoringObject,callApiObject)
                    .body(formData)
                    .setFlashMessages(flashMessages)
                    .setInitStoring(apiDataStoringObject.storingType,{
                        "form":formGroupName,
                        "responseKey":apiUrlObject.key,
                        "dataTable":dataTableKey
                    });

                    if(isValidate){
                        apiObj.setValidationObject(validationObject.fileds,validationObject.rules,validationObject.message);
                    }            
                    apiObj.send(onResponseCallBackFn);

            }else{
                onClickFn(eventData);
            }          
        },
        [coreAction,formGroupName,apiUrlObject,currentFormObject,apiDataStoringObject,flashMessages,dataTableKey,isValidate,validationObject,callApiObject,onClickFn,onChangeRequestBodyFn,onResponseCallBackFn],
    );

    return [handleOnClickFn,updateStatus,responseUpdateStatus];
}

export {
    useBasicButton,
    useAPIBaseButton
}