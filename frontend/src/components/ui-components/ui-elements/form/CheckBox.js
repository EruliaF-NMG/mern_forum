/*
 * @Author: Chanaka Wickramasinghe
 * @Description: Material CheckBox Wrappers
 * @Date: 2020-02-03 04:53:32
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-09 11:32:07
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {
  FormControlWrapper,
  FormHelperTextWrapper,
  InputLabelWrapper,
} from './form-includes/FormCoreIncludes';
import { TooltipWrapper } from '../common/BaseElements';
import { formCacheLevel } from '../../../../config/template.config';
import { toBoolean } from '../../../../helpers/common-helpers/common.helpers';
import { useBasicInput } from '../../../hooks/common-hooks/useFormInputState.hook';

const emptyFun = (...para) => undefined;

const checkBoxLabelPlacement = {
  end: 'end',
  start: 'start',
  top: 'top',
  bottom: 'bottom',
};

/**
 * --------------------------------------------
 * @Author: Chanaka Wickramasinghe
 * @Description: Check box Wrapper
 * @usedIn : <CheckBoxWithState/>
 * --------------------------------------------
 */

const CheckBox = ({
  elementWrapperStyle = '',
  elementStyle = '',
  inputName = '',
  inputError = '',
  inputValue = false,
  isRequired = false,
  isDisabled = false,
  checkBoxGroupLabel = '',
  labelText = '',
  labelPlacement = checkBoxLabelPlacement.end,
  helperText = '',
  toolTip = '',
  onChangeFn = emptyFun,
}) => {
  console.log('checkbox', inputName);
  return (
    <FormControlWrapper
      elementWrapperStyle={`defaultCheckBoxWrapper ${elementWrapperStyle}`}
      inputError={inputError}
    >
      {checkBoxGroupLabel ? (
        <InputLabelWrapper
          inputName={inputName}
          isRequired={isRequired}
          lableText={checkBoxGroupLabel}
        />
      ) : null}

      <FormControlLabel
        labelPlacement={labelPlacement}
        label={labelText}
        className={`defaultCheckBoxLabel`}
        control={
          <TooltipWrapper description={toolTip}>
            <Checkbox
              disabled={isDisabled}
              className={`defaultCheckbox ${elementStyle}`}
              name={inputName}
              checked={toBoolean(inputValue)}
              onChange={(event) =>
                onChangeFn({
                  name: inputName,
                  value: !toBoolean(inputValue),
                  eventInfo: event,
                })
              }
            />
          </TooltipWrapper>
        }
      />

      <FormHelperTextWrapper
        elementStyle={`defaultCheckBoxHelperText`}
        inputError={inputError}
        helperText={helperText}
      />
    </FormControlWrapper>
  );
};

/**
 * --------------------------------------------
 * @Author: Chanaka Wickramasinghe
 * @Description: Check box Wrapper
 * --------------------------------------------
 */

CheckBox.propTypes = {
  /** element Wrapper css class */
  elementWrapperStyle: PropTypes.string,
  /** Check box element css class */
  elementStyle: PropTypes.string,
  /** In out value name */
  inputName: PropTypes.string,
  /** Input field error message */
  inputError: PropTypes.string,
  /** In out value */
  inputValue: PropTypes.bool,
  /** Lable text */
  labelText: PropTypes.string,
  /** Helper text */
  helperText: PropTypes.string,
  /** Tooltip text */
  toolTip: PropTypes.string,
  /** Onclick event function */
  onChangeFn: PropTypes.func,
};

//----------------CheckBox---------------------

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
      prevProps.labelText === nextProps.labelText &&
      prevProps.inputError === nextProps.inputError &&
      prevProps.helperText === nextProps.helperText &&
      prevProps.isDisabled === nextProps.isDisabled &&
      prevProps.isRequired === nextProps.isRequired &&
      prevProps.inputValue === nextProps.inputValue &&
      prevProps.updateStatus === nextProps.updateStatus &&
      prevProps.toolTip === nextProps.toolTip &&
      prevProps.checkBoxGroupLabel === nextProps.checkBoxGroupLabel &&
      prevProps.labelPlacement === nextProps.labelPlacement
    );
  } else if (nextProps.cacheLevel === formCacheLevel.updateOnIndividual) {
    return (
      prevProps.elementWrapperStyle === nextProps.elementWrapperStyle &&
      prevProps.elementStyle === nextProps.elementStyle &&
      prevProps.labelText === nextProps.labelText &&
      prevProps.inputError === nextProps.inputError &&
      prevProps.helperText === nextProps.helperText &&
      prevProps.isDisabled === nextProps.isDisabled &&
      prevProps.isRequired === nextProps.isRequired &&
      prevProps.inputValue === nextProps.inputValue &&
      prevProps.toolTip === nextProps.toolTip &&
      prevProps.checkBoxGroupLabel === nextProps.checkBoxGroupLabel &&
      prevProps.labelPlacement === nextProps.labelPlacement
    );
  }
};

const CheckBoxMemo = memo(CheckBox, areEqual);

/**
 * --------------------------------------------
 * @Author: Chanaka Wickramasinghe
 * @Description: Check box Wrapper With State
 * --------------------------------------------
 */

const CheckBoxWithState = ({
  elementWrapperStyle = '',
  elementStyle = '',
  inputName = '',
  inputError = '',
  inputValue = false,
  labelText = '',
  helperText = '',
  toolTip = '',
  formGroupName = '',
  inputStatePath = '',
  labelPlacement = checkBoxLabelPlacement.end,
  cacheLevel = formCacheLevel.updateOnFormGroupChange,
  checkBoxGroupLabel = '',
  onChangeFn = emptyFun,
}) => {
  const [
    currentValue,
    currentError,
    updateStatus,
    handleOnChangeFn,
  ] = useBasicInput(
    inputStatePath,
    formGroupName,
    inputName,
    inputValue,
    onChangeFn
  );

  return (
    <CheckBoxMemo
      elementWrapperStyle={elementWrapperStyle}
      elementStyle={elementStyle}
      inputName={inputName}
      inputError={currentError}
      inputValue={toBoolean(currentValue)}
      labelText={labelText}
      helperText={helperText}
      toolTip={toolTip}
      onChangeFn={(eventData) => {
        handleOnChangeFn(eventData);
        onChangeFn(eventData);
      }}
      updateStatus={updateStatus}
      cacheLevel={cacheLevel}
      checkBoxGroupLabel={checkBoxGroupLabel}
      labelPlacement={labelPlacement}
    />
  );
};

CheckBoxWithState.propTypes = {
  /** element Wrapper css class */
  elementWrapperStyle: PropTypes.string,
  /** Check box element css class */
  elementStyle: PropTypes.string,
  /** In out value name */
  inputName: PropTypes.string,
  /** Input field error message */
  inputError: PropTypes.string,
  /** In out value */
  inputValue: PropTypes.bool,
  /** Lable text */
  lableText: PropTypes.string,
  /** Helper text */
  helperText: PropTypes.string,
  /** Tooltip text */
  toolTip: PropTypes.string,
  /** Form group name */
  formGroupName: PropTypes.string,
  /** Input element state avilable path(use for manage complex objects) */
  inputStatePath: PropTypes.string,
  /** Onclick event function */
  onChangeFn: PropTypes.func,
};

//----------------CheckBoxWithState---------------------

export {
  CheckBox,
  CheckBoxWithState,
  CheckBoxMemo,
  formCacheLevel,
  checkBoxLabelPlacement,
};
