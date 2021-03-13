/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-13 14:16:39
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-13 21:37:40
 */
import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TemplateOne } from '../../../ui-components/templates/TemplateOne';
import {
  CheckBox,
  SubmitButton,
  FormWrapper,
  inputBtnColors,
} from '../../../ui-components/ui-elements/form';
import {
  setUserRoleAPI,
  getUserByIDAPI,
  getRolesListAPI,
  setStatusChangeAPI,
} from '../../../../config/apiUrl.config';
import {
  CheckPermission,
  GETFormState,
  UICard,
} from '../../../ui-components/ui-elements/common/BaseElements';
import { permissions } from '../../../../config/permission.config';
import { CardBody } from './ManageUsers';

const ShowUserDetails = ({ data = {}, formParent = {} }) => {
  const history = useHistory();
  return (
    <UICard>
      <Fragment>
        <div className="fullWidthDiv">
          <CardBody row={data} key={0} />
        </div>
        <CheckPermission
          permission={permissions.MANAGE_USER_STATUS.permissions}
        >
          <SubmitButton
            btnText={`${
              data.status === true ? 'Block This User' : 'Approve This User'
            }`}
            formGroupName={formParent.formKey}
            btnColor={`${
              data.status === true
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
                url: `${setStatusChangeAPI.url}${formParent.id}/${
                  data.status === true ? '0' : '1'
                }`,
                key: setStatusChangeAPI.key,
              };
            }}
            onChangeRequestBodyFn={() => {}}
            onResponseCallBackFn={(error) => {
              if (!error) {
                history.push('/manage-user');
              }
            }}
          />
        </CheckPermission>
      </Fragment>
    </UICard>
  );
};

const AddRolePermisstion = ({ data = {}, formParent = {} }) => {
  const [getlist, setList] = useState({
    roles: formParent.currentRoles,
    status: false,
  });
  const history = useHistory();
  const checkFn = (id, value) => {
    console.log(id, value);
    if (value === true) {
      let roles = getlist.roles;
      roles.push(id);
      setList({
        ...getlist,
        roles: roles,
        status: !getlist.status,
      });
    } else {
      let roles = getlist.roles;
      roles.splice(roles.indexOf(id), 1);
      setList({
        ...getlist,
        roles: roles,
        status: !getlist.status,
      });
    }
  };
  return (
    <UICard>
      <div className="fullWidthDiv">
        <h3>Manage Roles</h3>
        {(data.roleList || []).map((role, index) => {
          return (
            <div key={index}>
              <CheckBox
                inputName="status"
                inputValue={
                  getlist.roles.indexOf(role._id) === -1 ? false : true
                }
                labelText={role.name}
                onChangeFn={(event) => checkFn(role._id, event.value)}
              />
            </div>
          );
        })}
        <CheckPermission
          permission={permissions.MANAGE_USER_ROLE_AND_PERMISSIONS.permissions}
        >
          <SubmitButton
            btnText={'Set Role'}
            formGroupName={formParent.formKey}
            isFullWidth={false}
            isValidate={false}
            callApiObject={{
              method: 'patch',
            }}
            onGetAPIEndPointFn={(fromObject) => {
              return {
                url: `${setUserRoleAPI.url}${formParent.id}`,
                key: setUserRoleAPI.key,
              };
            }}
            onChangeRequestBodyFn={() => {
              return {
                roles: getlist.roles,
              };
            }}
            onResponseCallBackFn={(error) => {
              if (!error) {
                history.push('/manage-user');
              }
            }}
          />
        </CheckPermission>
      </div>
    </UICard>
  );
};

const ManageUserStatus = (props) => {
  const changeStatusFormKey = 'changeStatusFormKey';
  const setRoleFromKey = 'setRoleFromKey';
  const [getRoleList, setRoleList] = useState([]);
  return (
    <TemplateOne>
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-6">
            <FormWrapper
              setGroupName={changeStatusFormKey}
              apiUrl={`${getUserByIDAPI.url}${props.match.params.userID}`}
              onRebuildResponseFn={(result) => {
                setRoleList(result.roles);
                return {
                  _id: result._id,
                  first_name: result.first_name || '',
                  last_name: result.last_name || '',
                  email: result.email || '',
                  profile: result.profile || {},
                  created_at: result.created_at,
                  status: result.status,
                  _onLoad: false,
                };
              }}
            >
              <GETFormState
                formKey={changeStatusFormKey}
                parentToChild={{
                  id: props.match.params.userID,
                  formKey: changeStatusFormKey,
                  authUserID: props.authUser.id,
                }}
                component={ShowUserDetails}
              />
            </FormWrapper>
          </div>
          <div className="col-md-6">
            <FormWrapper
              setGroupName={setRoleFromKey}
              apiUrl={getRolesListAPI.url}
              onRebuildResponseFn={(result) => {
                return {
                  roleList: result || [],
                  _onLoad: false,
                };
              }}
            >
              <GETFormState
                formKey={setRoleFromKey}
                parentToChild={{
                  id: props.match.params.userID,
                  formKey: setRoleFromKey,
                  authUserID: props.authUser.id,
                  currentRoles: getRoleList,
                }}
                component={AddRolePermisstion}
              />
            </FormWrapper>
          </div>
        </div>
      </div>
    </TemplateOne>
  );
};

export default ManageUserStatus;
