import axios from "axios";
import { GET_ALL_USERS, DELETE_USER } from "../types";
import { setAlert } from "./alert";

// getusers
export const getUsersAction = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/auth/getusers");
    dispatch({
      type: GET_ALL_USERS,
      payload: res.data,
    });
    console.log(res.data);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

// deleteuser/:id

export const deleteUserAction = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/auth/deleteuser/${id}`);
    dispatch({
      type: DELETE_USER,
    });
    dispatch(setAlert(res.data.msg, "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};
