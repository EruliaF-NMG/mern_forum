import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { getUserProfileImgAPI } from '../../../../config/apiUrl.config';
import { AuthContext } from '../../../modules/core/context-providers/AuthContext.provider';

const HeaderBar = () => {
  const [authState] = useContext(AuthContext);
  return (
    <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand" href="#">
          MERN Fourm
        </span>

        <div className="navbar-collapse offcanvas-collapse headerSubWrapper">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/home">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link">My Pofile</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link">Manage Post</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link">Manage Users</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link">Manage Role Permistion</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link">Log Out</Link>
            </li>
          </ul>
          <div className="profileInfo">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item ">
                <Link className="profilePicWrapper">
                  <img
                    alt="pro-pic"
                    src={`${getUserProfileImgAPI.url}${authState.authUser.id}`}
                  />
                  <span className="nav-link">{authState.authUser.name}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export { HeaderBar };
