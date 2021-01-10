import { Dispatch } from "redux";
import { apiUrl } from "../../../config";
import { List } from "../../../types/data";

export type GetListByIdAction = {
  type:
    | "GET_LIST_BY_ID_SUCCESS"
    | "GET_LIST_BY_ID_STARTED"
    | "GET_LIST_BY_ID_FAILURE";
  payload: { list: List; error?: string };
};

export const getListById = (params: { id: string }) => {
  const { id } = params;

  return (dispatch: Dispatch) => {
    dispatch(getListByIdStarted());

    fetch(`${apiUrl}listById?id=${id}`)
      .then((res) => res.json())
      .then((data: List) => {
        dispatch(getListByIdSuccess(data));
      })
      .catch((err) => {
        dispatch(getListByIdFailure(err.message));
      });
  };
};

const getListByIdSuccess = (list: List) => ({
  type: "GET_LIST_BY_ID_SUCCESS",
  payload: {
    list,
  },
});

const getListByIdStarted = () => ({
  type: "GET_LIST_BY_ID_STARTED",
});

const getListByIdFailure = (error: any) => ({
  type: "GET_LIST_BY_ID_FAILURE",
  payload: {
    error,
  },
});
