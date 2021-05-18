

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';

import { TooltipWrapper, Icon } from '../common/BaseElements';
import { formCacheLevel } from '../../../../config/template.config';
import {
  useBasicButton,
  useAPIBaseButton,
} from '../../../hooks/common-hooks/useFromButtonState.hook';

const emptyFun = (...para) => undefined;

// InputButton color options
const inputBtnColors = {
  default: 'default',
  inherit: 'inherit',
  primary: 'primary',
  secondary: 'secondary',
};

// InputButton size options
const inputBtnSizes = {
  small: 'small',
  medium: 'medium',
  large: 'large',
};

// InputButton variant options
const inputBtnVariants = {
  text: 'text',
  outlined: 'outlined',
  contained: 'contained',
};

const InputButton = ({
  elementWrapperStyle = '',
  elementStyle = '',
  btnText = '',
  btnName = '',
  btnSize = inputBtnSizes.small,
  btnColor = inputBtnColors.primary,
  isFullWidth = false,
  isBtnDisabled = false,
  startIcon = null,
  endIcon = null,
  variant = inputBtnVariants.contained,
  tooltip = '',
  onClickBtnFn = emptyFun,
}) => {
  return (
    <span className={`defaultInputBtnWrapper ${elementWrapperStyle}`}>
      <TooltipWrapper description={tooltip}>
        <Button
          variant={variant}
          color={btnColor}
          size={btnSize}
          className={`defaultInputBtnStyle  ${elementStyle}`}
          name={btnName}
          fullWidth={isFullWidth}
          disabled={isBtnDisabled}
          onClick={(event) => onClickBtnFn({ name: btnName, eventInfo: event })}
          startIcon={startIcon != null ? <Icon iconClass={startIcon} /> : null}
          endIcon={endIcon != null ? <Icon iconClass={endIcon} /> : null}
        >
          <span className={'defaultInputBtnTxt'}>{btnText}</span>
        </Button>
      </TooltipWrapper>
    </span>
  );
};



InputButton.propTypes = {
  /** element Wrapper css class */
  elementWrapperStyle: PropTypes.string,
  /** Button element css class */
  elementStyle: PropTypes.string,
  /** Button text */
  btnText: PropTypes.string,
  /** Button name */
  btnName: PropTypes.string,
  /** Button size */
  btnSize: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Button color */
  btnColor: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
  /** Is full width set or not */
  isFullWidth: PropTypes.bool,
  /** Is button disable or not */
  isBtnDisabled: PropTypes.bool,
  /** Button left icon */
  startIcon: PropTypes.string,
  /** Button right icon */
  endIcon: PropTypes.string,
  /** Button variant */
  variant: PropTypes.oneOf(['text', 'outlined', 'contained']),
  /** Tooltip text */
  tooltip: PropTypes.string,
  /** Onclick button function */
  onClickBtnFn: PropTypes.func,
};

/**
 * memo render
 * @param {Object} prevProps
 * @param {Object} nextProps
 */
const areEqual = (prevProps, nextProps) => {
  if (nextProps.cacheLevel === formCacheLevel.none) {
    return false;
  } else if (nextProps.cacheLevel === formCacheLevel.updateOnFormGroupChange) {
    return (
      prevProps.elementWrapperStyle === nextProps.elementWrapperStyle &&
      prevProps.elementStyle === nextProps.elementStyle &&
      prevProps.isFullWidth === nextProps.isFullWidth &&
      prevProps.btnText === nextProps.btnText &&
      prevProps.btnName === nextProps.btnName &&
      prevProps.isBtnDisabled === nextProps.isBtnDisabled &&
      prevProps.tooltip === nextProps.tooltip &&
      prevProps.updateStatus === nextProps.updateStatus &&
      prevProps.startIcon === nextProps.startIcon &&
      prevProps.startIcon === nextProps.endIcon &&
      prevProps.formGroupName === nextProps.formGroupName &&
      prevProps.mergeToForm === nextProps.mergeToForm
    );
  } else if (nextProps.cacheLevel === formCacheLevel.updateOnIndividual) {
    return (
      prevProps.elementWrapperStyle === nextProps.elementWrapperStyle &&
      prevProps.elementStyle === nextProps.elementStyle &&
      prevProps.isFullWidth === nextProps.isFullWidth &&
      prevProps.btnText === nextProps.btnText &&
      prevProps.tooltip === nextProps.tooltip &&
      prevProps.isBtnDisabled === nextProps.isBtnDisabled &&
      prevProps.startIcon === nextProps.startIcon &&
      prevProps.startIcon === nextProps.endIcon &&
      prevProps.formGroupName === nextProps.formGroupName &&
      prevProps.mergeToForm === nextProps.mergeToForm
    );
  }
};

const InputButtonMemo = memo(InputButton, areEqual);

const areEqualSubmitProp = (prevProps, nextProps) => {
  const status = areEqual(prevProps, nextProps);
  if (nextProps.cacheLevel === formCacheLevel.none) {
    return false;
  } else {
    return (
      status === true &&
      prevProps.dataTableKey === nextProps.dataTableKey &&
      prevProps.isValidate === nextProps.isValidate &&
      prevProps.flashMessages === nextProps.flashMessages &&
      prevProps.validationObject === nextProps.validationObject &&
      prevProps.callApiObject === nextProps.callApiObject &&
      prevProps.apiDataStoringObject === nextProps.apiDataStoringObject &&
      prevProps.updateStatus === nextProps.updateStatus &&
      prevProps.responseUpdateStatus === nextProps.responseUpdateStatus
    );
  }
};

const SubmitButtonMemo = memo(InputButton, areEqualSubmitProp);

//----------------InputButtonWithState---------------------



const InputButtonWithState = ({
  elementWrapperStyle = '',
  elementStyle = '',
  btnText = '',
  btnName = '',
  btnSize = inputBtnSizes.small,
  btnColor = inputBtnColors.primary,
  isFullWidth = false,
  isBtnDisabled = false,
  startIcon = null,
  endIcon = null,
  variant = inputBtnVariants.contained,
  tooltip = '',
  formGroupName = '',
  mergeToForm = null,
  cacheLevel = formCacheLevel.updateOnFormGroupChange,
  onClickBtnFn = emptyFun,
}) => {
  const [handleOnClickFn, updateStatus] = useBasicButton(
    onClickBtnFn,
    formGroupName,
    mergeToForm
  );

  return (
    <InputButtonMemo
      elementWrapperStyle={elementWrapperStyle}
      elementStyle={elementStyle}
      btnText={btnText}
      btnName={btnName}
      btnSize={btnSize}
      btnColor={btnColor}
      isFullWidth={isFullWidth}
      isBtnDisabled={isBtnDisabled}
      startIcon={startIcon}
      endIcon={endIcon}
      variant={variant}
      tooltip={tooltip}
      cacheLevel={cacheLevel}
      mergeToForm={mergeToForm}
      updateStatus={updateStatus}
      onClickBtnFn={(eventObj) => handleOnClickFn(eventObj)}
    />
  );
};

//----------------InputButtonWithState---------------------

//----------------SubmitButton---------------------



const SubmitButton = ({
  elementWrapperStyle = '',
  elementStyle = '',
  btnText = '',
  btnName = '',
  btnSize = inputBtnSizes.small,
  btnColor = inputBtnColors.primary,
  isFullWidth = false,
  isBtnDisabled = false,
  startIcon = null,
  endIcon = null,
  variant = inputBtnVariants.contained,
  tooltip = '',
  formGroupName = '',
  dataTableKey = null,
  isValidate = false,
  flashMessages = {},
  validationObject = {
    fileds: {},
    rules: {},
    message: {},
  },
  callApiObject = {
    isSetHeaders: true,
    multipart: false,
    method: 'post',
    onUpload: false,
  },
  apiDataStoringObject = {
    setLoader: true,
    storingType: 'API_RESPONSE_LINKED_FORM',
    mergeToSuccessResponse: null,
    mergeToErrorResponse: null,
  },
  cacheLevel = formCacheLevel.updateOnFormGroupChange,
  onClickBtnFn = emptyFun,
  onResponseCallBackFn = emptyFun,
  onGetAPIEndPointFn = emptyFun,
  onChangeRequestBodyFn = emptyFun,
}) => {
  const [
    handleOnClickFn,
    updateStatus,
    responseUpdateStatus,
  ] = useAPIBaseButton(
    apiDataStoringObject,
    flashMessages,
    dataTableKey,
    formGroupName,
    validationObject,
    callApiObject,
    isValidate,
    onClickBtnFn,
    onGetAPIEndPointFn,
    onChangeRequestBodyFn,
    onResponseCallBackFn
  );

  return (
    <SubmitButtonMemo
      elementWrapperStyle={elementWrapperStyle}
      elementStyle={elementStyle}
      btnText={btnText}
      btnName={btnName}
      btnSize={btnSize}
      btnColor={btnColor}
      isFullWidth={isFullWidth}
      isBtnDisabled={isBtnDisabled}
      startIcon={startIcon}
      endIcon={endIcon}
      variant={variant}
      tooltip={tooltip}
      formGroupName={formGroupName}
      dataTableKey={dataTableKey}
      isValidate={isValidate}
      cacheLevel={cacheLevel}
      flashMessages={flashMessages}
      validationObject={validationObject}
      callApiObject={callApiObject}
      apiDataStoringObject={apiDataStoringObject}
      updateStatus={updateStatus}
      responseUpdateStatus={responseUpdateStatus}
      onClickBtnFn={(eventObj) => handleOnClickFn(eventObj)}
    />
  );
};

//----------------SubmitButton---------------------

export {
  InputButton,
  inputBtnColors,
  inputBtnSizes,
  inputBtnVariants,
  InputButtonWithState,
  SubmitButton,
  formCacheLevel,
  InputButtonMemo,
  SubmitButtonMemo,
};
