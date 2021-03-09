/*
 * @Author: Nisal Madusanka(EruliaF) 
 * @Date: 2020-06-12 19:25:34 
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2020-06-12 21:16:11
 */
import { useContext,useMemo,useCallback } from 'react';

import {AuthContext} from "../../modules/core/context-providers/AuthContext.provider";
import {_intersection} from "../../../helpers/common-helpers/lodash.wrappers";
import {permissions} from "../../../config/permission.config";

const usePermission=()=>{

    const [authStatus] = useContext(AuthContext);

    const permissionsList = useMemo(() => {
        return authStatus.authUser.permissions
    }, [authStatus]);

    const checkISAllowedFn = useCallback((permission)=>{

        if(permission===permissions.NONE.key){
            return true
        }else{

            if(typeof permission==="string"){
                permission=[permission];
            }
            const result =_intersection(permissionsList, permission);

            if(result.length===0){
                return false;
            }else{
                return true;   
            }
        }
        
    },[permissionsList]);
    
    return [permissionsList,checkISAllowedFn];
}

export {
    usePermission
}