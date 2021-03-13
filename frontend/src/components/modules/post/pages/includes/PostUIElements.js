import React, { Fragment, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../../../modules/core/context-providers/AuthContext.provider';
import {
  InputBoxWithState,
  InputButton,
} from '../../../../ui-components/ui-elements/form';
import { CheckPermission } from '../../../../ui-components/ui-elements/common/BaseElements';
import { getUserProfileImgAPI } from '../../../../../config/apiUrl.config';
import { postStatus } from '../../../../../config/database-status';
import { permissions } from '../../../../../config/permission.config';
import { _get } from '../../../../../helpers/common-helpers/lodash.wrappers';
import { dateObjectToString } from '../../../../../helpers/common-helpers/dateTime.helpers';

const CardBody = ({ row = {} }) => {
  return (
    <Fragment>
      <h6 className="border-bottom pb-2 mb-0">
        <CheckPermission
          permission={permissions.MANAGE_POST_STATUS.permissions}
        >
          <span
            className={`badge defaultMarginRight ${
              row.status === postStatus.PENDING
                ? 'bg-warning'
                : row.status === postStatus.BLOCKED
                ? 'bg-danger'
                : 'bg-success'
            }`}
          >
            {row.status}
          </span>
        </CheckPermission>
        {row.heading}
      </h6>
      <p className="defaultPaddingTopBottom border-bottom">
        {`${row.content}`.length > 300
          ? `${row.content.substr(0, 300)}.....`
          : row.conten}
      </p>
      {row.created_by ? (
        <Fragment>
          <div className="commentUserWrapper defaultMarginTop">
            <img
              src={`${getUserProfileImgAPI.url}${row.created_by._id}`}
              alt="pro-pic"
            />
            <div className="userInfo">
              <strong>{`${row.created_by.first_name} ${row.created_by.last_name}`}</strong>
              <small>{`${dateObjectToString(
                row.created_at,
                'YY-mm-dd'
              )}`}</small>
            </div>
          </div>
          <hr />
        </Fragment>
      ) : null}
    </Fragment>
  );
};

const CardActionBody = ({ row = {} }) => {
  const history = useHistory();
  const [authState] = useContext(AuthContext);
  return (
    <Fragment>
      <InputButton
        btnText="View More"
        onClickBtnFn={() => history.push(`view-post/${row._id}`)}
      />
      {authState.authUser.id === _get(row, 'created_by._id', undefined) ? (
        <InputButton
          btnText="Edit"
          onClickBtnFn={() => history.push(`edit-post/${row._id}`)}
        />
      ) : null}
    </Fragment>
  );
};

const SearchBox = (props) => {
  return (
    <div className="col-md-12 defaultMarginBottom">
      <InputBoxWithState
        formGroupName={props.formKey}
        inputName={'serachkey'}
        lableText={'Serach Key'}
      />
    </div>
  );
};

export { SearchBox, CardActionBody, CardBody };
