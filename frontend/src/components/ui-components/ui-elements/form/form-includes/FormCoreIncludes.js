/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Description: Core Material Form Components Wrappers
 * @Date: 2020-01-29 10:22:54
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-05-18 08:38:00
 */

import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';

/**
 * --------------------------------------------
 * @Author: Nisal Madusanka(EruliaF)
 * @Description: Form Control Wrapper
 * --------------------------------------------
 */
const FormControlWrapper = ({
  elementWrapperStyle = '',
  isFullWidth = true,
  inputError = '',
  isMultiline = false,
  children = null,
}) => {
  return (
    <FormControl
      fullWidth={isFullWidth}
      error={inputError ? true : false}
      className={`
      defaultInputWrapper 
      ${elementWrapperStyle} ${isMultiline ? ' textAreaWrapper' : ''}
      ${inputError !== '' ? ' defaultErrorInputWrapper' : ''}      
      `}
    >
      {children}
    </FormControl>
  );
};

/**
 * --------------------------------------------
 * @Author: Nisal Madusanka(EruliaF)
 * @Description: Form Control Wrapper
 * --------------------------------------------
 */
FormControlWrapper.propTypes = {
  /** element Wrapper css class */
  elementWrapperStyle: PropTypes.string,
  /** is set full width or not */
  isFullWidth: PropTypes.bool,
  /**  input field error message */
  inputError: PropTypes.string,
  /** is text area or not */
  isMultiline: PropTypes.bool,
  /** children element */
  children: PropTypes.node,
};

//----------------FormControlWrapper-------------------

/**
 * --------------------------------------------
 * @Author: Nisal Madusanka(EruliaF)
 * @Description: Input Label Wrapper
 * ---------------------------------------------
 */

const InputLabelWrapper = ({
  inputName = '',
  isRequired = false,
  lableText = '',
}) => {
  return (
    <InputLabel
      htmlFor={inputName}
      className={'defaultInputLabel'}
      required={isRequired}
      shrink={undefined}
    >
      {lableText}
    </InputLabel>
  );
};

/**
 * --------------------------------------------
 * @Author: Nisal Madusanka(EruliaF)
 * @Description: Input Label Wrapper
 * --------------------------------------------
 */
InputLabelWrapper.propTypes = {
  /**  input field name */
  inputName: PropTypes.string,
  /** set required * mark */
  isRequired: PropTypes.bool,
  /** lable text */
  lableText: PropTypes.string,
};

//----------------InputLabelWrapper-------------------

/**
 * --------------------------------------------
 * @Author: Nisal Madusanka(EruliaF)
 * @Description: Form Group Wrapper
 * --------------------------------------------
 */

const FormGroupWrapper = ({
  elementWrapperStyle = '',
  isMultiline = false,
  children = null,
}) => {
  return (
    <FormGroup
      className={`defaultFormGroupWrapper ${elementWrapperStyle}`}
      row={isMultiline}
    >
      {children}
    </FormGroup>
  );
};


FormGroupWrapper.propTypes = {
  /** element Wrapper css class */
  elementWrapperStyle: PropTypes.string,
  /** is text area or not */
  isMultiline: PropTypes.bool,
  /** children element */
  children: PropTypes.element,
};



const FormHelperTextWrapper = ({
  elementStyle = '',
  inputError = '',
  helperText = '',
}) => {
  return (
    <FormHelperText
      className={`defaultFormHelperText ${elementStyle} ${
        inputError !== '' ? ' defaultInputErrorText' : ' defaultHelperText'
      }`}
    >
      {inputError !== '' ? inputError : helperText}
    </FormHelperText>
  );
};



FormHelperTextWrapper.propTypes = {
  /** element css class */
  elementStyle: PropTypes.string,
  /** input error text */
  inputError: PropTypes.string,
  /** helper text */
  helperText: PropTypes.string,
};

export {
  FormControlWrapper,
  InputLabelWrapper,
  FormGroupWrapper,
  FormHelperTextWrapper,
};
