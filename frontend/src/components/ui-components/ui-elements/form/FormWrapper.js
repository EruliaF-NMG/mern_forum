/*
 * @Author: Chanaka Wickramasinghe
 * @Date: 2020-03-12 15:03:57
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-09 11:34:40
 */
import React, { useEffect, useContext, Fragment } from 'react';
import PropTypes from 'prop-types';

import { FormContext } from '../../../modules/core/context-providers/FormContext.provider';
import {
  CoreContext,
  apiResponseStoringType,
} from '../../../modules/core/context-providers/CoreContext.provider';
import { CircleLoaderElement } from '../../../ui-components/ui-elements/common/BaseElements';
import { _get } from '../../../../helpers/common-helpers/lodash.wrappers';

const emptyFun = (...para) => undefined;

/**
 * --------------------------------------------
 * @Author: Nisal Madusanka(EruliaF)
 * @Description: Form Wrapper
 * @usedIn :
 * --------------------------------------------
 */
const FormWrapper = ({
  elementStyle = '',
  isBackProsess = false,
  setDescription = '',
  setGroupName = '',
  formGroupLinkWith = '',
  setFormObject = {},
  apiUrl = '',
  onRebuildResponseFn = { emptyFun },
  onDestroyUnsetFormObject = true,
  children = null,
}) => {
  const [formState, formAction] = useContext(FormContext);
  const [, coreAction] = useContext(CoreContext);
  useEffect(() => {
    formAction
      .initFromObjectFn(setGroupName)
      .isBackProsess(isBackProsess)
      .setDescription(setDescription || setGroupName)
      .setGroupName(setGroupName)
      .setLinkWithOthers(formGroupLinkWith || setGroupName)
      .setFormObject(setFormObject)
      .setOnLoad(apiUrl ? true : false)
      .generate();

    if (apiUrl) {
      coreAction
        .sendRequestFn(apiUrl)
        .method('get')
        .setInitStoring(
          apiResponseStoringType.apiResponseToFormState,
          setGroupName
        )
        .setOnRebuildResponseFn((response) => onRebuildResponseFn(response))
        .send((error, result) => {});
    }

    return () => {
      if (onDestroyUnsetFormObject) {
        formAction.removeFromGroupFn(setGroupName);
      }
    };
  }, []);

  return (
    <div className={`fullWidthDiv ${elementStyle}`}>
      {_get(formState, `${setGroupName}._onLoad`, false) === false ? (
        <Fragment>{children}</Fragment>
      ) : (
        <div>
          <br />
          <center>
            <CircleLoaderElement />
          </center>
        </div>
      )}
    </div>
  );
};

FormWrapper.propTypes = {
  /** FormWrapper element css class */
  elementStyle: PropTypes.string,
  /** set back process or not */
  isBackProsess: PropTypes.bool,
  /** set description form group */
  setDescription: PropTypes.string,
  /** set form group name*/
  setGroupName: PropTypes.string,
  /** link form group with other forms */
  formGroupLinkWith: PropTypes.string,
  /** set init form object */
  setFormObject: PropTypes.object,
  /** set init form object */
  children: PropTypes.node,
};

//----------------FormWrapper---------------------

export { FormWrapper };
