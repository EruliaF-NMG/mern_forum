/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Description: Material Text Field Input Wrappers
 * @Date: 2020-01-29 09:46:56
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-10 14:56:02
 */

import React, { memo, Fragment } from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';

import { FormControlWrapper } from './form-includes/FormCoreIncludes';
import {
  InputLabelWrapper,
  FormHelperTextWrapper,
} from './form-includes/FormCoreIncludes';
import { formCacheLevel } from '../../../../config/template.config';
import { useBasicInput } from '../../../hooks/common-hooks/useFormInputState.hook';

const emptyFun = (...para) => undefined;

/**
 * --------------------------------------------
 * @Author: Nisal Madusanka(EruliaF)
 * @Description: Input Box Wrapper
 * @usedIn : <InputBoxWithState/>
 * --------------------------------------------
 */
const InputBox = ({
  elementWrapperStyle = '',
  elementStyle = '',
  isFullWidth = true,
  lableText = '',
  inputType = 'text',
  inputValue = '',
  inputName = '',
  inputError = '',
  helperText = '',
  isMultiline = false,
  rows = 1,
  isAutoFocus = false,
  inputPlaceholder = '',
  isDisabled = false,
  isRequired = false,
  onChangeTxtFn = emptyFun,
  onClickElementFn = emptyFun,
}) => {
  return (
    <FormControlWrapper
      elementWrapperStyle={`defaultInputWrapper ${elementWrapperStyle}`}
      isFullWidth={isFullWidth}
      inputError={inputError}
      isMultiline={isMultiline}
    >
      <InputLabelWrapper
        inputName={inputName}
        isRequired={isRequired}
        lableText={lableText}
      />

      <Input
        className={`defaultInputText ${elementStyle}`}
        type={inputType}
        value={`${inputValue}`}
        name={inputName}
        autoFocus={isAutoFocus}
        placeholder={inputPlaceholder}
        disabled={isDisabled}
        multiline={isMultiline}
        rows={rows}
        onChange={(event) =>
          onChangeTxtFn({
            name: inputName,
            value: event.target.value,
            eventInfo: event,
          })
        }
        onClick={(event) =>
          onClickElementFn({ name: inputName, eventInfo: event })
        }
      />

      <FormHelperTextWrapper inputError={inputError} helperText={helperText} />
    </FormControlWrapper>
  );
};

/**
 * --------------------------------------------
 * @Author: Nisal Madusanka(EruliaF)
 * @Description: Input Box Wrapper
 * --------------------------------------------
 */
InputBox.propTypes = {
  /** element Wrapper css class */
  elementWrapperStyle: PropTypes.string,
  /** Button element css class */
  elementStyle: PropTypes.string,
  /** is set full width or not */
  isFullWidth: PropTypes.bool,
  /** lable text */
  lableText: PropTypes.string,
  /**  input field type */
  inputType: PropTypes.oneOf(['text', 'password', 'number', 'email']),
  /**  input field type */
  inputValue: PropTypes.string,
  /**  input field name */
  inputName: PropTypes.string,
  /**  input field error message */
  inputError: PropTypes.string,
  /**  input field helper text */
  helperText: PropTypes.string,
  /** is text area or not */
  isMultiline: PropTypes.bool,
  /** is text area or not */
  rows: PropTypes.number,
  /** is auto Focus or not */
  isAutoFocus: PropTypes.bool,
  /** input field placeholder text */
  inputPlaceholder: PropTypes.string,
  /** enable/disabled field */
  isDisabled: PropTypes.bool,
  /** set required * mark */
  isRequired: PropTypes.bool,
  /** onchange text event Function */
  onChangeTxtFn: PropTypes.func,
  /** onclick element Function */
  onClickElementFn: PropTypes.func,
};

//----------------InputBox---------------------

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
      prevProps.lableText === nextProps.lableText &&
      prevProps.inputType === nextProps.inputType &&
      prevProps.inputError === nextProps.inputError &&
      prevProps.helperText === nextProps.helperText &&
      prevProps.isMultiline === nextProps.isMultiline &&
      prevProps.rows === nextProps.rows &&
      prevProps.isDisabled === nextProps.isDisabled &&
      prevProps.isRequired === nextProps.isRequired &&
      prevProps.inputValue === nextProps.inputValue &&
      prevProps.updateStatus === nextProps.updateStatus
    );
  } else if (nextProps.cacheLevel === formCacheLevel.updateOnIndividual) {
    return (
      prevProps.elementWrapperStyle === nextProps.elementWrapperStyle &&
      prevProps.elementStyle === nextProps.elementStyle &&
      prevProps.isFullWidth === nextProps.isFullWidth &&
      prevProps.lableText === nextProps.lableText &&
      prevProps.inputType === nextProps.inputType &&
      prevProps.inputError === nextProps.inputError &&
      prevProps.helperText === nextProps.helperText &&
      prevProps.isMultiline === nextProps.isMultiline &&
      prevProps.rows === nextProps.rows &&
      prevProps.isDisabled === nextProps.isDisabled &&
      prevProps.isRequired === nextProps.isRequired &&
      prevProps.inputValue === nextProps.inputValue
    );
  }
};

const InputBoxMemo = memo(InputBox, areEqual);

/**
 * -------------InputBoxWithState--------------
 * --------------------------------------------
 * @Author: Nisal Madusanka(EruliaF)
 * @Description: Input Box Wrapper
 * @usedIn :
 * --------------------------------------------
 */

const InputBoxWithState = ({
  elementWrapperStyle = '',
  elementStyle = '',
  isFullWidth = true,
  lableText = '',
  inputType = 'text',
  inputValue = '',
  inputName = '',
  inputError = '',
  helperText = '',
  isMultiline = false,
  rows = 1,
  isAutoFocus = false,
  inputPlaceholder = '',
  isDisabled = false,
  isRequired = false,
  formGroupName = '',
  inputStatePath = '',
  cacheLevel = formCacheLevel.updateOnFormGroupChange,
  onChangeTxtFn = emptyFun,
  onClickElementFn = emptyFun,
}) => {
  const [
    currentValue,
    currentError,
    updateStatus,
    handleOnChangeFn,
    handleOnClickFn,
  ] = useBasicInput(
    inputStatePath,
    formGroupName,
    inputName,
    inputValue,
    onChangeTxtFn,
    onClickElementFn
  );

  return (
    <InputBoxMemo
      elementWrapperStyle={elementWrapperStyle}
      elementStyle={elementStyle}
      isFullWidth={isFullWidth}
      lableText={lableText}
      inputType={inputType}
      inputValue={currentValue}
      inputName={inputName}
      inputError={currentError}
      helperText={helperText}
      isMultiline={isMultiline}
      rows={rows}
      isAutoFocus={isAutoFocus}
      inputPlaceholder={inputPlaceholder}
      isDisabled={isDisabled}
      isRequired={isRequired}
      onChangeTxtFn={(eventData) => handleOnChangeFn(eventData)}
      onClickElementFn={handleOnClickFn}
      updateStatus={updateStatus}
      cacheLevel={cacheLevel}
    />
  );
};

InputBoxWithState.propTypes = {
  /** element Wrapper css class */
  elementWrapperStyle: PropTypes.string,
  /** Button element css class */
  elementStyle: PropTypes.string,
  /** is set full width or not */
  isFullWidth: PropTypes.bool,
  /** lable text */
  lableText: PropTypes.string,
  /**  input field type */
  inputType: PropTypes.oneOf(['text', 'password', 'number', 'email']),
  /**  input field type */
  inputValue: PropTypes.string,
  /**  input field name */
  inputName: PropTypes.string,
  /**  input field error message */
  inputError: PropTypes.string,
  /**  input field helper text */
  helperText: PropTypes.string,
  /** is text area or not */
  isMultiline: PropTypes.bool,
  /** is text area or not */
  rows: PropTypes.number,
  /** is auto Focus or not */
  isAutoFocus: PropTypes.bool,
  /** input field placeholder text */
  inputPlaceholder: PropTypes.string,
  /** enable/disabled field */
  isDisabled: PropTypes.bool,
  /** set required * mark */
  isRequired: PropTypes.bool,
  /** form group name */
  formGroupName: PropTypes.string,
  /** input element state avilable path(use for manage complex objects) */
  inputStatePath: PropTypes.string,
  /** onchange text event Function */
  onChangeTxtFn: PropTypes.func,
  /** onclick element Function */
  onClickElementFn: PropTypes.func,
};

//-------------InputBoxWithState--------------

export { InputBox, InputBoxWithState, InputBoxMemo, formCacheLevel };
