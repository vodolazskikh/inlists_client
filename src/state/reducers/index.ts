import { combineReducers } from "redux";
import { popupReducer } from "./popup";
import { getUserInfoReducer } from "./user";

export const rootReducer = combineReducers({
  popup: popupReducer,
  user: getUserInfoReducer,
});
