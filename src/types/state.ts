import { List } from "./data";
import { User } from "./user";
import { TooltipType } from "./tooltip";
import { DataMeta, Dictionary } from "./lib";
import { CityCode } from "./city";

export type AppState = {
  popup: {
    id?: string;
    type?: "list" | "addNew";
    item?: List;
  };
  tooltip: {
    id?: string;
    type?: TooltipType;
  };
  user: { userInfo: DataMeta<User>; lists: DataMeta<List[]>; city: CityCode };
  lists: DataMeta<Dictionary<List>>;
  city: DataMeta<Dictionary<List[]>>;
};
