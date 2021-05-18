/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2020-05-08 16:50:52
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-05-18 08:40:05
 */
import React from 'react';

import { Navigate } from "../../ui-components/ui-elements/common/Navigate";
import PageError from "./pages/PageError";


const ErrorBoundaryRoutes = () => {
    return (
        <Navigate path="/page-error" exact={true} component={PageError} />
    )
};

export default ErrorBoundaryRoutes;
