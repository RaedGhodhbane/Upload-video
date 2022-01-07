import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";
import users from "./users";
import videos from "./videos";
export default combineReducers({
  auth,
  alert,
  users,
  videos,
});
