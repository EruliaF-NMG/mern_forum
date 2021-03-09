/*
 * @Author: Nisal Madusanka(EruliaF) 
 * @Date: 2020-03-27 21:03:12 
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2020-06-23 09:40:48
 */
import React from 'react';
import {Route} from 'react-router-dom';
import {permissions} from "../../../../config/permission.config";

const Navigate=({
    component: Component,
    ...rest 
})=>{
    return <Route
                {...rest}
                render={(props) => <Component
                            {...props}
                            routeKey={rest.routeKey||""}
                            routePermissions={rest.routePermissions||permissions.NONE.permissions}
                        />}
            />
}


export {
    Navigate
}