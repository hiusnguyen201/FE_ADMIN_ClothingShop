import {
  ChangePasswordPayload,
  ChangePasswordResponse,
  EditProfilePayload,
  EditProfileResponse,
  GetPermissionsInUserResponse,
  GetProfileResponse,
} from "@/redux/account/account.type";
import { apiInstance } from "@/redux/api";

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
