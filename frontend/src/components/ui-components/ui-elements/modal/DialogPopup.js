/*
 * @Author: Chanaka Wickramasinghe
 * @Description: Material Dialog Popup
 * @Date: 2020-02-13 09:42:12
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2020-07-08 10:28:00
 */

import React  from 'react';
import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import {InputButton,InputButtonWithState} from "../form/Button";
import {ToolBarWrapper, Icon,VariableToComponent} from "../common/BaseElements";
import {useScreenType,screenSizeTypes} from "../../../hooks/common-hooks/useScreenStatus.hook";


const emptyFun = (...para) => undefined;

/**
 * --------------------------------------------
 * @Author: Chanaka Wickramasinghe
 * @Description: Dialog Popup Wrapper
 * --------------------------------------------
 */

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// DialogPopup save button object
const saveBtn = {
    btnText: "Save",
    btnName: "save_model",
    startIcon: "far fa-save",
    elementStyle: "buttonSuccess",
    isBtnDisabled: false
};

// DialogPopup close button object
const closeBtn = {
    btnText: "Close",
    btnName: "close_model",
    startIcon: "far fa-times-circle",
    elementStyle: "buttonSuccess",
    isBtnDisabled: false
};

// DialogPopup custom button object
const customBtn = {
    btnText: "Custom",
    btnName: "save_model",
    startIcon: "",
    elementStyle: "buttonSuccess",
    isBtnDisabled: false,
    onClickFn: emptyFun
};

// DialogPopup maxWidth options
const dialogPopupMaxWidth = {
    large: "lg",
    medium: "md",
    small: "sm",
    extraLarge: "xl",
    extraSmall: "xs",
    false: false
};


const DialogPopup=({
    isFullScreen = false,
    isOpen = false,
    isFullWidth = false,
    maxWidth = dialogPopupMaxWidth.small,
    formGroupName="none",
    dialogWrapperStyle = "",
    appBarWrapperStyle = "",
    dialogContentWrapperStyle = "",
    dialogActionWrapperStyle = "",
    children = (null),
    isCustomButton = false,
    customButtonComponent=null,
    isSaveButton = true,
    saveButton = saveBtn,
    closeButton = closeBtn,
    isDialogActions = true,
    dialogTitle = "",
    isCloseButton = false,
    onSaveFn = emptyFun,
    onClosePopupFn = emptyFun
})=>{   


    const [uiType]=useScreenType();

    isFullScreen= (uiType===screenSizeTypes.largeDevice.key)?isFullScreen:true;

    return(
        <Dialog
            fullScreen={isFullScreen} 
            open={isOpen}
            fullWidth={isFullWidth}
            maxWidth={maxWidth}
            TransitionComponent={Transition}
            className={`defaultDialogWrapper ${dialogWrapperStyle}`}
        >
            {
                (isFullScreen) ? (
                    <ToolBarWrapper
                        appBarStyle={appBarWrapperStyle}
                        toolBarStyle={"popupToolbarStyle"}
                    >
                        <div className={"titleWrapper"}>
                            <h2>{dialogTitle}</h2>
                        </div>


                        {
                            (isCloseButton===true)?(
                                <div className="buttonWrapper">
                                    <Icon
                                        elementStyle={"fullScreenPopupCloseIcon"}
                                        iconClass={"fas fa-times"}
                                        onClickFn={onClosePopupFn}
                                    />
                                </div>
                            ):(null)
                        }
                        

                    </ToolBarWrapper>
                ) : (
                    <div className={"d-inline-flex"}>
                        <div className="halfTitleWrapper">
                            <h2>{dialogTitle}</h2>
                        </div>

                        {
                            (isCloseButton===true)?(
                                <Icon elementStyle={"popupCloseIcon"} iconClass={"fas fa-times"} onClickFn={onClosePopupFn} />
                            ):(null)
                        }
                        
                    </div>
                )
            }
            
            <DialogContent
                className={`${(isFullScreen) ? "fullScreenContent" : "defaultContent"} ${dialogContentWrapperStyle}`}
            >
              {children}
            </DialogContent>

            {
                (isDialogActions)?(
                    <DialogActions 
                        className={`defaultDialogActionWrapper ${dialogActionWrapperStyle}`}
                    >
                    {
                        (isSaveButton === true) ?
                            (
                                <InputButtonWithState
                                    btnText={saveButton.btnText}
                                    elementStyle={saveButton.elementStyle}
                                    btnName={saveButton.btnName}
                                    startIcon={saveButton.startIcon}
                                    isBtnDisabled={saveButton.isBtnDisabled}
                                    onClickBtnFn={(event)=>onSaveFn(event)}
                                    formGroupName={formGroupName}
                                />
                            ) : (null)
                    }
                    
                    {
                        (isCustomButton === true) ?
                            (
                                <VariableToComponent 
                                    component={customButtonComponent} 
                                    props={{
                                        "onClosePopupFn":onClosePopupFn,
                                        "formGroupName":formGroupName
                                    }} 
                                />
                            ):(null)

                    }

                    {
                        (isCloseButton === true) ?
                            (
                                <InputButton
                                    btnText={closeButton.btnText}
                                    elementStyle={closeButton.elementStyle}
                                    btnName={closeButton.btnName}
                                    startIcon={closeButton.startIcon}
                                    isBtnDisabled={closeButton.isBtnDisabled}
                                    onClickBtnFn={onClosePopupFn}
                                />
                            ) : (null)
                    }
                    </DialogActions>     
                ):(null)
            }
                   
        </Dialog>
    )
}

/**
 * --------------------------------------------
 * @Author: Chanaka Wickramasinghe
 * @Description: Dialog Popup Wrapper
 * --------------------------------------------
 */

DialogPopup.propTypes = {
    /** Is full screen or not */
    isFullScreen: PropTypes.bool,
    /** Is popup open or not */
    isOpen: PropTypes.bool,
    /** Is full width or not*/
    isFullWidth: PropTypes.bool,
    /** Screen width size */
    maxWidth: PropTypes.oneOf(
[
            dialogPopupMaxWidth.small,
            dialogPopupMaxWidth.extraLarge,
            dialogPopupMaxWidth.extraSmall,
            dialogPopupMaxWidth.false,
            dialogPopupMaxWidth.large,
            dialogPopupMaxWidth.medium
       ]),
    /** Dialog wrapper css class */
    dialogWrapperStyle: PropTypes.string,
    /** App bar wrapper css class */
    appBarWrapperStyle: PropTypes.string,
    /** Dialog content wrapper css class */
    dialogContentWrapperStyle: PropTypes.string,
    /** Dialog action wrapper css class */
    dialogActionWrapperStyle: PropTypes.string,
    /** Childrens */
    children: PropTypes.element,
    /** Is custom button set or not */
    isCustomButton: PropTypes.bool,
    /** Is save button set or not */
    isSaveButton: PropTypes.bool,
    /** Save button object */
    saveButton: PropTypes.object,
    /** Close button object */
    closeButton: PropTypes.object,
    /** Custom button object */
    customButton: PropTypes.object,
    /** Is dialog actions set or not */
    isDialogActions: PropTypes.bool,
    /** Dialog title */
    dialogTitle: PropTypes.string,
    /** Is close button set or not */
    isCloseButton: PropTypes.bool,
    /** Onsave function */
    onSaveFn: PropTypes.func,
    /** Onclose function */
    onClosePopupFn: PropTypes.func
};

//----------------DialogPopup---------------------

export {
    DialogPopup, 
    saveBtn,
    closeBtn,
    customBtn,
    dialogPopupMaxWidth
};
