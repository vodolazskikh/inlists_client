import { FetchUserListsAction } from "../actions/users/fetchUserLists";

const initialState = {
  meta: {
    loading: false,
    error: null,
  },
  data: undefined,
};

export const fetchUserListsReducer = (
  state = initialState,
  action: FetchUserListsAction
) => {
  switch (action.type) {
    case "FETCH_USER_LISTS_STARTED":
      return {
        ...state,
        meta: {
          ...state.meta,
          loading: true,
        },
      };
    case "FETCH_USER_LISTS_SUCCESS":
      return {
        ...state,
        data: action.payload?.lists,
        meta: {
          loading: false,
          error: undefined,
        },
      };
    case "FETCH_USER_LISTS_FAILURE":
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
