import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  EDIT_USER_PROFILE,
} from "../types";

import setAuthToken from "../../utils/setAuthToken";

// load user

export const loadUser = () => async (dispatch) => {
  if (typeof window !== "undefined" && localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const registerAction = (formData) => async (dispatch) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  // const body = JSON.stringify(formData);
  try {
    const res = await axios.post("/api/users/register", formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// login user

export const loginAction = (formdata) => async (dispatch) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  // const body = JSON.stringify(formdata);
  try {
    const res = await axios.post("/api/auth/login", formdata);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// edit profile
export const editProfileAction = (formData) => async (dispatch) => {
  // const config = {
  //   headers: { "Content-Type": "application/json" },
  // };

  // const body = JSON.stringify(formData);
  try {
    await axios.post("/api/auth/editprofile", formData);
    dispatch({
      type: EDIT_USER_PROFILE,
    });

    dispatch(logOut());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

//logout // clear profile
export const logOut = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  dispatch({
    type: CLEAR_PROFILE,
  });
};
