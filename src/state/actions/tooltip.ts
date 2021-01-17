import { AppState } from "types/state";

export type ADD_TOOLTIP = {
  type: "ADD_TOOLTIP";
  payload: { tooltip: AppState["tooltip"] };
};
export type KILL_TOOLTIP = { type: "KILL_TOOLTIP" };

export const addTooltip = (tooltip: AppState["tooltip"]) => ({
  type: "ADD_TOOLTIP",
  payload: { tooltip },
});
export const killTooltip = () => ({
  type: "KILL_TOOLTIP",
});
