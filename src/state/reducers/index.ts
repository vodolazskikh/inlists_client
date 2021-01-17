import { combineReducers } from "redux";
import { popupReducer } from "./popup";
import { tooltipReducer } from "./tooltip";
import { getUserInfoReducer } from "./user";
import { getListByIdReducer } from "./list";
import { fetchListByCityReducer } from "./city";

export const rootReducer = combineReducers({
  popup: popupReducer,
  tooltip: tooltipReducer,
  user: getUserInfoReducer,
  lists: getListByIdReducer,
  city: fetchListByCityReducer,
});
