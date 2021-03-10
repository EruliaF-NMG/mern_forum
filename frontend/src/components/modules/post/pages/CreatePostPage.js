import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';

import { TemplateOne } from '../../../ui-components/templates/TemplateOne';
import {
  FormWrapper,
  InputBoxWithState,
  InputTagWithState,
  SubmitButton,
} from '../../../ui-components/ui-elements/form';
import { UICard } from '../../../ui-components/ui-elements/common/BaseElements';
import { createPostAPI } from '../../../../config/apiUrl.config';

const CreatePostPage = (props) => {
  const createPostFormKey = 'postCreateKey';
  const history = useHistory();
  return (
    <TemplateOne>
      <Fragment>
        <UICard>
          <h1 className="defaultMarginBottom">Create New Post</h1>
          <FormWrapper setGroupName={createPostFormKey}>
            <InputBoxWithState
              formGroupName={createPostFormKey}
              inputName="heading"
              lableText="Heading"
            />
            <InputBoxWithState
              formGroupName={createPostFormKey}
              inputName="content"
              lableText="Content"
              isMultiline={true}
              rows={10}
            />
            <InputTagWithState
              formGroupName={createPostFormKey}
              inputName="tags"
              lableText="Tags"
            />
            <SubmitButton
              btnText="Create Post"
              formGroupName={createPostFormKey}
              isFullWidth={false}
              isValidate={true}
              flashMessages={{
                success: {
                  status: true,
                  message: 'Your post successfully submitted...',
                  messageType: 'success',
                },
              }}
              validationObject={{
                fileds: {
                  heading: 'Heading',
                  content: 'Content',
                  tags: 'Tags',
                },
                rules: {
                  heading: 'required',
                  content: 'required',
                  tags: 'required',
                },
                message: {},
              }}
              callApiObject={{
                method: 'post',
              }}
              onGetAPIEndPointFn={() => {
                return createPostAPI;
              }}
              onResponseCallBackFn={(error) => {
                if (!error) {
                  history.push('/home');
                }
              }}
            />
          </FormWrapper>
        </UICard>
      </Fragment>
    </TemplateOne>
  );
};

export default CreatePostPage;
