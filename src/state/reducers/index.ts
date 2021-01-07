import { combineReducers } from "redux";
import { popupReducer } from "./popup";

export const rootReducer = combineReducers({
  popup: popupReducer,
});
