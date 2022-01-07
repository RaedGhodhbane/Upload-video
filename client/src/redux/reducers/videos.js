import { GET_VIDEOS, CREATE_VIDEOS } from "../types";

const initialState = {
  loading: true,
  allVideos: [],
  video: null,
};

const videos = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_VIDEOS:
      return {
        ...state,
        allVideos: payload,
        loading: false,
      };
    case CREATE_VIDEOS:
      return {
        ...state,
        video: payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default videos;
