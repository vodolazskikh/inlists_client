import { AppState } from "types/state";
import { ActionTypes } from "state/actions";

const initialState: AppState["popup"] = {};

export const popupReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case "OPEN_POPUP":
      return { ...state, ...action.payload.popup };
    case "CLOSE_POPUP":
      return {};
    default:
      return state;
  }
};
