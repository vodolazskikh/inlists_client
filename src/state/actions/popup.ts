import { AppState } from "types/state";

export type OPEN_POPUP = {
  type: "OPEN_POPUP";
  payload: { popup: AppState["popup"] };
};
export type CLOSE_POPUP = { type: "CLOSE_POPUP" };

export const openPopup = (popup: AppState["popup"]) => ({
  type: "OPEN_POPUP",
  payload: { popup },
});
export const closePopup = () => ({
  type: "CLOSE_POPUP",
});
