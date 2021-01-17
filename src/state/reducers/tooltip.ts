import { AppState } from "types/state";
import { ActionTypes } from "state/actions";

const initialState: AppState["tooltip"] = {};

export const tooltipReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case "ADD_TOOLTIP":
      return { ...state, ...action.payload.tooltip };
    case "KILL_TOOLTIP":
      return {};
    default:
      return state;
  }
};
