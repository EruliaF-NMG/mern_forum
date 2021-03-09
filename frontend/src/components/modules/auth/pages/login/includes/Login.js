import React, { Fragment, useContext } from 'react';

import { UICard } from '../../../../../ui-components/ui-elements/common/BaseElements';
import {
  FormWrapper,
  InputBoxWithState,
  InputButton,
} from '../../../../../ui-components/ui-elements/form';
import { _get } from '../../../../../../helpers/common-helpers/lodash.wrappers';
import { AuthContext } from '../../../../../modules/core/context-providers/AuthContext.provider';
import { FormContext } from '../../../../../modules/core/context-providers/FormContext.provider';

const Login = (props) => {
  const loginFromKey = 'loginFromKEY';
  const [, authAction] = useContext(AuthContext);
  const [formState, formAction] = useContext(FormContext);
  return (
    <UICard elementStyle="loginWrapper">
      <Fragment>
        <h1>Login Here...</h1>
        <FormWrapper setGroupName={loginFromKey} elementStyle="formWraper">
          <InputBoxWithState
            formGroupName={loginFromKey}
            inputName="email"
            lableText="E-mail"
          />
          <InputBoxWithState
            formGroupName={loginFromKey}
            inputType="password"
            inputName="password"
            lableText="Password"
          />
          <br />
          <br />
          <InputButton
            onClickBtnFn={() =>
              authAction.onLoginFn(
                _get(formState, loginFromKey, {}),
                formAction,
                loginFromKey
              )
            }
            btnText="Login"
            elementStyle=" btnWrapper"
            isFullWidth={true}
          />
        </FormWrapper>
      </Fragment>
    </UICard>
  );
};

export { Login };
