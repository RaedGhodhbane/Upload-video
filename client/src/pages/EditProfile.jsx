import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAlert } from "../redux/actions/alert";
import { editProfileAction } from "../redux/actions/auth";

function EditProfile({ auth: { isAutenticated, loading, user } }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  useEffect(() => {
    setFormData({
      name: loading || !user.name ? "" : user.name,
      lastname: loading || !user.lastname ? "" : user.lastname,
      username: loading || !user.username ? "" : user.username,
      email: loading || !user.email ? "" : user.email,
      password: "",
      cf_password: "",
    });
  }, [loading]);

  const handelSubmit = (e) => {
    e.preventDefault();
    const newuser = {
      name,
      lastname,
      username,
      email,
      password,
    };
    if (password !== cf_password) {
      setAlert("Passwords do not match", "danger");
    } else {
      //   console.log(newuser);

      localStorage.removeItem("token");
      dispatch(editProfileAction(newuser));
      navigate("/login", { replace: true });
    }
  };

  const reset = () => {
    setFormData({
      name: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      cf_password: "",
    });
  };
  return (
    <div className="editpage ">
      <div className="bar-editpage">
        <h6>EDIT PROFILE</h6> <Link to="/profile">Return to profile</Link>
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
            autoComplete="nope"
            value={email}
            onChange={handelChange}
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
            Confirm Password
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
        <button type="submit" className="btn btn-dark">
          update
        </button>
        <button onClick={reset} type="reset" className="btn btn-danger">
          cancel
        </button>
      </form>
    </div>
  );
}

EditProfile.prototype = {
  auth: PropTypes.func.isRequired,
};
const mapStateToPrps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToPrps)(EditProfile);
