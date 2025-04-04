import { Nullable, Optional } from "@/types/common";
import { Permission } from "@/types/permission";
import { BaseResponse, GetListParams, GetListResponseData } from "@/types/response";
import { Role } from "@/types/role";

/**
 * State
 */
export interface RoleState {
  loading: {
    checkRoleNameExist: boolean;
    createRole: boolean;
    getListRole: boolean;
    getRole: boolean;
    editRole: boolean;
    removeRole: boolean;
    getListRolePermissions: boolean;
    addRolePermissions: boolean;
    removeRolePermission: boolean;
  };
  item: Nullable<Role>;
  list: Role[];
  totalCount: number;
  error: Nullable<string>;
  assignedRolePermissions: Permission[];
  unassignedRolePermissions: Permission[];
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
  sortBy?: Optional<Nullable<RoleFieldsSort>>;
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
export interface GetListRolePermissionsResponse
  extends BaseResponse<{
    assignedTotalCount: number;
    assignedList: Permission[];
    unassignedTotalCount: number;
    unassignedList: Permission[];
  }> {}

/**
 * Add Role Permissions
 */
export interface AddRolePermissionsPayload {
  roleId: string;
  permissionIds: string[];
}
export interface AddRolePermissionsResponse extends BaseResponse<Permission[]> {}

/**
 * Remove Role Permission
 */
export interface RemoveRolePermissionPayload {
  roleId: string;
  permissionId: string;
}
export interface RemoveRolePermissionResponse extends BaseResponse<{ id: string }> {}
