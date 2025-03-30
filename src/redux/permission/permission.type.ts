import { Nullable, Optional } from "@/types/common";
import { Permission } from "@/types/permission";
import { GetListParams, GetListResponseData } from "@/types/response";

/**
 * State
 */
export interface PermissionState {
  loading: {
    getListPermission: boolean;
  };
  item: Nullable<Permission>;
  list: Permission[];
  totalCount: number;
  error: Nullable<string>;
  isInitialized: boolean;
}

/**
 * Get List Permission
 */
type PermissionFieldsSort = Extract<"name" | "createdAt", Permission>;
export interface GetListPermissionPayload extends GetListParams<Permission> {
  sortBy?: Optional<Nullable<PermissionFieldsSort>>;
}
export interface GetListPermissionResponse extends GetListResponseData<Permission> {}
