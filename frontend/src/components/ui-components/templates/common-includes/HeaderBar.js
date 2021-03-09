import React from 'react';
import { Link } from 'react-router-dom';

const HeaderBar = () => {
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
                  <img src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" />
                  <span className="nav-link">Nisal Madusanka</span>
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
