import { GetListByIdAction } from "../actions/lists/byId";

const initialState = {
  meta: {
    loading: false,
    error: null,
  },
  data: {},
};

export const getListByIdReducer = (
  state = initialState,
  action: GetListByIdAction
) => {
  switch (action.type) {
    case "GET_LIST_BY_ID_STARTED":
      return {
        ...state,
        meta: {
          ...state.meta,
          loading: true,
        },
      };
    case "GET_LIST_BY_ID_SUCCESS":
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.list.id]: action.payload.list,
        },
        meta: {
          loading: false,
          error: undefined,
        },
      };
    case "GET_LIST_BY_ID_FAILURE":
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
