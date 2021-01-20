import { SetUserCityAction } from "state/actions/user";

export const setUserCityReducer = (
  state = "nsk",
  action: SetUserCityAction
) => {
  switch (action.type) {
    case "SET_USER_CITY":
      return action.payload.city;
    default:
      return state;
  }
};
