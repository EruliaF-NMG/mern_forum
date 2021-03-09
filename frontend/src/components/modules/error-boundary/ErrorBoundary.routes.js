/*
 * @Author: Chanaka Wickramasinghe
 * @Date: 2020-05-08 16:50:52
 * @Last Modified by: Chanaka Wickramasinghe
 * @Last Modified time: 2020-05-08 16:50:52
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
