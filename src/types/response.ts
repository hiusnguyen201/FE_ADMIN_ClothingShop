import { Nullable, Optional } from "@/types/common";

export type SortOrderValue = "asc" | "desc";

export interface BaseResponse<TData> {
  code: number;
  codeMessage: string;
  message: string;
  timestamp: number;
  data: TData;
}

export interface GetListParams<TData> {
  page: number;
  limit: number;
  keyword?: Optional<string>;
  sortOrder?: Optional<Nullable<SortOrderValue>>;
  sortBy?: Optional<Nullable<keyof TData>>;
}

export interface GetListResponseData<TData> extends BaseResponse<{ totalCount: number; list: TData[] }> {}
