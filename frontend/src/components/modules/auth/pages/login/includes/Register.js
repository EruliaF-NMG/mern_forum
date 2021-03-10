import React, { useContext, Fragment } from 'react';

import { UICard } from '../../../../../ui-components/ui-elements/common/BaseElements';
import {
  FormWrapper,
  InputBoxWithState,
  SubmitButton,
} from '../../../../../ui-components/ui-elements/form';
import { registerAPI } from '../../../../../../config/apiUrl.config';
import { _get } from '../../../../../../helpers/common-helpers/lodash.wrappers';
import { AuthContext } from '../../../../../modules/core/context-providers/AuthContext.provider';
import { FormContext } from '../../../../../modules/core/context-providers/FormContext.provider';

const Register = (props) => {
  const registerKey = 'registerFromKEY';
  const [, authAction] = useContext(AuthContext);
  const [formState, formAction] = useContext(FormContext);
  return (
    <UICard elementStyle="registerWrapper">
      <Fragment>
        <h1>Register Here...</h1>
        <FormWrapper setGroupName={registerKey} elementStyle="formWraper">
          <InputBoxWithState
            formGroupName={registerKey}
            inputName="first_name"
            lableText="First Name"
          />
          <InputBoxWithState
            formGroupName={registerKey}
            inputName="last_name"
            lableText="Last Name"
          />
          <InputBoxWithState
            formGroupName={registerKey}
            inputName="email"
            lableText="E-mail"
          />
          <InputBoxWithState
            formGroupName={registerKey}
            inputType="password"
            inputName="password"
            lableText="Password"
          />
          <br />
          <br />
          <SubmitButton
            btnText="Register"
            formGroupName={registerKey}
            isFullWidth={true}
            isValidate={true}
            flashMessages={{
              success: {
                status: true,
                message: 'User Registration successfully Completed.',
                messageType: 'success',
              },
            }}
            validationObject={{
              fileds: {
                first_name: 'First Name',
                last_name: 'Last Name',
                email: 'E-mail',
                password: 'Password',
              },
              rules: {
                first_name: 'required',
                last_name: 'required',
                email: 'required|email',
                password: 'required',
              },
              message: {},
            }}
            callApiObject={{
              isSetHeaders: false,
              method: 'post',
            }}
            onGetAPIEndPointFn={() => {
              return registerAPI;
            }}
            onResponseCallBackFn={(error) => {
              if (!error) {
                authAction.onLoginFn(
                  _get(formState, registerKey, {}),
                  formAction,
                  registerKey
                );
              }
            }}
          />
        </FormWrapper>
      </Fragment>
    </UICard>
  );
};

export { Register };
