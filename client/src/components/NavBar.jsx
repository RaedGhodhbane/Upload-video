import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../redux/actions/auth";
import PropTypes from "prop-types";
function NavBar({ logOut, auth: { isAutenticated } }) {
  const isLoged = (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <Link className="nav-link" aria-current="page" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/profile">
          Profile
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/users">
          Users
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/videos">
          Videos
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login" onClick={logOut}>
          LogOut
        </Link>
      </li>
    </ul>
  );

  const notLoged = (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <Link className="nav-link" aria-current="page" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          register
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Navbar
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {<>{isAutenticated ? isLoged : notLoged}</>}
        </div>
      </div>
    </nav>
  );
}

NavBar.prototype = {
  logOut: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logOut })(NavBar);
