import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { getUserProfileImgAPI } from '../../../../config/apiUrl.config';
import { AuthContext } from '../../../modules/core/context-providers/AuthContext.provider';
import { CheckPermission } from '../../ui-elements/common/BaseElements';
import { permissions } from '../../../../config/permission.config';
import { logoutUser } from '../../../../helpers/common-helpers/manageStorage.helpers';
import { userLogOutAPI } from '../../../..//config/apiUrl.config';
import { callApi } from '../../../../helpers/common-helpers/callApi.helpers';

const HeaderBar = () => {
  const [authState] = useContext(AuthContext);
  const logoutUserFn = () => {
    callApi(userLogOutAPI.url).headers(true).method('post').send();
    logoutUser();
    window.location.reload();
  };
  return (
    <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand" href="#">
          MERN Fourm
        </span>

        <div className="navbar-collapse offcanvas-collapse headerSubWrapper">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to={'/home'}>
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/my-profile'}>
                My Pofile
              </Link>
            </li>
            <CheckPermission
              permission={permissions.MANAGE_POST_STATUS.permissions}
            >
              <li className="nav-item">
                <Link className="nav-link" to={'/manage-post'}>
                  Manage Post
                </Link>
              </li>
            </CheckPermission>
            <CheckPermission
              permission={permissions.MANAGE_USER_STATUS.permissions}
            >
              <li className="nav-item">
                <Link className="nav-link" to={'/manage-user'}>
                  Manage Users
                </Link>
              </li>
            </CheckPermission>

            <li className="nav-item">
              <span className="nav-link pointer" onClick={() => logoutUserFn()}>
                Log Out
              </span>
            </li>
          </ul>
          <div className="profileInfo">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item ">
                <span className="profilePicWrapper">
                  <img
                    alt="pro-pic"
                    src={`${getUserProfileImgAPI.url}${authState.authUser.id}`}
                  />
                  <span className="nav-link">{authState.authUser.name}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export { HeaderBar };
