import { GetUserInfoAction } from "../actions/user";

const initialState = {
  meta: {
    loading: false,
    error: null,
  },
  data: undefined,
};

export const getUserInfoReducer = (
  state = initialState,
  action: GetUserInfoAction
) => {
  switch (action.type) {
    case "GET_USER_INFO_STARTED":
      return {
        ...state,
        meta: {
          ...state.meta,
          loading: true,
        },
      };
    case "GET_USER_INFO_SUCCESS":
      return {
        ...state,
        data: action.payload?.userInfo,
        meta: {
          loading: false,
          error: undefined,
        },
      };
    case "GET_USER_INFO_FAILURE":
      return {
        ...state,
        meta: {
          loading: false,
          error: action?.payload?.error,
        },
      };
    default:
      return state;
  }
};
