/*
 * @Author: Nisal Madusanka(EruliaF) 
 * @Date: 2020-02-28 18:03:34 
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2020-05-12 15:54:45
 */

 import {
    initFormGroupKey,removeFormGroupKey,setInputValueChangeKey,
    setComplexInputValueChangeKey,setErrorsKey,mergeFormObjectKey
 } from "../../../../config/actionKeys.config";

/**
 * @author Nisal Madusanka (EruliaF)
 * @description init from group
 * @param {Object} dispatch
 * @param {Object} object 
 */
const initFromFn=(dispatch,object)=>{
    dispatch({
        type:initFormGroupKey,
        playload:object
    });
};

/**
 * @author Nisal Madusanka (EruliaF)
 * @description generate form group object
 * @param {*} dispatch 
 * @param {*} formGroupKey 
 */
const initFromObjectFn=(dispatch,formGroupKey)=>{    
    var attributes = {
        _uibackProsess:false,
        _formGroupLinkKey:formGroupKey,
        _uiFormGroup:formGroupKey,
        _uiFormDescription:formGroupKey,
        _updateStatus:false,
        _onLoad:false,
        _errors:[]
    };
    return {
        isBackProsess:function(status=false) {
            attributes = {
                ...attributes,
                _uibackProsess: status
            };
            return this;
        },
        setDescription:function(description="") {
            attributes = {
                ...attributes,
                _uiFormDescription: description
            };
            return this;
        },
        setGroupName:function(group="") {
            attributes = {
                ...attributes,
                _uiFormGroup: group
            };
            return this;
        },
        setLinkWithOthers:function(formGroupLinkKey="") {
            attributes = {
                ...attributes,
                _formGroupLinkKey: formGroupLinkKey
            };
            return this;
        },
        setFormObject:function(formObject) {
            attributes = {
                ...attributes,
                ...formObject
            };
            return this;
        },
        setOnLoad:function(isload=false) {
            attributes = {
                ...attributes,
                _onLoad: isload
            };
            return this;
        },
        generate:function() {
            return initFromFn(dispatch,{
                [formGroupKey]:attributes
            });
        }
    }
};

/**
 * @author Nisal Madusanka (EruliaF)
 * @description remove form group
 * @param {*} dispatch 
 * @param {*} formGroupKey 
 */
const removeFromGroupFn=(dispatch,formGroupKey)=>{
    dispatch({
        type:removeFormGroupKey,
        playload:formGroupKey
    });
} 


/**
 * @author Nisal Madusanka (EruliaF)
 * @description set form error
 * @param {*} dispatch 
 * @param {*} formGroupKey 
 * @param {*} errors 
 */
const setFormErrorFn=(dispatch,formGroupKey,errors)=>{
    dispatch({
        type:setErrorsKey,
        formGroupKey:formGroupKey,
        playload:errors
    });
} 

/**
 * @author Nisal Madusanka (EruliaF)
 * @description set form input change
 * @param {String} formGroupKey 
 * @param {String} inputKey 
 * @param {String} inputStatePath 
 * @param {String|Integer|Object|Array} value 
 */
const changeInputFn=(dispatch,formGroupKey,inputKey,inputStatePath,value)=>{
    if(!inputStatePath){       
        dispatch({
            type:setInputValueChangeKey,
            formGroupKey:formGroupKey,
            inputKey:inputKey,
            value:value
        });
    }else{
       
        dispatch({
            type:setComplexInputValueChangeKey,
            formGroupKey:formGroupKey,
            inputStatePath:inputStatePath,
            value:value
        }); 
    }
}


const mergeFormObject=(dispatch,formGroupKey,data)=>{
    dispatch({
        type:mergeFormObjectKey,
        formGroupKey:formGroupKey,
        playload:data
    }); 
}



 /**
 * @author Nisal Madusanka (EruliaF)
 * @description connect all methods as one
 * @param {Object} dispatch 
 */
const formActionFn=(dispatch)=>{
    return {    
        initFromFn:(object)=>initFromFn(dispatch,object), 
        initFromObjectFn:(formGroupKey)=>initFromObjectFn(dispatch,formGroupKey),  
        removeFromGroupFn:(formGroupKey)=>removeFromGroupFn(dispatch,formGroupKey),
        changeInputFn:(formGroupKey,inputKey,inputStatePath,value)=>changeInputFn(dispatch,formGroupKey,inputKey,inputStatePath,value),
        setFormErrorFn:(formGroupKey,errors)=>setFormErrorFn(dispatch,formGroupKey,errors),
        mergeFormObject:(formGroupKey,data)=>mergeFormObject(dispatch,formGroupKey,data)
    }
}

export {
    formActionFn
}
