export interface List {
  id: string;
  title: string;
  description: string;
  rating: number;
  list: string[];
  emoji?: string;
  isAds?: boolean;
}

export type FilterName = "my" | "friends" | "favorites";
export interface FilterType {
  type: FilterName;
  name: string;
}
