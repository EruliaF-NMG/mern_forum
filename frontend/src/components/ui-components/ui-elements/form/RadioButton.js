/*
 * @Author: Chanaka Wickramasinghe
 * @Description: Material Radio Button Group Wrapper
 * @Date: 2020-02-03 03:20:32
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-09 11:38:06
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

import { TooltipWrapper } from '../common/BaseElements';
import {
  FormControlWrapper,
  FormHelperTextWrapper,
} from './form-includes/FormCoreIncludes';
import { formCacheLevel } from '../../../../config/template.config';
import { useAPIBaseInput } from '../../../hooks/common-hooks/useFormInputState.hook';

const emptyFun = (...para) => undefined;

/**
 * --------------------------------------------
 * @Author: Chanaka Wickramasinghe
 * @Description: Radio Button Group Wrapper
 * --------------------------------------------
 */

const RadioButtonsGroup = ({
  elementWrapperStyle = '',
  elementStyle = '',
  isFullWidth = false,
  inputValue = '',
  inputName = '',
  labelText = '',
  inputError = '',
  helperText = '',
  keyName = 'value',
  valueName = 'label',
  isInlineTrue = true,
  isRequired = false,
  fieldDescribe = '',
  dataList = [],
  onChangeFn = emptyFun,
}) => {
  return (
    <FormControlWrapper
      elementWrapperStyle={`defaultRadioBtnGrpWrapper ${elementWrapperStyle}`}
      inputError={inputError}
      isFullWidth={isFullWidth}
    >
      <TooltipWrapper description={fieldDescribe}>
        <FormLabel
          component="legend"
          className={'radioBtnGrpLabel'}
          required={isRequired}
        >
          {labelText}
        </FormLabel>
      </TooltipWrapper>

      <RadioGroup
        row={isInlineTrue}
        aria-label={labelText}
        name={inputName}
        className={`defaultRadioGroupStyle ${elementStyle}`}
        value={inputValue}
        onChange={(event) =>
          onChangeFn({
            name: inputName,
            value: event.target.value,
            eventInfo: event,
          })
        }
      >
        {(dataList || []).map((row, index) => (
          <FormControlLabel
            key={index}
            value={row[keyName]}
            className={'defaultRadioLabel'}
            control={<Radio className={'defaultRadioButton'} />}
            label={row[valueName]}
          />
        ))}
      </RadioGroup>
      <FormHelperTextWrapper
        elementStyle={`radioBtnGrpHelperText`}
        inputError={inputError}
        helperText={helperText}
      />
    </FormControlWrapper>
  );
};

/**
 * --------------------------------------------
 * @Author: Chanaka Wickramasinghe
 * @Description: Radio Button Group Wrapper
 * --------------------------------------------
 */

RadioButtonsGroup.propTypes = {
  /** element Wrapper css class */
  elementWrapperStyle: PropTypes.string,
  /** Radio group element css class */
  elementStyle: PropTypes.string,
  /** Is full width set or not */
  isFullWidth: PropTypes.bool,
  /** In out value */
  inputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** In out value name */
  inputName: PropTypes.string,
  /** Input field error message */
  inputError: PropTypes.string,
  /** Input field helper text */
  helperText: PropTypes.string,
  /** Lable text */
  lableText: PropTypes.string,
  /** Array item key name */
  keyName: PropTypes.string,
  /** Array item value name */
  valueName: PropTypes.string,
  /** Radio buttons data */
  dataList: PropTypes.array,
  /** Tooltip description */
  fieldDescribe: PropTypes.string,
  /** Is inline or not */
  isInlineTrue: PropTypes.bool,
  /** Is required or not */
  isRequired: PropTypes.bool,
  /** Onclick event function */
  onChangeFn: PropTypes.func,
};

//----------------RadioButtonsGroup---------------------

/**
 * memo render
 * @param {Object} prevProps
 * @param {Object} nextProps
 */
const areEqual = (prevProps, nextProps) => {
  if (
    nextProps.cacheLevel === formCacheLevel.none ||
    nextProps.setCache === false
  ) {
    return false;
  } else if (nextProps.cacheLevel === formCacheLevel.updateOnFormGroupChange) {
    return (
      prevProps.elementWrapperStyle === nextProps.elementWrapperStyle &&
      prevProps.elementStyle === nextProps.elementStyle &&
      prevProps.isFullWidth === nextProps.isFullWidth &&
      prevProps.labelText === nextProps.labelText &&
      prevProps.responseUpdateStatus === nextProps.responseUpdateStatus &&
      prevProps.inputError === nextProps.inputError &&
      prevProps.helperText === nextProps.helperText &&
      prevProps.isDisabled === nextProps.isDisabled &&
      prevProps.isRequired === nextProps.isRequired &&
      prevProps.inputValue === nextProps.inputValue &&
      prevProps.updateStatus === nextProps.updateStatus &&
      prevProps.dataList.length === nextProps.dataList.length
    );
  } else if (nextProps.cacheLevel === formCacheLevel.updateOnIndividual) {
    return (
      prevProps.elementWrapperStyle === nextProps.elementWrapperStyle &&
      prevProps.elementStyle === nextProps.elementStyle &&
      prevProps.isFullWidth === nextProps.isFullWidth &&
      prevProps.inputError === nextProps.inputError &&
      prevProps.helperText === nextProps.helperText &&
      prevProps.isDisabled === nextProps.isDisabled &&
      prevProps.isRequired === nextProps.isRequired &&
      prevProps.labelText === nextProps.labelText &&
      prevProps.inputValue === nextProps.inputValue &&
      prevProps.responseUpdateStatus === nextProps.responseUpdateStatus &&
      prevProps.dataList.length === nextProps.dataList.length
    );
  }
};

const RadioButtonsGroupMemo = memo(RadioButtonsGroup, areEqual);

/**
 * --------------------------------------------
 * @Author: Chanaka Wickramasinghe
 * @Description: Radio Button Group With State
 * --------------------------------------------
 */

const RadioButtonsGroupWithState = ({
  elementWrapperStyle = '',
  elementStyle = '',
  isFullWidth = false,
  inputValue = '',
  inputName = '',
  labelText = '',
  inputError = '',
  helperText = '',
  keyName = 'value',
  valueName = 'label',
  isInlineTrue = true,
  isRequired = false,
  fieldDescribe = '',
  dataList = [],
  formGroupName = '',
  inputStatePath = '',
  apiUrl = '',
  apiStateKey = '',
  setCache = true,
  cacheLevel = formCacheLevel.updateOnFormGroupChange,
  onChangeFn = emptyFun,
}) => {
  const [
    currentValue,
    currentError,
    updateStatus,
    responseUpdateStatus,
    optionList,
    handleOnChangeFn,
  ] = useAPIBaseInput(
    apiUrl,
    apiStateKey,
    dataList,
    inputStatePath,
    formGroupName,
    inputName,
    inputValue,
    onChangeFn
  );

  return (
    <RadioButtonsGroupMemo
      elementWrapperStyle={elementWrapperStyle}
      elementStyle={elementStyle}
      isFullWidth={isFullWidth}
      inputName={inputName}
      inputValue={currentValue}
      labelText={labelText}
      inputError={currentError}
      helperText={helperText}
      keyName={keyName}
      valueName={valueName}
      isInlineTrue={isInlineTrue}
      isRequired={isRequired}
      fieldDescribe={fieldDescribe}
      dataList={optionList}
      onChangeFn={(eventData) => {
        handleOnChangeFn(eventData);
      }}
      cacheLevel={cacheLevel}
      updateStatus={updateStatus}
      responseUpdateStatus={responseUpdateStatus}
      setCache={setCache}
    />
  );
};

/**
 * --------------------------------------------
 * @Author: Chanaka Wickramasinghe
 * @Description: Radio Button Group With State
 * --------------------------------------------
 */

RadioButtonsGroupWithState.propTypes = {
  /** element Wrapper css class */
  elementWrapperStyle: PropTypes.string,
  /** Radio group element css class */
  elementStyle: PropTypes.string,
  /** Is full width set or not */
  isFullWidth: PropTypes.bool,
  /** In out value */
  inputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** In out value name */
  inputName: PropTypes.string,
  /** Input field error message */
  inputError: PropTypes.string,
  /** Input field helper text */
  helperText: PropTypes.string,
  /** Lable text */
  lableText: PropTypes.string,
  /** Array item key name */
  keyName: PropTypes.string,
  /** Array item value name */
  valueName: PropTypes.string,
  /** Radio buttons data */
  dataList: PropTypes.array,
  /** Tooltip description */
  fieldDescribe: PropTypes.string,
  /** Is inline or not */
  isInlineTrue: PropTypes.bool,
  /** Is required or not */
  isRequired: PropTypes.bool,
  /** Form group name */
  formGroupName: PropTypes.string,
  /** Input element state avilable path(use for manage complex objects) */
  inputStatePath: PropTypes.string,
  /** Onclick event function */
  onChangeFn: PropTypes.func,
};

//----------------RadioButtonsGroupWithState---------------------

export { RadioButtonsGroup, RadioButtonsGroupWithState };
