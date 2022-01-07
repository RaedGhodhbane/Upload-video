import React, { useState } from "react";
import { connect } from "react-redux";
import { setAlert } from "../redux/actions/alert";
import { registerAction } from "../redux/actions/auth";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

function Register({ setAlert, registerAction, isAutenticated }) {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    cf_password: "",
  });

  const { name, username, password, lastname, email, cf_password } = formData;

  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    const formregister = {
      name,
      username,
      password,
      lastname,
      email,
    };
    if (password !== cf_password) {
      setAlert("Passwords do not match", "danger");
    } else {
      registerAction(formregister);
    }
  };
  if (isAutenticated) {
    return <Navigate to="/" />;
  }
  return (
    <div className="container">
      <div className="auth">
        <div className="cart">
          <div className="headercart">
            <img
              src=" https://cutewallpaper.org/24/sign-up-png/sign-up-png-images-transparent-background-png-play.png"
              alt=""
            />
          </div>
          <form autoComplete="nope" onSubmit={handelSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                onChange={handelChange}
                autoComplete="nope"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastname" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                name="lastname"
                value={lastname}
                onChange={handelChange}
                autoComplete="nope"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="userName" className="form-label">
                User ID
              </label>
              <input
                type="text"
                className="form-control"
                id="userName"
                name="username"
                value={username}
                onChange={handelChange}
                autoComplete="nope"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={handelChange}
                autoComplete="nope"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                name="password"
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={handelChange}
                autoComplete="nope"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cf_password" className="form-label">
                Password
              </label>
              <input
                name="cf_password"
                type="password"
                className="form-control"
                id="cf_password"
                value={cf_password}
                onChange={handelChange}
                autoComplete="nope"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

Register.prototype = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAutenticated: PropTypes.bool,
};

const mapStateToPrps = (state) => {
  return {
    isAutenticated: state.auth.isAutenticated,
  };
};

export default connect(mapStateToPrps, { setAlert, registerAction })(Register);
