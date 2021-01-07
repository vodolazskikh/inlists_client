import { List } from "./data";

export type AppState = {
  popup: {
    id?: string;
    type?: "list" | "addNew";
    item?: List;
  };
};
