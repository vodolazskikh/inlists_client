import { List } from "types/data";
import { AppState } from "types/state";

export const getListById = (listId?: string) => (
  state: AppState
): List | undefined => {
  if (!state.lists.data || !listId) {
    return;
  }
  return state.lists.data[listId];
};
