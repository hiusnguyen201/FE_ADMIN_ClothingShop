import { Nullable, Optional } from "@/types/common";
import { Permission } from "@/types/permission";
import { BaseResponse, GetListParams, GetListResponseData } from "@/types/response";
import { Role } from "@/types/role";

/**
 * State
 */
export interface RoleState {
  loading: {
    createRole: boolean;
    getListRole: boolean;
    getRole: boolean;
    editRole: boolean;
    removeRole: boolean;
    getListRolePermissions: boolean;
    editListRolePermissions: boolean;
  };
  item: Nullable<Role>;
  list: Role[];
  totalCount: number;
  error: Nullable<string>;
  isInitialized: boolean;
  listRolePermissions: Permission[];
}

/**
 * Create Role
 */
export type CreateRolePayload = {
  name: string;
  description: string;
};
export interface CreateRoleResponse extends BaseResponse<Role> {}

/**
 * Get List Role
 */
type RoleFieldsSort = Extract<"name" | "createdAt", Role>;
export interface GetListRolePayload extends GetListParams<Role> {
  sortBy: Optional<Nullable<RoleFieldsSort>>;
}
export interface GetListRoleResponse extends GetListResponseData<Role> {}

/**
 * Get Role
 */
export interface GetRolePayload {
  id: string;
}
export interface GetRoleResponse extends BaseResponse<Role> {}

/**
 * Edit Role
 */
export type EditRoleInfoPayload = {
  id: string;
  name?: string;
  description?: string;
};
export interface EditRoleInfoResponse extends BaseResponse<Role> {}

/**
 * Remove Role
 */
export type RemoveRolePayload = {
  id: string;
};
export interface RemoveRoleResponse extends BaseResponse<{ id: string }> {}

/**
 * Check Role Name Exist
 */
export type CheckRoleNameExistPayload = {
  name: string;
};
export interface CheckRoleNameExistResponse extends BaseResponse<boolean> {}

/**
 * Get List Role Permissions
 */
type RolePermissionsFieldsSort = Extract<"name" | "createdAt", Permission>;
export interface GetListRolePermissionsPayload extends GetListParams<Permission> {
  roleId: string;
  sortBy?: Optional<Nullable<RolePermissionsFieldsSort>>;
}
export interface GetListRolePermissionsResponse extends GetListResponseData<Permission> {}

/**
 * Edit List Role Permissions
 */
export interface EditListRolePermissionsPayload {
  roleId: string;
  permissionIds: string[];
}
export interface EditListRolePermissionsResponse extends BaseResponse<Permission[]> {}
