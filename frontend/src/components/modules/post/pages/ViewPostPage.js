import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';

import { TemplateOne } from '../../../ui-components/templates/TemplateOne';
import {
  FormWrapper,
  SubmitButton,
  InputBoxWithState,
  inputBtnColors,
} from '../../../ui-components/ui-elements/form';
import {
  UICard,
  GETFormState,
} from '../../../ui-components/ui-elements/common/BaseElements';
import { editPostAPI, addCommentAPI } from '../../../../config/apiUrl.config';
import { dateObjectToString } from '../../../../helpers/common-helpers/dateTime.helpers';

const ShowPostDetails = ({ data = {}, formParent = {} }) => {
  const history = useHistory();
  return (
    <Fragment>
      <h1 className="defaultMarginBottom">{data.heading}</h1>
      <p className="defaultMarginTopBottom">{data.content}</p>
      <SubmitButton
        elementWrapperStyle={'defaultMarginRight'}
        btnText="Delete"
        btnColor={inputBtnColors.secondary}
        formGroupName={formParent.formKey}
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
            url: `${editPostAPI.url}${formParent.id}`,
            key: editPostAPI.key,
          };
        }}
        onResponseCallBackFn={(error) => {
          if (!error) {
            history.push('/home');
          }
        }}
      />
      <SubmitButton
        btnText="Approved/Reject"
        formGroupName={formParent.formKey}
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
            url: `${editPostAPI.url}${formParent.id}`,
            key: editPostAPI.key,
          };
        }}
        onResponseCallBackFn={(error) => {
          if (!error) {
            history.push('/home');
          }
        }}
      />
      <div className="fullWidthDiv defaultMarginTopBottom">
        <hr />
        <h2>Comments...</h2>
        <div className="fullWidthDiv defaultMarginTopBottom">
          <FormWrapper setGroupName={'commentFormKey'}>
            <InputBoxWithState
              lableText="Place your comment..."
              formGroupName="commentFormKey"
              inputName="comment"
              isMultiline={true}
              rows={3}
            />
            <span className="fullWidthDiv defaultMarginTop"></span>
            <SubmitButton
              btnText="Add Comment"
              formGroupName={'commentFormKey'}
              isFullWidth={false}
              isValidate={true}
              flashMessages={{
                SUCCESSFULLY_CREATED: {
                  status: true,
                  message: 'Your comment successfully submitted...',
                  messageType: 'success',
                },
              }}
              validationObject={{
                fileds: {
                  comment: 'Comment',
                },
                rules: {
                  comment: 'required',
                },
                message: {},
              }}
              callApiObject={{
                method: 'post',
              }}
              onGetAPIEndPointFn={() => {
                return {
                  url: `${addCommentAPI.url}${formParent.id}`,
                  key: addCommentAPI.key,
                };
              }}
              onResponseCallBackFn={(error) => {
                if (!error) {
                  history.push('/home');
                }
              }}
            />
          </FormWrapper>
        </div>
        <div className="fullWidthDiv">
          <hr />
          {(data.comments || []).map((comment, index) => {
            return (
              <div className="fullWidthDiv defaultMarginBottom commentStyleWrapper">
                <div className="commentUserWrapper">
                  <img src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" />
                  <div className="userInfo">
                    <strong>Nisal Madusanka</strong>
                    <small>
                      {dateObjectToString(comment.created_at, 'YY-mm-dd')}
                    </small>
                  </div>
                </div>
                <div className="col-md-12">
                  <p className={'defaultPaddingLeft defaultPaddingTop'}>
                    {comment.comment}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

const ViewPostPage = (props) => {
  const viewPostFormKey = 'viewPostFormKey';
  return (
    <TemplateOne>
      <Fragment>
        <UICard>
          <FormWrapper
            setGroupName={viewPostFormKey}
            apiUrl={`${editPostAPI.url}${props.match.params.id}`}
            onRebuildResponseFn={(result) => {
              return {
                heading: result.heading || '',
                content: result.content || '',
                tags: result.tags || '',
                comments: result.comments || [],
                _id: result._id || undefined,
                _onLoad: false,
              };
            }}
          >
            <GETFormState
              formKey={viewPostFormKey}
              parentToChild={{
                id: props.match.params.id,
                formKey: viewPostFormKey,
              }}
              component={ShowPostDetails}
            />
          </FormWrapper>
        </UICard>
      </Fragment>
    </TemplateOne>
  );
};

export default ViewPostPage;
