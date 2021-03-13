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
import { editPostAPI } from '../../../../config/apiUrl.config';

const EditPostPage = (props) => {
  const editPostFormKey = 'postEditKey';
  const history = useHistory();
  return (
    <TemplateOne>
      <Fragment>
        <UICard>
          <Fragment>
            <h1 className="defaultMarginBottom">Edit Post</h1>
            <FormWrapper
              setGroupName={editPostFormKey}
              apiUrl={`${editPostAPI.url}${props.match.params.id}`}
              onRebuildResponseFn={(result) => {
                return {
                  heading: result.heading || '',
                  content: result.content || '',
                  tags: result.tags || '',
                  _id: result._id || undefined,
                  _onLoad: false,
                };
              }}
            >
              <InputBoxWithState
                formGroupName={editPostFormKey}
                inputName="heading"
                lableText="Heading"
              />
              <InputBoxWithState
                formGroupName={editPostFormKey}
                inputName="content"
                lableText="Content"
                isMultiline={true}
                rows={10}
              />
              <InputTagWithState
                formGroupName={editPostFormKey}
                inputName="tags"
                lableText="Tags"
              />
              <SubmitButton
                btnText="Update Post"
                formGroupName={editPostFormKey}
                isFullWidth={false}
                isValidate={true}
                flashMessages={{
                  SUCCESSFULLY_CREATED: {
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
                  method: 'put',
                }}
                onGetAPIEndPointFn={(fromObject) => {
                  return {
                    url: `${editPostAPI.url}${fromObject._id}`,
                    key: editPostAPI.key,
                  };
                }}
                onResponseCallBackFn={(error) => {
                  if (!error) {
                    history.push('/home');
                  }
                }}
              />
            </FormWrapper>
          </Fragment>
        </UICard>
      </Fragment>
    </TemplateOne>
  );
};

export default EditPostPage;
