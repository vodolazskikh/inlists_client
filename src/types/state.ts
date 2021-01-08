import { List } from "./data";
import { User } from "./user";
import { DataMeta } from "./lib";

export type AppState = {
  popup: {
    id?: string;
    type?: "list" | "addNew";
    item?: List;
  };
  user: { userInfo: DataMeta<User> };
};
