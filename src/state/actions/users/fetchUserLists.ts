import { apiUrl } from "config";
import { Dispatch } from "redux";
import { List } from "types/data";

// Юзерские списки
export type FetchUserListsAction = {
  type:
    | "FETCH_USER_LISTS_SUCCESS"
    | "FETCH_USER_LISTS_STARTED"
    | "FETCH_USER_LISTS_FAILURE";
  payload?: { lists: List[]; error?: string };
};

export const fetchUserLists = (params: { userId: string | undefined }) => {
  const { userId } = params;

  return (dispatch: Dispatch) => {
    dispatch(fetchUserListsStarted());

    fetch(`${apiUrl}userLists?userId=${userId}`)
      .then((res) => res.json())
      .then((data: List[]) => {
        dispatch(fetchUserListsSuccess(data));
      })
      .catch((err) => {
        dispatch(fetchUserListsFailure(err.message));
      });
  };
};

const fetchUserListsSuccess = (lists: List[]) => ({
  type: "FETCH_USER_LISTS_SUCCESS",
  payload: {
    lists,
  },
});

const fetchUserListsStarted = () => ({
  type: "FETCH_USER_LISTS_STARTED",
});

const fetchUserListsFailure = (error: any) => ({
  type: "FETCH_USER_LISTS_FAILURE",
  payload: {
    error,
  },
});
