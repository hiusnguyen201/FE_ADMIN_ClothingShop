import { Nullable } from "@/types/common";
import { UserNotification } from "@/types/notification";
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
    getListNotificationInUser: boolean;
    getListNewNotificationInUser: boolean;
    markAsReadNotificationInUser: boolean;
    markAllAsReadNotificationInUser: boolean;
  };
  totalCount: {
    totalNotifications: number;
    totalUnreadNotifications: number;
  };
  permissions: string[];
  newUserNotifications: UserNotification[];
  userNotifications: UserNotification[];
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

/**
 * Get list notification in user
 */
export type GetListNotificationInUserPayload = {};
export interface GetListNotificationInUserResponse
  extends BaseResponse<{ notifications: UserNotification[]; totalUnread: number; totalCount: number }> {}

/**
 * Mark as read notification in user
 */
export type MarkAsReadNotificationInUserPayload = {
  id: string;
};
export interface MarkAsReadNotificationInUserResponse extends BaseResponse<UserNotification> {}

/**
 * Mark all as read notification in user
 */
export interface MarkAllAsReadNotificationInUserResponse extends BaseResponse<UserNotification[]> {}
