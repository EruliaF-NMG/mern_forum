/*
 * @Author: Chanaka Wickramasinghe
 * @Description: Error Page
 * @Date: 2020-05-08 16:48:15
 * @Last Modified by: Chanaka Wickramasinghe
 * @Last Modified time: 2020-05-08 16:48:15
 */
import React from "react";
import { Link } from "react-router-dom";

import { UICard } from "../../../ui-components/ui-elements/common/BaseElements";


const PageError = () => {

    return (
        <div className={"container-fluid error-overlay"}>

            <div className={"row justify-content-center"}>

                <div className={"col-md-6"}>

                    <UICard
                        elementStyle={"error-card"}
                    >
                        <div className={"text-center"}>
                            <h1>Page is under constructing</h1>
                            <Link to={"/"}>
                                <h6 className={"mt-4"}>Go back to:- Dashboard</h6>
                            </Link>
                        </div>
                    </UICard>

                </div>

            </div>

        </div>
    )
};

export default PageError;
