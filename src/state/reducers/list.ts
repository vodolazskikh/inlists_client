import { GetListByIdAction } from "../actions/lists/byId";
import { AddListAction } from "../actions/lists/addNew";

const initialState = {
  meta: {
    loading: false,
    error: null,
  },
  data: {},
};

export const getListByIdReducer = (
  state = initialState,
  action: GetListByIdAction | AddListAction
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
          [action.payload.list._id]: action.payload.list,
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

    case "ADD_LIST_STARTED":
      return {
        ...state,
        meta: {
          ...state.meta,
          loading: true,
        },
      };
    case "ADD_LIST_SUCCESS":
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.list._id]: action.payload.list,
        },
        meta: {
          loading: false,
          error: undefined,
        },
      };
    case "ADD_LIST_FAILURE":
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
