/*
 * @Author: Chanaka Wickramasinghe
 * @Date: 2020-02-03 14:18:10
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-09 23:40:52
 */

import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import Card from '@material-ui/core/Card';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { usePermission } from '../../../hooks/common-hooks/usePermission.hook';
import { CoreContext } from '../../../modules/core/context-providers/CoreContext.provider';
import { FormContext } from '../../../modules/core/context-providers/FormContext.provider';
import { _get } from '../../../../helpers/common-helpers/lodash.wrappers';
import { baseTemplate } from '../../../../config/template.config';

const emptyFun = (...para) => undefined;
const EmptyComponent = (...para) => <Fragment></Fragment>;

/**
 * --------------------------------------------
 * @Author: Chanaka Wickramasinghe
 * @Description: Tooltip Wrapper
 * --------------------------------------------
 */

const TooltipWrapper = ({
  elementStyle = '',
  isArrowHead = false,
  children = null,
  placement = 'bottom',
  description = '',
}) => {
  return (
    <Tooltip
      title={description}
      arrow={isArrowHead}
      className={`defaultTooltipStyle ${elementStyle}`}
      placement={placement}
    >
      {children}
    </Tooltip>
  );
};

/**
 * --------------------------------------------
 * @Author: Chanaka Wickramasinghe
 * @Description: Tooltip Wrapper
 * --------------------------------------------
 */

TooltipWrapper.propTypes = {
  /** Tooltip element css class */
  elementStyle: PropTypes.string,
  /** Is arrow head true or false */
  isArrowHead: PropTypes.bool,
  /** Placement of the tooltip */
  placement: PropTypes.oneOf([
    'bottom-end',
    'bottom-start',
    'bottom',
    'left-end',
    'left-start',
    'left',
    'right-end',
    'right-start',
    'right',
    'top-end',
    'top-start',
    'top',
  ]),
  /** Tooltip description */
  description: PropTypes.string,
  /** children element */
  children: PropTypes.element,
};

//----------------TooltipWrapper---------------------

//----------------BreadCrumbWrapper---------------------

/**
 * --------------------------------------------
 * @Author: Chanaka Wickramasinghe
 * @Description: Card Wrapper
 * --------------------------------------------
 */

const UICard = ({ elementStyle = '', children = null }) => {
  return (
    <Card className={`defaultCardWrapper rounded shadow-sm  ${elementStyle}`}>
      <Fragment>{children}</Fragment>
    </Card>
  );
};

const UICardWithBackGround = ({ elementStyle = '', children = null }) => {
  return (
    <div className={`fullWidthDiv defaultBGWrapper `}>
      <Card className={`defaultCardWrapper  ${elementStyle}`}>
        <Fragment>{children}</Fragment>
      </Card>
    </div>
  );
};

/**
 * --------------------------------------------
 * @Author: Chanaka Wickramasinghe
 * @Description: Card Wrapper
 * --------------------------------------------
 */

UICard.propTypes = {
  /** Card element css class */
  elementStyle: PropTypes.string,
  /** Card children */
  children: PropTypes.element,
};

//----------------UICard---------------------

/**
 * --------------------------------------------
 * @Author: Chanaka Wickramasinghe
 * @Description: Default Icon Wrapper
 * --------------------------------------------
 */

const Icon = ({
  elementStyle = '',
  iconClass = '',
  tooltip = '',
  onClickFn = emptyFun,
}) => {
  return (
    <TooltipWrapper description={tooltip}>
      <i
        className={`defaultIconStyle ${elementStyle} ${iconClass}  `}
        onClick={onClickFn}
      ></i>
    </TooltipWrapper>
  );
};

/**
 * --------------------------------------------
 * @Author: Chanaka Wickramasinghe
 * @Description: Default Icon Wrapper
 * --------------------------------------------
 */

Icon.propTypes = {
  /** Icon element css class */
  elementStyle: PropTypes.string,
  /** Icon class */
  iconClass: PropTypes.string,
  /** Tooltip text */
  tooltip: PropTypes.string,
  /** Onclick event function */
  onClickFn: PropTypes.func,
};

//----------------DefaultIcon---------------------

/**
 * --------------------------------------------
 * @Author: Chanaka Wickramasinghe
 * @Description: ConvertDateFormat component
 * --------------------------------------------
 */
const ThemeProvider = ({ children = null }) => {
  return (
    <Fragment>
      <CssBaseline />
      <MuiThemeProvider theme={createMuiTheme(baseTemplate)}>
        {children}
      </MuiThemeProvider>
    </Fragment>
  );
};

/**
 * --------------------------------------------
 * @Author: Nisal Madusanka(EruliaF)
 * @Description: Circle Loader
 * --------------------------------------------
 */
const CircleLoaderElement = ({
  loaderStyle = '',
  loaderSize = 40,
  loaderThickness = 2,
}) => {
  return (
    <CircularProgress
      className={loaderStyle}
      size={loaderSize}
      thickness={loaderThickness}
    />
  );
};

const VariableToComponent = ({
  component = () => <Fragment></Fragment>,
  props = {},
}) => {
  const UIComponent = component;

  return <UIComponent {...props} />;
};

const CheckPermission = ({
  permission = null,
  ifNotAllowed = null,
  children = null,
}) => {
  const [, checkISAllowedFn] = usePermission();
  return (
    <Fragment>
      {checkISAllowedFn(permission) === true ? (
        <Fragment>{children}</Fragment>
      ) : (
        <Fragment>
          {ifNotAllowed === null ? null : (
            <VariableToComponent component={ifNotAllowed} />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

const GETFormState = ({
  formKey = '',
  defaultValue = {},
  parentToChild = {},
  component = EmptyComponent,
}) => {
  const [formState] = useContext(FormContext);

  return (
    <Fragment>
      <VariableToComponent
        component={component}
        props={{
          data: _get(formState, formKey, defaultValue),
          formParent: parentToChild,
        }}
      />
    </Fragment>
  );
};

const GETCoreState = ({
  formKey = '',
  defaultValue = {},
  parentToChild = {},
  component = EmptyComponent,
}) => {
  const [coreState] = useContext(CoreContext);

  return (
    <Fragment>
      <VariableToComponent
        component={component}
        props={{
          data: _get(coreState, formKey, defaultValue),
          formParent: parentToChild,
        }}
      />
    </Fragment>
  );
};

export {
  TooltipWrapper,
  UICard,
  UICardWithBackGround,
  Icon,
  ThemeProvider,
  CircleLoaderElement,
  VariableToComponent,
  emptyFun,
  CheckPermission,
  EmptyComponent,
  GETFormState,
  GETCoreState,
};
