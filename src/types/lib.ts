export interface DataMeta<T> {
  meta: {
    loading: boolean;
    error: string | undefined;
  };
  data: T;
}
