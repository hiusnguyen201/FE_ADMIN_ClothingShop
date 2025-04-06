import { convertToSearchParams } from "@/utils/object";
import { apiInstance } from "@/redux/api";
import {
  CreateUserResponse,
  GetListUserPayload,
  GetListUserResponse,
  CreateUserPayload,
  CheckEmailExistPayload,
  CheckEmailExistResponse,
  GetUserPayload,
  GetUserResponse,
  EditUserInfoPayload,
  EditUserInfoResponse,
  RemoveUserPayload,
  RemoveUserResponse,
  GetListUserPermissionsPayload,
  GetListUserPermissionsResponse,
  EditListUserPermissionsPayload,
  EditListUserPermissionsResponse,
} from "@/redux/user/user.type";

export const checkEmailExistService = async (payload: CheckEmailExistPayload): Promise<CheckEmailExistResponse> => {
  return await apiInstance.post("/users/is-exist-email", payload);
};

export const createUserService = async (payload: CreateUserPayload): Promise<CreateUserResponse> => {
  return await apiInstance.post("/users/create-user", payload);
};

export const getListUserService = async (payload: GetListUserPayload): Promise<GetListUserResponse> => {
  return await apiInstance.get(`/users/get-users?${convertToSearchParams(payload)}`);
};

export const getUserService = async (payload: GetUserPayload): Promise<GetUserResponse> => {
  return await apiInstance.get(`/users/get-user-by-id/${payload.id}`);
};

export const editUserInfoService = async (payload: EditUserInfoPayload): Promise<EditUserInfoResponse> => {
  return await apiInstance.put(`/users/update-user-by-id/${payload.id}`, payload);
};

export const removeUserService = async (payload: RemoveUserPayload): Promise<RemoveUserResponse> => {
  return await apiInstance.delete(`/users/remove-user-by-id/${payload.id}`);
};

export const getListUserPermissionsService = async (
  payload: GetListUserPermissionsPayload
): Promise<GetListUserPermissionsResponse> => {
  return await apiInstance.get(`/users/get-user-permissions-by-id?${convertToSearchParams(payload)}`);
};

export const editListUserPermissionsService = async (
  payload: EditListUserPermissionsPayload
): Promise<EditListUserPermissionsResponse> => {
  return await apiInstance.put("/users/update-user-permissions-by-id", payload);
};
