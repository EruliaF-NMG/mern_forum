/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Description: Select Dropdown Wrapper
 * @Date: 2020-02-03 10:50:10
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-05-18 08:40:18
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';

import { FormControlWrapper } from './form-includes/FormCoreIncludes';
import {
  InputLabelWrapper,
  FormHelperTextWrapper,
} from './form-includes/FormCoreIncludes';
import { _get } from '../../../../helpers/common-helpers/lodash.wrappers';
import { formCacheLevel } from '../../../../config/template.config';
import { useAPIBaseInput } from '../../../hooks/common-hooks/useFormInputState.hook';

const emptyFun = (...para) => undefined;

/**
 * --------------------------------------------
 * @Description: Select Box Wrapper
 * --------------------------------------------
 */

const SelectBox = ({
  elementWrapperStyle = '',
  elementStyle = '',
  isFullWidth = true,
  lableText = '',
  inputValue = '',
  inputName = '',
  inputError = '',
  helperText = '',
  dataList = [],
  keyName = 'id',
  valueName = 'value',
  isDisabled = false,
  emptySelectOptionTxt = '---Select an option---',
  isRequired = false,
  onChangeFn = emptyFun,
  onClickFn = emptyFun,
}) => {
  return (
    <FormControlWrapper
      elementWrapperStyle={`defaultSelectBoxWrapper ${elementWrapperStyle}`}
      isFullWidth={isFullWidth}
      inputError={inputError}
    >
      <InputLabelWrapper
        inputName={inputName}
        isRequired={isRequired}
        lableText={lableText}
      />

      <NativeSelect
        className={`defaultSelectWrapper ${elementStyle}`}
        value={inputValue == null ? '' : inputValue.toString()}
        disabled={isDisabled ? true : false}
        input={<Input name={inputName} id={inputName} />}
        onChange={(event) =>
          onChangeFn({
            name: inputName,
            value: event.target.value,
            eventInfo: event,
          })
        }
        onClick={(event) => onClickFn({ name: inputName, eventInfo: event })}
      >
        <option key={'null'} value={'null'}>
          {emptySelectOptionTxt || '---Select an option---'}
        </option>
        {(dataList || []).map((row, index) => (
          <option key={index} value={`${_get(row, keyName, 'null')}`}>
            {`${_get(row, valueName, '')}`}
          </option>
        ))}
      </NativeSelect>

      <FormHelperTextWrapper inputError={inputError} helperText={helperText} />
    </FormControlWrapper>
  );
};



SelectBox.propTypes = {
  /** element Wrapper css class */
  elementWrapperStyle: PropTypes.string,
  /** Select Dropdown element css class */
  elementStyle: PropTypes.string,
  /** Is full width set or not */
  isFullWidth: PropTypes.bool,
  /** Lable text */
  lableText: PropTypes.string,
  /** In out value */
  inputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** In out value name */
  inputName: PropTypes.string,
  /** Input field error message */
  inputError: PropTypes.string,
  /** Input field helper text */
  helperText: PropTypes.string,
  /** Dropdown data */
  dataList: PropTypes.array,
  /** Array item key name */
  keyName: PropTypes.string,
  /** Array item value name */
  valueName: PropTypes.string,
  /** Is select disable or not */
  isDisabled: PropTypes.bool,
  /** Is required or not */
  isRequired: PropTypes.bool,
  /** Onchane event function */
  onChangeFn: PropTypes.func,
  /** Onclick event function */
  onClickFn: PropTypes.func,
};

//----------------SelectBox---------------------



const MultipleSelectBox = ({
  elementWrapperStyle = '',
  elementStyle = '',
  isFullWidth = true,
  isMultiple = true,
  isNative = true,
  lableText = '',
  inputValue = [],
  inputName = '',
  inputError = '',
  helperText = '',
  dataList = [],
  keyName = 'id',
  valueName = 'value',
  isDisabled = false,
  emptySelectOptionTxt = '---Select an option---',
  isRequired = false,
  onChangeFn = emptyFun,
  onClickFn = emptyFun,
}) => {
  return (
    <FormControlWrapper
      elementWrapperStyle={`defaultMultipleSelectBoxWrapper ${elementWrapperStyle}`}
      isFullWidth={isFullWidth}
      inputError={inputError}
    >
      <InputLabelWrapper
        inputName={inputName}
        isRequired={isRequired}
        lableText={lableText}
      />

      <Select
        className={`defaultSelectWrapper ${elementStyle}`}
        value={inputValue}
        disabled={isDisabled ? true : false}
        input={<Input name={inputName} id={inputName} />}
        multiple={isMultiple}
        native={isNative}
        onChange={(event) =>
          onChangeFn({
            name: inputName,
            value: event.target.value,
            eventInfo: event,
          })
        }
        onClick={(event) => onClickFn({ name: inputName, eventInfo: event })}
      >
        <option key={'null'} value={'null'}>
          {emptySelectOptionTxt || '---Select an option---'}
        </option>
        {(dataList || []).map((row, index) => (
          <option key={index} value={`${_get(row, keyName, 'null')}`}>
            {`${_get(row, valueName, '')}`}
          </option>
        ))}
      </Select>

      <FormHelperTextWrapper inputError={inputError} helperText={helperText} />
    </FormControlWrapper>
  );
};



MultipleSelectBox.propTypes = {
  /** element Wrapper css class */
  elementWrapperStyle: PropTypes.string,
  /** Select Dropdown element css class */
  elementStyle: PropTypes.string,
  /** Is full width set or not */
  isFullWidth: PropTypes.bool,
  /** Is multiple set or not */
  isMultiple: PropTypes.bool,
  /** Is native set or not */
  isNative: PropTypes.bool,
  /** Lable text */
  lableText: PropTypes.string,
  /** In out value */
  inputValue: PropTypes.array,
  /** In out value name */
  inputName: PropTypes.string,
  /** Input field error message */
  inputError: PropTypes.string,
  /** Input field helper text */
  helperText: PropTypes.string,
  /** Dropdown data */
  dataList: PropTypes.array,
  /** Array item key name */
  keyName: PropTypes.string,
  /** Array item value name */
  valueName: PropTypes.string,
  /** Is select disable or not */
  isDisabled: PropTypes.bool,
  /** Is required or not */
  isRequired: PropTypes.bool,
  /** Onchane event function */
  onChangeFn: PropTypes.func,
  /** Onclick event function */
  onClickFn: PropTypes.func,
};

//----------------MultipleSelectBox---------------------

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
      prevProps.lableText === nextProps.lableText &&
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
      prevProps.lableText === nextProps.lableText &&
      prevProps.inputValue === nextProps.inputValue &&
      prevProps.responseUpdateStatus === nextProps.responseUpdateStatus &&
      prevProps.dataList.length === nextProps.dataList.length
    );
  }
};

const SelectBoxMemo = memo(SelectBox, areEqual);


const SelectBoxWithState = ({
  elementWrapperStyle = '',
  elementStyle = '',
  isFullWidth = true,
  lableText = '',
  inputValue = '',
  inputName = '',
  inputError = '',
  dataList = [],
  helperText = '',
  keyName = 'id',
  valueName = 'value',
  isDisabled = false,
  isRequired = false,
  formGroupName = '',
  inputStatePath = '',
  apiUrl = '',
  apiStateKey = '',
  setCache = true,
  emptySelectOptionTxt = '---Select an option---',
  cacheLevel = formCacheLevel.updateOnFormGroupChange,
  onChangeFn = emptyFun,
  onClickFn = emptyFun,
}) => {
  const [
    currentValue,
    currentError,
    updateStatus,
    responseUpdateStatus,
    optionList,
    handleOnChangeFn,
    handleOnClickFn,
  ] = useAPIBaseInput(
    apiUrl,
    apiStateKey,
    dataList,
    inputStatePath,
    formGroupName,
    inputName,
    inputValue,
    onChangeFn,
    onClickFn
  );

  return (
    <SelectBoxMemo
      elementWrapperStyle={elementWrapperStyle}
      elementStyle={elementStyle}
      isFullWidth={isFullWidth}
      lableText={lableText}
      inputName={inputName}
      inputError={currentError}
      helperText={helperText}
      dataList={optionList}
      keyName={keyName}
      valueName={valueName}
      inputValue={currentValue}
      isDisabled={isDisabled}
      emptySelectOptionTxt={emptySelectOptionTxt}
      isRequired={isRequired}
      onChangeFn={(eventData) => {
        handleOnChangeFn(eventData);
      }}
      onClickFn={(event) => handleOnClickFn(event)}
      updateStatus={updateStatus}
      cacheLevel={cacheLevel}
      responseUpdateStatus={responseUpdateStatus}
      setCache={setCache}
    />
  );
};

export {
  SelectBox,
  SelectBoxWithState,
  SelectBoxMemo,
  formCacheLevel,
  MultipleSelectBox,
};
