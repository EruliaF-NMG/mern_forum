/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-09 19:45:39
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-10 22:40:36
 */

import React, { Fragment, useState } from 'react';
import { TemplateOne } from '../../../ui-components/templates/TemplateOne';
import {
  FormWrapper,
  InputBoxWithState,
  SubmitButton,
} from '../../../ui-components/ui-elements/form';
import { editUserAPI } from '../../../../config/apiUrl.config';
import { useHistory } from 'react-router-dom';

const MyProfile = ({ userID = null }) => {
  const editFormKey = 'editUserKey';
  const history = useHistory();
  return (
    <div className="fullWidthDiv defaultMarginTopBottom">
      <div className="col-md-12 ">
        <FormWrapper
          elementStyle=""
          setGroupName={editFormKey}
          apiUrl={`${editUserAPI.url}${userID}`}
          onRebuildResponseFn={(result) => {
            return {
              first_name: result.first_name || '',
              last_name: result.last_name || '',
              about: result.profile.about || '',
              address: result.profile.address || '',
              contact: result.profile.contact || '',
              _onLoad: false,
            };
          }}
        >
          <InputBoxWithState
            formGroupName={editFormKey}
            inputName="first_name"
            lableText="First Name"
          />
          <InputBoxWithState
            formGroupName={editFormKey}
            inputName="last_name"
            lableText="Last Name"
          />
          <InputBoxWithState
            formGroupName={editFormKey}
            inputName="contact"
            lableText="Contact"
          />
          <InputBoxWithState
            formGroupName={editFormKey}
            inputName="about"
            lableText="About"
            rows={3}
            isMultiline={true}
          />
          <span className="fullWidthDiv defaultMarginTopBottom"></span>
          <SubmitButton
            btnText="Update"
            formGroupName={editFormKey}
            isValidate={true}
            flashMessages={{
              success: {
                status: true,
                message: 'User Update successfully Completed.',
                messageType: 'success',
              },
            }}
            validationObject={{
              fileds: {
                first_name: 'First Name',
                last_name: 'Last Name',
                contact: 'Contact',
              },
              rules: {
                first_name: 'required',
                last_name: 'required',
                contact: 'max:10',
              },
              message: {},
            }}
            callApiObject={{
              method: 'put',
            }}
            onGetAPIEndPointFn={() => {
              return {
                url: `${editUserAPI.url}${userID}`,
                key: editUserAPI.key,
              };
            }}
            onResponseCallBackFn={(error) => {
              if (!error) {
                history.go(0);
              }
            }}
          />
        </FormWrapper>
      </div>
    </div>
  );
};

const ProfilePage = (props) => {
  const [getState, setState] = useState({
    activeTab: 'PROFILE',
  });
  return (
    <TemplateOne>
      <Fragment>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${
                getState.activeTab === 'PROFILE' ? 'active' : ''
              }`}
              onClick={() =>
                setState({
                  ...getState,
                  activeTab: 'PROFILE',
                })
              }
            >
              My Profile
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${
                getState.activeTab === 'POSTS' ? 'active' : ''
              }`}
              onClick={() =>
                setState({
                  ...getState,
                  activeTab: 'POSTS',
                })
              }
            >
              My Posts
            </button>
          </li>
        </ul>
        <div className="tab-content">
          <div
            className={`tab-pane fade ${
              getState.activeTab === 'PROFILE' ? 'show active' : ''
            }`}
          >
            <MyProfile userID={props.authUser.id} />
          </div>
          <div
            className={`tab-pane fade ${
              getState.activeTab === 'POSTS' ? 'show active' : ''
            }`}
          >
            post
          </div>
        </div>
      </Fragment>
    </TemplateOne>
  );
};

export default ProfilePage;
