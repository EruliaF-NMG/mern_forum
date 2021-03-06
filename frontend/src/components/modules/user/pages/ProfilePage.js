/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-09 19:45:39
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-13 15:57:11
 */

import React, { Fragment, useState, useRef, useContext } from 'react';
import { TemplateOne } from '../../../ui-components/templates/TemplateOne';
import {
  FormWrapper,
  InputBoxWithState,
  SubmitButton,
  InputButton,
  CheckBox,
} from '../../../ui-components/ui-elements/form';
import {
  editUserAPI,
  getUserProfileImgAPI,
  setUserProfileImgAPI,
  getAllPostAPI,
} from '../../../../config/apiUrl.config';
import { useHistory } from 'react-router-dom';
import {
  UICard,
  CheckPermission,
} from '../../../ui-components/ui-elements/common/BaseElements';
import { callApi } from '../../../../helpers/common-helpers/callApi.helpers';
import { permissions } from '../../../../config/permission.config';
import { ForumWrapper } from '../../../ui-components/ui-elements/forum/ForumWrapper';
import { postStatus } from '../../../../config/database-status';
import {
  SearchBox,
  CardActionBody,
  CardBody,
} from '../../post/pages/includes/PostUIElements';

const MyPosts = ({ userID = null }) => {
  const [uiState, setUIState] = useState(postStatus.APPROVED);
  return (
    <div className="fullWidthDiv">
      <div className="fullWidthDiv defaultPaddingTop">
        <CheckBox
          elementWrapperStyle={'col-md-2'}
          inputName="status"
          inputValue={uiState === postStatus.APPROVED ? true : false}
          labelText={'Approved'}
          onChangeFn={() => setUIState(postStatus.APPROVED)}
        />
        <CheckBox
          elementWrapperStyle={'col-md-2'}
          inputName="status"
          inputValue={uiState === postStatus.PENDING ? true : false}
          labelText={'Pending'}
          onChangeFn={() => setUIState(postStatus.PENDING)}
        />
        <CheckBox
          elementWrapperStyle={'col-md-2'}
          inputName="status"
          inputValue={uiState === postStatus.BLOCKED ? true : false}
          labelText={'Blocked'}
          onChangeFn={() => setUIState(postStatus.BLOCKED)}
        />
      </div>
      <ForumWrapper
        heading={'My Posts'}
        apiUrl={`${getAllPostAPI.url}?created_by=${userID}&status=${uiState}`}
        forumKey={`${getAllPostAPI.key}_myPosts`}
        defaultSearchFormObject={{ serachkey: '' }}
        cardBody={CardBody}
        searchComponent={SearchBox}
        cardAction={CardActionBody}
      />
    </div>
  );
};

const MyProfile = ({ userID = null }) => {
  const editFormKey = 'editUserKey';
  const history = useHistory();

  const onFileChangeFn = (event) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('profileImage', file);

      callApi(`${setUserProfileImgAPI.url}${userID}`)
        .headers(true)
        .isMultipart(true)
        .method('post')
        .body(formData)
        .send((error, response) => {
          if (error) {
            alert('Somthing Went Wrong');
          } else {
            history.go(0);
          }
        });
    }
  };
  const fileBrowser = useRef(null);

  return (
    <div className="fullWidthDiv defaultMarginTopBottom">
      <div className="col-md-12 ">
        <div className="row ">
          <div className="col-md-6">
            <UICard>
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
                  inputName="address"
                  lableText="Address"
                />
                <InputBoxWithState
                  formGroupName={editFormKey}
                  inputName="about"
                  lableText="About"
                  rows={3}
                  isMultiline={true}
                />
                <span className="fullWidthDiv defaultMarginTopBottom"></span>
                <CheckPermission
                  permission={permissions.EDIT_OWN_PROFILE.permissions}
                >
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
                </CheckPermission>
              </FormWrapper>
            </UICard>
          </div>
          <div className="col-md-6">
            <UICard>
              <center>
                <img
                  alt="pro-pic"
                  src={`${getUserProfileImgAPI.url}${userID}`}
                  width="200"
                />
                <br /> <br />
                <input
                  type="file"
                  onChange={(event) => onFileChangeFn(event)}
                  className="displayNone"
                  ref={fileBrowser}
                />
                <br />
                <CheckPermission
                  permission={permissions.EDIT_OWN_PROFILE.permissions}
                >
                  <InputButton
                    btnText={'Upload Image'}
                    onClickBtnFn={() => fileBrowser.current.click()}
                  />
                </CheckPermission>
              </center>
            </UICard>
          </div>
        </div>
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
            <MyPosts userID={props.authUser.id} />
          </div>
        </div>
      </Fragment>
    </TemplateOne>
  );
};

export default ProfilePage;
