/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-10 14:55:40
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-13 21:40:22
 */
import React, { Fragment, useState, memo } from 'react';
import { FormHelperTextWrapper } from './form-includes/FormCoreIncludes';
import { InputButton } from './Button';
import { formCacheLevel } from '../../../../config/template.config';
import { useBasicInput } from '../../../hooks/common-hooks/useFormInputState.hook';

const emptyFun = (...para) => undefined;

const InputTag = ({
  elementWrapperStyle = '',
  elementStyle = '',
  lableText = '',
  inputError = '',
  helperText = '',
  inputValue = '',
  inputName = '',
  onChangeTxtFn = emptyFun,
  onClickElementFn = emptyFun,
}) => {
  const [getText, setTextFn] = useState('');

  const addTags = () => {
    const valArray = inputValue === '' ? [] : inputValue.split(',');
    if (valArray.indexOf(getText) === -1) {
      valArray.push(getText);
      onChangeTxtFn({
        name: inputName,
        value: valArray.join(','),
        eventInfo: null,
      });
      setTextFn('');
    }
  };

  const onRemoveTag = (index) => {
    const valArray = inputValue.split(',');
    if (valArray.indexOf(valArray[index]) !== -1) {
      valArray.splice(index, 1);
      onChangeTxtFn({
        name: inputName,
        value: valArray.join(','),
        eventInfo: null,
      });
    }
  };

  return (
    <div
      className={`defaultTagWrapper ${elementWrapperStyle}`}
      onClick={(event) => onClickElementFn(event)}
    >
      <p>{lableText}</p>
      <div className={`inputTagWrapper ${elementStyle}`}>
        <input
          type="text"
          value={getText}
          onChange={(event) => setTextFn(event.target.value)}
        />
        <InputButton
          btnText="Add"
          isBtnDisabled={getText === '' ? true : false}
          onClickBtnFn={() => addTags()}
        />
      </div>
      {inputValue !== '' ? (
        <div className="showTags">
          {inputValue.split(',').map((value, index) => {
            return (
              <span className="badge rounded-pill bg-warning" key={index}>
                {value}
                {'  '}
                <i
                  className="mdi mdi-close-thick pointer"
                  onClick={() => onRemoveTag(index)}
                />
              </span>
            );
          })}
        </div>
      ) : null}
      <FormHelperTextWrapper inputError={inputError} helperText={helperText} />
    </div>
  );
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
      prevProps.lableText === nextProps.lableText &&
      prevProps.inputError === nextProps.inputError &&
      prevProps.helperText === nextProps.helperText &&
      prevProps.isRequired === nextProps.isRequired &&
      prevProps.inputValue === nextProps.inputValue &&
      prevProps.updateStatus === nextProps.updateStatus
    );
  } else if (nextProps.cacheLevel === formCacheLevel.updateOnIndividual) {
    return (
      prevProps.elementWrapperStyle === nextProps.elementWrapperStyle &&
      prevProps.elementStyle === nextProps.elementStyle &&
      prevProps.lableText === nextProps.lableText &&
      prevProps.inputError === nextProps.inputError &&
      prevProps.helperText === nextProps.helperText &&
      prevProps.isRequired === nextProps.isRequired &&
      prevProps.inputValue === nextProps.inputValue
    );
  }
};

const InputTagMemo = memo(InputTag, areEqual);

const InputTagWithState = ({
  elementWrapperStyle = '',
  elementStyle = '',
  lableText = '',
  inputError = '',
  helperText = '',
  inputValue = '',
  inputName = '',
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
    <InputTagMemo
      elementWrapperStyle={elementWrapperStyle}
      elementStyle={elementStyle}
      lableText={lableText}
      inputError={currentError}
      helperText={helperText}
      inputValue={currentValue}
      inputName={inputName}
      isRequired={isRequired}
      formGroupName={formGroupName}
      inputStatePath={inputStatePath}
      cacheLevel={cacheLevel}
      onChangeTxtFn={(eventData) => handleOnChangeFn(eventData)}
      onClickElementFn={handleOnClickFn}
      updateStatus={updateStatus}
    />
  );
};

export { InputTag, InputTagMemo, InputTagWithState };
