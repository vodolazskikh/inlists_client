export interface DataMeta<T> {
  meta: {
    loading: boolean;
    error: string | undefined;
  };
  data?: T;
}
export type Dictionary<T> = { [id: string]: T | undefined };
