/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-13 14:16:39
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-13 21:36:12
 */
import React, { useState, Fragment, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { TemplateOne } from '../../../ui-components/templates/TemplateOne';
import { CheckBox, InputButton } from '../../../ui-components/ui-elements/form';
import {
  getUserListAPI,
  getUserProfileImgAPI,
} from '../../../../config/apiUrl.config';

import { ForumWrapper } from '../../../ui-components/ui-elements/forum/ForumWrapper';
import { dateObjectToString } from '../../../../helpers/common-helpers/dateTime.helpers';
import { _get } from '../../../../helpers/common-helpers/lodash.wrappers';
import { AuthContext } from '../../core/context-providers/AuthContext.provider';
import { CheckPermission } from '../../../ui-components/ui-elements/common/BaseElements';
import { permissions } from '../../../../config/permission.config';

const CardBody = ({ row = {} }) => {
  return (
    <Fragment>
      <div className="commentUserWrapper defaultMarginTop">
        <img src={`${getUserProfileImgAPI.url}${row._id}`} alt="pro-pic" />
        <div className="userInfo">
          <strong>{`${row.first_name} ${row.last_name}`}</strong>
          <small>{`${dateObjectToString(row.created_at, 'YY-mm-dd')}`}</small>
        </div>
      </div>
      <div className="fullWidthDiv defaultPadding">
        <span
          className={`badge defaultMarginRight ${
            row.status === false ? 'bg-warning' : 'bg-success'
          }`}
        >
          {row.status === true ? 'Active Account' : 'Blocked Account'}
        </span>
        <div className="row">
          <div className="col-md-6">
            <strong>E-mail : </strong>
            {row.email}
          </div>
          <div className="col-md-6">
            <strong>Address : </strong>
            {_get(row, 'profile.address', '-')}
          </div>
          <div className="col-md-6">
            <strong>Contact : </strong>
            {_get(row, 'profile.contact', '-')}
          </div>
          <div className="col-md-12">
            <strong>About ME: </strong>
            {_get(row, 'profile.about', '-')}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const CardActionBody = ({ row = {} }) => {
  const history = useHistory();
  const [authState] = useContext(AuthContext);
  return (
    <Fragment>
      <CheckPermission permission={permissions.MANAGE_USER_STATUS.permissions}>
        <InputButton
          btnText="Manage User"
          onClickBtnFn={() => history.push(`manage-user-status/${row._id}`)}
        />
      </CheckPermission>
    </Fragment>
  );
};

const ManageUsers = ({ userID = null }) => {
  const [uiState, setUIState] = useState('1');
  return (
    <TemplateOne>
      <div className="fullWidthDiv">
        <div className="fullWidthDiv defaultPaddingTop">
          <CheckBox
            elementWrapperStyle={'col-md-2'}
            inputName="status"
            inputValue={uiState === '1' ? true : false}
            labelText={'Approved'}
            onChangeFn={() => setUIState('1')}
          />
          <CheckBox
            elementWrapperStyle={'col-md-2'}
            inputName="status"
            inputValue={uiState === '0' ? true : false}
            labelText={'Pending'}
            onChangeFn={() => setUIState('0')}
          />
        </div>
        <ForumWrapper
          heading={'Manage Users'}
          apiUrl={`${getUserListAPI.url}?&status=${uiState}`}
          forumKey={`${getUserListAPI.key}`}
          defaultSearchFormObject={{ serachkey: '' }}
          cardBody={CardBody}
          cardAction={CardActionBody}
        />
      </div>
    </TemplateOne>
  );
};

export default ManageUsers;
export { CardBody };
