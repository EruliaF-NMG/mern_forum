import React, { Fragment, useContext } from 'react';
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
  CheckPermission,
} from '../../../ui-components/ui-elements/common/BaseElements';
import {
  editPostAPI,
  addCommentAPI,
  getUserProfileImgAPI,
} from '../../../../config/apiUrl.config';
import { dateObjectToString } from '../../../../helpers/common-helpers/dateTime.helpers';
import { _get } from '../../../../helpers/common-helpers/lodash.wrappers';
import { postStatus, roleCodes } from '../../../../config/database-status';
import { permissions } from '../../../../config/permission.config';
import { AuthContext } from '../../../modules/core/context-providers/AuthContext.provider';

const ShowPostDetails = ({ data = {}, formParent = {} }) => {
  const history = useHistory();
  const [authStatus] = useContext(AuthContext);
  console.log(
    '++++++++++++++',
    _get(authStatus, 'authUser.roles', []).indexOf(roleCodes.admin) !== 1
  );
  return (
    <Fragment>
      <h1 className="defaultMarginBottom">
        <CheckPermission
          permission={permissions.MANAGE_POST_STATUS.permissions}
        >
          <span
            className={`badge defaultMarginRight ${
              data.status === postStatus.PENDING
                ? 'bg-warning'
                : data.status === postStatus.BLOCKED
                ? 'bg-danger'
                : 'bg-success'
            }`}
          >
            {data.status}
          </span>
        </CheckPermission>
        {data.heading}
      </h1>
      <p className="defaultMarginTopBottom">{data.content}</p>
      {formParent.authUserID === _get(data, 'created_by._id', undefined) ||
      _get(authStatus, 'authUser.roles', []).indexOf(roleCodes.admin) !== 1 ? (
        <SubmitButton
          elementWrapperStyle={'defaultMarginRight'}
          btnText="Delete"
          btnColor={inputBtnColors.secondary}
          formGroupName={formParent.formKey}
          isFullWidth={false}
          isValidate={false}
          callApiObject={{
            method: 'delete',
          }}
          onChangeRequestBodyFn={() => {}}
          onGetAPIEndPointFn={() => {
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
      ) : null}

      <CheckPermission permission={permissions.MANAGE_POST_STATUS.permissions}>
        <SubmitButton
          btnText={`${
            data.status === postStatus.APPROVED
              ? 'Block This Post'
              : 'Approve This Post'
          }`}
          formGroupName={formParent.formKey}
          btnColor={`${
            data.status === postStatus.APPROVED
              ? inputBtnColors.secondary
              : inputBtnColors.primary
          }`}
          isFullWidth={false}
          isValidate={false}
          callApiObject={{
            method: 'patch',
          }}
          onGetAPIEndPointFn={(fromObject) => {
            return {
              url: `${editPostAPI.url}${formParent.id}/${
                data.status === postStatus.APPROVED
                  ? postStatus.BLOCKED
                  : postStatus.APPROVED
              }`,
              key: editPostAPI.key,
            };
          }}
          onChangeRequestBodyFn={() => {}}
          onResponseCallBackFn={(error) => {
            if (!error) {
              history.push('/home');
            }
          }}
        />
      </CheckPermission>
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
              <div
                className="fullWidthDiv defaultMarginBottom commentStyleWrapper"
                key={index}
              >
                <div className="commentUserWrapper">
                  <img
                    src={`${getUserProfileImgAPI.url}${_get(
                      comment,
                      'created_by._id',
                      undefined
                    )}`}
                    alt="pro-pic"
                  />
                  <div className="userInfo">
                    <strong>{`${_get(
                      comment,
                      'created_by.first_name',
                      ''
                    )} ${_get(comment, 'created_by.last_name', '')}`}</strong>
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
          <Fragment>
            <FormWrapper
              setGroupName={viewPostFormKey}
              apiUrl={`${editPostAPI.url}${props.match.params.id}`}
              onRebuildResponseFn={(result) => {
                return {
                  heading: result.heading || '',
                  content: result.content || '',
                  tags: result.tags || '',
                  comments: result.comments || [],
                  status: result.status,
                  created_by: result.created_by,
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
                  authUserID: props.authUser.id,
                }}
                component={ShowPostDetails}
              />
            </FormWrapper>
          </Fragment>
        </UICard>
      </Fragment>
    </TemplateOne>
  );
};

export default ViewPostPage;
