/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Description: Material Tab Component
 * @Date: 2020-02-12 ‏‎11:33:36
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-05-18 08:39:34
 */

import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import {Icon} from "../common/BaseElements";
import {_round, _without, _size} from "../../../../helpers/common-helpers/lodash.wrappers";
import {templateTypes, defaultTemplateType} from "../../../../config/template.config";


const emptyFun = (...para) => undefined;

/**
 * --------------------------------------------
 * @Author: Nisal Madusanka(EruliaF)
 * @Description: Tab Wrapper
 * --------------------------------------------
 */

// TabsWrapper variant options
const tabsWrapperVariants = {
    standard: "standard",
    scrollable: "scrollable",
    fullWidth: "fullWidth"
};

// TabsWrapper scrollButtons options
const tabsWrapperScrollButtons = {
    auto: "auto",
    desktop: "desktop",
    on: "on",
    off: "off"
};

// TabsWrapper orientation options
const tabsWrapperOrientations = {
    horizontal: "horizontal",
    vertical: "vertical"
};

const TabsWrapper = ({
    uiType = defaultTemplateType,
    elementWrapperStyle = "",
    elementStyle = "",
    isTabFullWidth = true,
    active = "",
    variant = "scrollable",
    children = null,
    scrollButtons = "on",
    orientation = "horizontal",
    onChangeFn = emptyFun
}) => {
    let bodyList = {};

    return (
        <div className={`defaultTabsWrapper ${elementWrapperStyle}`}>

            <div className={`${uiType}TabsWrapper`}>
                <AppBar className={`defaultAppBarWrapper`} position="static">
                    <Tabs
                        value={active}
                        className={`defaultTab ${elementStyle}`}
                        variant={variant}
                        scrollButtons={scrollButtons}
                        orientation={orientation}
                        onChange={(event, value) => onChangeFn({ eventInfo: event, value: value })}
                    >
                        {
                            React.Children.map(children, (child, i) => {
                                if (child) {
                                    bodyList[child.props.tabid] = child;
                                    let styleList = {};
                                    if (isTabFullWidth) {
                                        let width = (100 / (_size(_without(children, null))));
                                        width = _round(width, 2);
                                        styleList = { width: width + "%", maxWidth: "none" }
                                    }
                                    return (
                                        <Tab
                                            className={`${(child.props.tabid === active) ? "defaultTabItemWrapper activeTab" : "defaultTabItemWrapper"}`}
                                            style={styleList}
                                            value={child.props.tabid}
                                            label={child.props.header}
                                            icon={(child.props.icon !== null) ? <Icon iconClass={child.props.icon} /> : null}
                                        />
                                    );
                                }
                            })
                        }
                    </Tabs>
                </AppBar>
            </div>

            <div className={`defaultTabItemBodyWrapper ${uiType}TabItemBodyWrapper`}>
                {bodyList[active]}
            </div>

        </div>
    );
};

const SubTab = (props) => {
    return (
        <div tabid={props.tabid} header={props.header} headerclassname={props.headerclassname} icon={props.icon}>
            {props.children}
        </div>
    );
}

/**
 * --------------------------------------------
 * @Author: Nisal Madusanka(EruliaF)
 * @Description: Tab Wrapper
 * --------------------------------------------
 */

TabsWrapper.propTypes = {
    /** TabsWrapper type */
    uiType: PropTypes.oneOf([templateTypes.material, templateTypes.bootstrap]),
    /** Tabs Wrapper css class */
    elementWrapperStyle: PropTypes.string,
    /** Tabs element css class */
    elementStyle: PropTypes.string,
    /** Is table full width or not */
    isTabFullWidth: PropTypes.bool,
    /** Active tab */
    active: PropTypes.any,
    /** Variant */
    variant: PropTypes.oneOf(['standard', 'scrollable', 'fullWidth']),
    /** Childrens */
    children: PropTypes.node,
    /** Scroll buttons */
    scrollButtons: PropTypes.oneOf(['auto', 'desktop', 'on', 'off']),
    /** Orientation */
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
    /** Onchange element function */
    onChangeFn: PropTypes.func
};

//----------------TabsWrapper---------------------

export {
    TabsWrapper, 
    SubTab,
    tabsWrapperVariants,
    tabsWrapperOrientations,
    tabsWrapperScrollButtons
};