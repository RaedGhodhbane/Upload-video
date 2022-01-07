import { GET_ALL_USERS } from "../types";

const initialState = {
  loading: true,
  allUsers: [],
};

const users = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_USERS:
      return {
        allUsers: payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default users;
