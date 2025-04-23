import { Nullable } from "@/types/common";
import { Permission } from "@/types/permission";
import { BaseResponse } from "@/types/response";
import { GENDER, User } from "@/types/user";

/**
 * State
 */
export interface AccountState {
  loading: {
    getProfile: boolean;
    editProfile: boolean;
    changePassword: boolean;
    getPermissionsInUser: boolean;
  };
  permissions: Permission[];
  user: Nullable<User>;
  error: Nullable<string>;
}

/**
 * Get Profile
 */
export interface GetProfileResponse extends BaseResponse<User> {}

/**
 * Get Permissions in user
 */
export interface GetPermissionsInUserResponse extends BaseResponse<string[]> {}

/**
 * Edit Profile
 */
export type EditProfilePayload = {
  id: string;
  avatar: Nullable<string | File>;
  name: string;
  phone: string;
  gender: GENDER;
};
export interface EditProfileResponse extends BaseResponse<User> {}

/**
 * Change password
 */
export type ChangePasswordPayload = {
  id: string;
  password: string;
  newPassword: string;
  confirmNewPassword: string;
};
export interface ChangePasswordResponse extends BaseResponse<void> {}
