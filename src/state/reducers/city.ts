import { FetchListByCityAction } from "../actions/lists/byCity";

const initialState = {
  meta: {
    loading: false,
    error: null,
  },
  data: {},
};

export const fetchListByCityReducer = (
  state = initialState,
  action: FetchListByCityAction
) => {
  switch (action.type) {
    case "FETCH_LIST_BY_CITY_STARTED":
      return {
        ...state,
        meta: {
          ...state.meta,
          loading: true,
        },
      };
    case "FETCH_LIST_BY_CITY_SUCCESS":
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.cityId]: action.payload.lists,
        },
        meta: {
          loading: false,
          error: undefined,
        },
      };
    case "FETCH_LIST_BY_CITY_FAILURE":
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
