export interface List {
  _id: string;
  title: string;
  description: string;
  rating: number;
  items: { value: string; isChecked: boolean }[];
  emoji?: string;
  isAds?: boolean;
  isCityGeneral: boolean;
}

export type FilterName = "my" | "friends" | "favorites";
export interface FilterType {
  type: FilterName;
  name: string;
}
