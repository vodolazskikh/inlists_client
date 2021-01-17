import { Dispatch } from "redux";
import { apiUrl } from "../../../config";
import { List } from "../../../types/data";

export type AddListAction = {
  type: "ADD_LIST_SUCCESS" | "ADD_LIST_STARTED" | "ADD_LIST_FAILURE";
  payload: { list: List; error?: string };
};

export const addList = (params: {
  title: string;
  description: string;
  items: any;
  emoji: string;
  city: string;
  authorId?: string;
}) => {
  const { title, description, items, emoji, city, authorId } = params;

  if (!authorId) {
    // Такого не должно быть, мы не должны дергать экшен,
    // Открывающий этот попап, если юзера нет
    return;
  }

  return (dispatch: Dispatch) => {
    dispatch(addListStarted());

    fetch(`${apiUrl}list`, {
      method: "post",
      body: JSON.stringify({
        title,
        description,
        items,
        emoji,
        city,
        authorId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data: List) => {
        dispatch(addListSuccess(data));
      })
      .catch((err) => {
        dispatch(addListFailure(err.message));
      });
  };
};

const addListSuccess = (list: List) => ({
  type: "ADD_LIST_SUCCESS",
  payload: {
    list,
  },
});

const addListStarted = () => ({
  type: "ADD_LIST_STARTED",
});

const addListFailure = (error: any) => ({
  type: "ADD_LIST_FAILURE",
  payload: {
    error,
  },
});
