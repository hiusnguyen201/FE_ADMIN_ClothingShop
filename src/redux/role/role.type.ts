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
    getListAssignedRolePermissions: boolean;
    getListUnassignedRolePermissions: boolean;
    addRolePermissions: boolean;
    removeRolePermission: boolean;
  };
  newItem: Nullable<Role>;
  item: Nullable<Role>;
  list: Role[];
  totalCount: number;
  initializedList: boolean;
  initializedListRolePermission: boolean;
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
 * Get List Assigned Role Permissions
 */
type AssignedRolePermissionsFieldsSort = Extract<"name" | "createdAt", Permission>;
export interface GetListAssignedRolePermissionsPayload extends GetListParams<Permission> {
  roleId: string;
  sortBy?: Optional<Nullable<AssignedRolePermissionsFieldsSort>>;
}
export interface GetListAssignedRolePermissionsResponse extends GetListResponseData<Permission> {}

/**
 * Get List Unassigned Role Permissions
 */
type UnassignedRolePermissionsFieldsSort = Extract<"name" | "createdAt", Permission>;
export interface GetListUnassignedRolePermissionsPayload extends GetListParams<Permission> {
  roleId: string;
  sortBy?: Optional<Nullable<UnassignedRolePermissionsFieldsSort>>;
}
export interface GetListUnassignedRolePermissionsResponse extends GetListResponseData<Permission> {}

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
