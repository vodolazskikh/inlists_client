import { Dispatch } from "redux";
import { apiUrl } from "../../../config";
import { List } from "../../../types/data";

export type FetchListByCityAction = {
  type:
    | "FETCH_LIST_BY_CITY_SUCCESS"
    | "FETCH_LIST_BY_CITY_STARTED"
    | "FETCH_LIST_BY_CITY_FAILURE";
  payload: { lists: List[]; cityId: string; error?: string };
};

export const fetchListsByCity = (params: { city: string }) => {
  const { city } = params;

  return (dispatch: Dispatch) => {
    dispatch(fetchListsByCityStarted());

    fetch(`${apiUrl}listByCity?id=${city}`)
      .then((res) => res.json())
      .then((data: List[]) => {
        dispatch(fetchListsByCitySuccess(data, city));
      })
      .catch((err) => {
        dispatch(fetchListsByCityFailure(err.message));
      });
  };
};

const fetchListsByCitySuccess = (lists: List[], city: string) => ({
  type: "FETCH_LIST_BY_CITY_SUCCESS",
  payload: {
    lists,
    cityId: city,
  },
});

const fetchListsByCityStarted = () => ({
  type: "FETCH_LIST_BY_CITY_STARTED",
});

const fetchListsByCityFailure = (error: any) => ({
  type: "FETCH_LIST_BY_CITY_FAILURE",
  payload: {
    error,
  },
});
