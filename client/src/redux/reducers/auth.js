import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  DELETE_ACCOUNT,
  EDIT_USER_PROFILE,
} from "../types";

const initialState = {
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  isAutenticated: null,
  loading: true,
  user: null,
  isAdmin: false,
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAutenticated: true,
        loading: false,
        user: payload,
        isAdmin: payload.role === 1 ? true : false,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      if (typeof window !== "undefined") {
        localStorage.setItem("token", payload);
      }

      return {
        ...state,
        ...payload,
        isAutenticated: true,
        loading: false,
      };
    case EDIT_USER_PROFILE:
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case DELETE_ACCOUNT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAutenticated: false,
        loading: false,
        user: null,
        isAdmin: false,
      };
    default:
      return state;
  }
};

export default auth;
