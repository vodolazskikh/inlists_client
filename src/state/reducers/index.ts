import { combineReducers } from "redux";
import { popupReducer } from "./popup";
import { tooltipReducer } from "./tooltip";
import { getUserInfoReducer } from "./userInfo";
import { fetchUserListsReducer } from "./userLists";
import { setUserCityReducer } from "./userCity";
import { getListByIdReducer } from "./list";
import { fetchListByCityReducer } from "./city";

export const rootReducer = combineReducers({
  popup: popupReducer,
  tooltip: tooltipReducer,
  user: combineReducers({
    userInfo: getUserInfoReducer,
    lists: fetchUserListsReducer,
    city: setUserCityReducer,
  }),
  lists: getListByIdReducer,
  city: fetchListByCityReducer,
});
