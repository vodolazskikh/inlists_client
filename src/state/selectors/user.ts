import { AppState } from "types/state";

export const getCurrentUserInfo = (state: AppState) => {
  return state.user.userInfo.data;
};

export const getCurrentUserLists = (state: AppState) => {
  return state.user.lists;
};
