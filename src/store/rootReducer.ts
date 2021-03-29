import { combineReducers } from "redux";
import AuthReducer from "./actions/auth/reducer";
import DataReducer from "./actions/data/reducer";

export default combineReducers({
  Auth: AuthReducer,
  Data: DataReducer,
});
