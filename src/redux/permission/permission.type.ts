import { Nullable, Optional } from "@/types/common";
import { Permission } from "@/types/permission";
import { GetListParams, GetListResponseData } from "@/types/response";

interface LoadingPermissionState {
  getListPermission: boolean;
}

export interface PermissionState {
  loading: LoadingPermissionState;
  item: Nullable<Permission>;
  list: Permission[];
  totalCount: number;
  error: Nullable<string>;
  isInitialized: boolean;
}

export type SortByField = Extract<"name" | "createdAt", Permission>;

export interface GetListPermissionPayload extends GetListParams<Permission> {
  sortBy: Optional<Nullable<SortByField>>;
}

export interface GetListPermissionResponse extends GetListResponseData<Permission> {}
