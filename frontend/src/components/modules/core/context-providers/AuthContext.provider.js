/*
 * @Author: Nisal Madusanka(EruliaF) 
 * @Date: 2020-03-21 09:25:25 
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2020-06-12 19:11:39
 */

import React,{createContext,useReducer,useContext} from "react";

import {authAction} from "../core-helpers/authContext.helpers";
import {setAuthTokenKey,setUnauthorisedUserKey,setAuthUserObjectKey} from "../../../../config/actionKeys.config";

import {UIContext} from "../../../ui-components/context-providers/UIContext.provider"

const initialState={       
    accessToken: null,
    refreshToken:null,
    isAuthenticated: null,
    authUser:{
        "id":null,
        "name":null,
        "avatar":null,
        "organizations":[],
        "roles":[],
        "permissions":[]
    }
};

const AuthContext=createContext({});

const authReducer=(state, action)=>{
    switch (action.type) {
        case setAuthTokenKey:
            return {
                ...state, 
                accessToken:action.playload.access_token,
                refreshToken:action.playload.refresh_token,
                isAuthenticated:true
            };
        case setUnauthorisedUserKey:
            return {
                ...state, 
                ...initialState,
                isAuthenticated:false
            }  
        case setAuthUserObjectKey:
            return {
                ...state, 
                authUser:{
                    ...state.authUser,
                    ...action.playload,
                }
            }       
        default:
            return state;
    }
}

const AuthContextProvider=({children})=>{
    const [state,dispatch]=useReducer(authReducer,initialState);
    const [,uiDispatch]=useContext(UIContext);
    const dispatchFuntion=authAction(dispatch,uiDispatch);
    return(
        <AuthContext.Provider value={[state,dispatchFuntion]}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthContext,
    AuthContextProvider
}