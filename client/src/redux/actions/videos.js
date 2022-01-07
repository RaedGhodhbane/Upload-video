import axios from "axios";
import { CREATE_VIDEOS, GET_VIDEOS } from "../types";
import { setAlert } from "./alert";

export const getAllVideos = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/media");
    dispatch({
      type: GET_VIDEOS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const AddVideos = (formData) => async (dispatch) => {
  // const body = JSON.stringify(formData);
  try {
    const res = await axios.post("/api/media/createmedia", formData);

    dispatch({
      type: CREATE_VIDEOS,
      payload: res.data.createMedia,
    });
    dispatch(getAllVideos());
    dispatch(setAlert(res.data.msg, "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};
