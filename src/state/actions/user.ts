import { Dispatch } from "redux";
import { CityCode } from "types/city";
import { apiUrl } from "../../config";
import { User } from "../../types/user";

export type GetUserInfoAction = {
  type:
    | "GET_USER_INFO_SUCCESS"
    | "GET_USER_INFO_STARTED"
    | "GET_USER_INFO_FAILURE";
  payload?: { userInfo: User; error?: string };
};

export type SetUserCityAction = {
  type: "SET_USER_CITY";
  payload: { city: CityCode };
};

export const getUserInfo = (params: { token: string; userId: string }) => {
  const { token, userId } = params;

  return (dispatch: Dispatch) => {
    dispatch(getUserInfoStarted());

    fetch(`${apiUrl}userInfo?userId=${userId}&token=${token}`)
      .then((res) => res.json())
      .then((data: User) => {
        dispatch(getUserInfoSuccess(data));
      })
      .catch((err) => {
        dispatch(getUserInfoFailure(err.message));
      });
  };
};

const getUserInfoSuccess = (userInfo: User) => ({
  type: "GET_USER_INFO_SUCCESS",
  payload: {
    userInfo,
  },
});

const getUserInfoStarted = () => ({
  type: "GET_USER_INFO_STARTED",
});

const getUserInfoFailure = (error: any) => ({
  type: "GET_USER_INFO_FAILURE",
  payload: {
    error,
  },
});

export const setUserCity = (city: CityCode): SetUserCityAction => ({
  type: "SET_USER_CITY",
  payload: {
    city,
  },
});
