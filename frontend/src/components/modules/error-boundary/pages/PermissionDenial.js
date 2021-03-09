/*
 * @Author: Nisal Madusanka(EruliaF) 
 * @Date: 2020-06-23 10:10:15 
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2020-06-23 10:19:57
 */
import React from "react";
import { Link } from "react-router-dom";

const PermissionDenial=()=>{
    return (
        <div className="errorBackGround">
            <div className="itemWrapper">
                <h1>Permission Denied...!!</h1>
                <Link to={"/"}>
                    <h6 className={""}>Go back to:- Dashboard</h6>
                </Link>
            </div>
        </div>
    )
}


export {
    PermissionDenial
}