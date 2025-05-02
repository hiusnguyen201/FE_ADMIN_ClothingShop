import {
  ChangePasswordPayload,
  ChangePasswordResponse,
  EditProfilePayload,
  EditProfileResponse,
  GetListNotificationInUserPayload,
  GetListNotificationInUserResponse,
  GetPermissionsInUserResponse,
  GetProfileResponse,
  MarkAllAsReadNotificationInUserResponse,
  MarkAsReadNotificationInUserPayload,
  MarkAsReadNotificationInUserResponse,
} from "@/redux/account/account.type";
import { apiInstance } from "@/redux/api";
import { convertToSearchParams } from "@/utils/object";

export const getProfileService = async (): Promise<GetProfileResponse> => {
  return await apiInstance.get("/account/view-profile");
};

export const getPermissionsInUserService = async (): Promise<GetPermissionsInUserResponse> => {
  return await apiInstance.get("/account/permissions");
};

export const editProfileService = async (payload: EditProfilePayload): Promise<EditProfileResponse> => {
  return await apiInstance.put("/account/edit-profile", payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const changPasswordService = async (payload: ChangePasswordPayload): Promise<ChangePasswordResponse> => {
  return await apiInstance.post("/account/change-password", payload);
};

export const getListNotificationInUserService = async (
  payload: GetListNotificationInUserPayload
): Promise<GetListNotificationInUserResponse> => {
  return await apiInstance.get(`/account/notifications?${convertToSearchParams(payload)}`);
};

export const markAsReadNotificationInUserService = async (
  payload: MarkAsReadNotificationInUserPayload
): Promise<MarkAsReadNotificationInUserResponse> => {
  return await apiInstance.put(`/account/notifications/${payload.id}/mark-as-read`);
};

export const markAllAsReadNotificationInUserService = async (): Promise<MarkAllAsReadNotificationInUserResponse> => {
  return await apiInstance.post(`/account/notifications/mark-all-as-read`);
};
