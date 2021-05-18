/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Description: Display Error Page
 * @Date: 2020-05-08 16:02:44
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-05-18 08:40:02
 */

import React from "react";
import { Link } from "react-router-dom";

import { UICard } from "../../../ui-components/ui-elements/common/BaseElements";


const DisplayError = () => {
    const reload = () => {
        setTimeout(() => {
            window.location.reload()
        }, 100)
    };

    return (
        <div className={"container-fluid error-overlay"}>

            <div className={"row justify-content-center"}>

                <div className={"col-md-6"}>

                    <UICard
                        elementStyle={"error-card"}
                    >
                        <div className={"text-center"}>
                            <h1>Page is under constructing</h1>
                            <Link to={"/"} onClick={reload}>
                                <h6 className={"mt-4"}>Go back to:- Dashboard</h6>
                            </Link>
                        </div>
                    </UICard>

                </div>

            </div>

        </div>
    )
};

export default DisplayError;
