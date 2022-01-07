import React, { useState } from "react";
import { connect } from "react-redux";
import { loginAction } from "../redux/actions/auth";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
function Login({ loginAction, isAutenticated }) {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const { username, password } = formData;

  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    const myFormdata = {
      username,
      password,
    };
    loginAction(myFormdata);
    // console.log(username, password);
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
              src="https://cdn.dribbble.com/users/4538838/screenshots/14857111/media/c841963bf7c7b855030c0bf197da03fd.jpg?compress=1&resize=400x300"
              alt=""
            />
          </div>
          <form autoComplete="off" onSubmit={handelSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                User ID
              </label>
              <input
                autoComplete="nope"
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={username}
                onChange={handelChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                autoComplete="nope"
                name="password"
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={handelChange}
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

Login.prototype = {
  login: PropTypes.func.isRequired,
  isAutenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAutenticated: state.auth.isAutenticated,
});
export default connect(mapStateToProps, { loginAction })(Login);
