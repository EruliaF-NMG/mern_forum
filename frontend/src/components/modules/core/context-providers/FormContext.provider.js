/*
 * @Author: Nisal Madusanka(EruliaF) 
 * @Date: 2020-02-28 18:03:18 
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2020-05-15 12:33:10
 */

import React,{createContext,useReducer} from "react";

import {formActionFn} from "../core-helpers/formContext.helpers";
import {_set} from "../../../../helpers/common-helpers/lodash.wrappers";
import {
    initFormGroupKey,removeFormGroupKey,setInputValueChangeKey,
    setComplexInputValueChangeKey,setErrorsKey,mergeFormObjectKey
} from "../../../../config/actionKeys.config";


const initialState={       
   // _updateStatus:false 
}

const FormContext=createContext({});

const uiReducer=(state, action)=>{    
    switch (action.type) {
        case initFormGroupKey:
            return {
                ...state,
                ...action.playload
            };           
        case removeFormGroupKey:
            delete state[action.playload];
            return state; 
        case setInputValueChangeKey:   
            return {
                ...state,
                [action.formGroupKey]:{
                    ...state[action.formGroupKey],
                    [action.inputKey]:action.value,
                    _updateStatus:!state[action.formGroupKey]["_updateStatus"]
                }
            }; 
        case setErrorsKey:
            return {
                ...state,
                [action.formGroupKey]:{
                    ...state[action.formGroupKey],
                    _errors:action.playload,
                    _updateStatus:!state[action.formGroupKey]["_updateStatus"]
                }
            };
        case setComplexInputValueChangeKey:   
            
            return {
                ...state,
                [action.formGroupKey]:{
                    ..._set(state,action.inputStatePath,action.value)[action.formGroupKey],
                    _updateStatus:!state[action.formGroupKey]["_updateStatus"],                    
                }
            };   
        case mergeFormObjectKey:   
            return {
                ...state,
                [action.formGroupKey]:{
                    ...state[action.formGroupKey],
                    ...action.playload,
                    _updateStatus:!state[action.formGroupKey]["_updateStatus"],
                    
                }
            };   
        default:
            return state;
    }
}


const FormContextProvider=({children})=>{
    const [state,dispatch]=useReducer(uiReducer,initialState);
    const dispatchFn=formActionFn(dispatch);
    return(
        <FormContext.Provider value={[state,dispatchFn]}>
            {children}
        </FormContext.Provider>
    )
}

export {
    FormContext,
    FormContextProvider
}