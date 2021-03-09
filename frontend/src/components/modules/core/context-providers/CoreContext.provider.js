/*
 * @Author: Nisal Madusanka(EruliaF) 
 * @Date: 2020-03-22 16:58:36 
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2020-08-06 08:31:29
 */

import React, { createContext, useReducer, useContext } from "react";
import { _get, _set } from "../../../../helpers/common-helpers/lodash.wrappers";

import { coreAction } from "../core-helpers/coreContext.helpers";
import { UIContext } from "../../../ui-components/context-providers/UIContext.provider";
import { FormContext } from "./FormContext.provider";
import {
    initDataTableKey, setDataTableKey, updateDataTableObjectKey,
    shortDataTableDataKey, setReloadDataTableKey, setApiResponseKey,
    updateDataTableFieldValueKey,initResponseKey,updateDataTableRowKey,
    setApiResponseErrorKey
} from "../../../../config/actionKeys.config";
import { apiResponseStoringType } from "../../../../config/apiResponseKey";

const initialState = {
    dataTableResponses: {},
    apiResponses: {},
    //_updateStatus:false 
};

const CoreContext = createContext({});

const uiReducer = (state, action) => {
    switch (action.type) {
        //init Data Table
        case initDataTableKey:
            return {
                ...state,
                dataTableResponses: {
                    ...state.dataTableResponses,
                    [action.stateKey]: {
                        "fetching": 'init',
                        "current_page": 1,
                        "page_count": null,
                        "per_page": 10,
                        "page_size":10,
                        "total": null,
                        "results": [],
                        "shortBy": {},
                        "_updateStatus": false
                    }
                }
            };
        case setDataTableKey:            
            return {
                ...state,
                dataTableResponses: {
                    ...state.dataTableResponses,
                    [action.stateKey]: {
                        ..._get(state, `dataTableResponses.${action.stateKey}`, {}),
                        "fetching": _get(action, 'fetching', 'done'),
                        "current_page": _get(action, 'current_page', 1),
                        "per_page": _get(action, 'per_page', 10),
                        "page_size": _get(action, 'page_size', 10),
                        "page_count": _get(action, 'page_count', 1),
                        "total": _get(action, 'total', null),
                        "results": _get(action, 'results', []),
                        "_updateStatus": !_get(state, `dataTableResponses.${action.stateKey}._updateStatus`, false)
                    }
                }
            }
        case shortDataTableDataKey:
            return {
                ...state,
                dataTableResponses: {
                    ...state.dataTableResponses,
                    [action.stateKey]: {
                        ...state.dataTableResponses[action.stateKey],
                        shortBy: {
                            ...state.dataTableResponses[action.stateKey].shortBy,
                            [action.key]: action.status,
                            "_updateStatus": !_get(state, `dataTableResponses.${[action.stateKey]}.shortBy._updateStatus`, false)
                        },
                        _updateStatus: !state.dataTableResponses[action.stateKey]["_updateStatus"]
                    }
                },

            };
        case updateDataTableObjectKey:
            return {
                ...state,
                dataTableResponses: {
                    ...state.dataTableResponses,
                    [action.stateKey]: {
                        ...state.dataTableResponses[action.stateKey],
                        ...action.playload,
                        _updateStatus: !state.dataTableResponses[action.stateKey]["_updateStatus"]
                    }
                },
            }
        case setReloadDataTableKey:
            return {
                ...state,
                dataTableResponses: {
                    ...state.dataTableResponses,
                    [action.stateKey]: {
                        ...state.dataTableResponses[action.stateKey],
                        _reloadDataTable: !_get(state, `dataTableResponses.${action.stateKey}._reloadDataTable`, false),
                        _updateStatus: !state.dataTableResponses[action.stateKey]["_updateStatus"]
                    }
                },
            }
        case updateDataTableFieldValueKey: {

            return {
                ...state,
                dataTableResponses: {
                    ...state.dataTableResponses,
                    [action.stateKey]: {
                        ...state.dataTableResponses[action.stateKey],
                        results: _set(state.dataTableResponses[action.stateKey]["results"], action.inputKey, action.value),
                        _updateStatus: !state.dataTableResponses[action.stateKey]["_updateStatus"]
                    }
                },
            }

        }

        case updateDataTableRowKey: {

            state.dataTableResponses[action.stateKey]["results"][action.index]=action.playload;

            return {
                ...state,
                dataTableResponses: {
                    ...state.dataTableResponses,
                    [action.stateKey]: {
                        ...state.dataTableResponses[action.stateKey],
                        results:state.dataTableResponses[action.stateKey]["results"], 
                        _updateStatus: !state.dataTableResponses[action.stateKey]["_updateStatus"]
                    }
                },
            }

        }
        
        case initResponseKey:
            return {
                ...state,
                apiResponses: {
                    ...state.apiResponses,
                    [action.stateKey]: {
                        result: [],
                        _updateStatus: !_get(state,`apiResponses.${action.stateKey}._updateStatus`,false),
                        status:"fetching"
                    }
                }
            }
        case setApiResponseKey:
            return {
                ...state,
                apiResponses: {
                    ...state.apiResponses,
                    [action.stateKey]: {
                        result: action.playload,
                        _updateStatus: !_get(state,`apiResponses.${action.stateKey}._updateStatus`,false),
                        status:"done"
                    }
                }
            }
        case setApiResponseErrorKey:            
            return {
                ...state,
                ..._set(state,action.path,action.playload)
            }   
        default:
            return state;
    }
}

const CoreContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(uiReducer, initialState);
    const [, uiDispatch] = useContext(UIContext);
    const [, formAction] = useContext(FormContext);
    const dispatchFuntion = coreAction(dispatch, uiDispatch, formAction);
    return (
        <CoreContext.Provider value={[state, dispatchFuntion]}>
            {children}
        </CoreContext.Provider>
    )
}

export {
    CoreContext,
    CoreContextProvider,
    apiResponseStoringType
}