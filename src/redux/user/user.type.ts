import { Nullable, Optional } from "@/types/common";
import { Permission } from "@/types/permission";
import { BaseResponse, GetListParams, GetListResponseData } from "@/types/response";
import { GENDER, User } from "@/types/user";

/**
 * State
 */
export interface UserState {
  loading: {
    checkEmailExist: boolean;
    createUser: boolean;
    getListUser: boolean;
    getUser: boolean;
    editUser: boolean;
    removeUser: boolean;
    getListUserPermissions: boolean;
    editListUserPermissions: boolean;
  };
  item: Nullable<User>;
  list: User[];
  totalCount: number;
  error: Nullable<string>;
  listUserPermissions: Permission[];
}

/**
 * Create User
 */
export type CreateUserPayload = {
  name: string;
  email: string;
  phone: string;
  gender: GENDER | string;
  roleId?: Nullable<string>;
};
export interface CreateUserResponse extends BaseResponse<User> {}

/**
 * Get List User
 */
type UserFieldsSort = Extract<"name" | "email" | "createdAt", User>;
export interface GetListUserPayload extends GetListParams<User> {
  sortBy: Optional<Nullable<UserFieldsSort>>;
}
export interface GetListUserResponse extends GetListResponseData<User> {}

/**
 * Get User
 */
export interface GetUserPayload {
  id: string;
}
export interface GetUserResponse extends BaseResponse<User> {}

/**
 * Edit User
 */
export type EditUserInfoPayload = {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: GENDER;
  roleId: Nullable<string>;
};
export interface EditUserInfoResponse extends BaseResponse<User> {}

/**
 * Remove User
 */
export type RemoveUserPayload = {
  id: string;
};
export interface RemoveUserResponse extends BaseResponse<{ id: string }> {}

/**
 * Check Email Exist
 */
export type CheckEmailExistPayload = {
  email: string;
};
export interface CheckEmailExistResponse extends BaseResponse<boolean> {}

/**
 * Get List User Permissions
 */
type UserPermissionsFieldsSort = Extract<"name" | "createdAt", Permission>;
export interface GetListUserPermissionsPayload extends GetListParams<Permission> {
  userId: string;
  sortBy?: Optional<Nullable<UserPermissionsFieldsSort>>;
}
export interface GetListUserPermissionsResponse extends GetListResponseData<Permission> {}

/**
 * Edit List User Permissions
 */
export interface EditListUserPermissionsPayload {
  userId: string;
  permissionIds: string[];
}
export interface EditListUserPermissionsResponse extends BaseResponse<Permission[]> {}
