import { convertToQueryString } from "@/utils/object";
import { apiInstance } from "@/redux/api";
import {
  CreateRoleResponse,
  GetListRolePayload,
  GetListRoleResponse,
  CreateRolePayload,
  CheckRoleNameExistPayload,
  CheckRoleNameExistResponse,
  GetRolePayload,
  GetRoleResponse,
  EditRoleInfoPayload,
  EditRoleInfoResponse,
  RemoveRolePayload,
  RemoveRoleResponse,
  GetListRolePermissionsPayload,
  GetListRolePermissionsResponse,
  RemoveRolePermissionPayload,
  RemoveRolePermissionResponse,
  AddRolePermissionsPayload,
  AddRolePermissionsResponse,
} from "@/redux/role/role.type";

export const checkRoleNameExistService = async (
  payload: CheckRoleNameExistPayload
): Promise<CheckRoleNameExistResponse> => {
  return await apiInstance.post("/roles/is-exist-role-name", payload);
};

export const createRoleService = async (payload: CreateRolePayload): Promise<CreateRoleResponse> => {
  return await apiInstance.post("/roles/create-role", payload);
};

export const getListRoleService = async (payload: GetListRolePayload): Promise<GetListRoleResponse> => {
  return await apiInstance.get(`/roles/get-roles?${convertToQueryString(payload)}`);
};

export const getRoleService = async (payload: GetRolePayload): Promise<GetRoleResponse> => {
  return await apiInstance.get(`/roles/get-role-by-id/${payload.id}`);
};

export const editRoleInfoService = async (payload: EditRoleInfoPayload): Promise<EditRoleInfoResponse> => {
  return await apiInstance.put(`/roles/update-role-by-id/${payload.id}`, payload);
};

export const removeRoleService = async (payload: RemoveRolePayload): Promise<RemoveRoleResponse> => {
  return await apiInstance.delete(`/roles/remove-role-by-id/${payload.id}`);
};

export const getListRolePermissionsService = async (
  payload: GetListRolePermissionsPayload
): Promise<GetListRolePermissionsResponse> => {
  return await apiInstance.get(
    `/roles/${payload.roleId}/permissions?${convertToQueryString({ ...payload, roleId: null })}`
  );
};

export const addRolePermissionsService = async (
  payload: AddRolePermissionsPayload
): Promise<AddRolePermissionsResponse> => {
  return await apiInstance.patch(`/roles/${payload.roleId}/permissions`, { permissionIds: payload.permissionIds });
};

export const removeRolePermissionService = async (
  payload: RemoveRolePermissionPayload
): Promise<RemoveRolePermissionResponse> => {
  return await apiInstance.delete(`/roles/${payload.roleId}/permissions/${payload.permissionId}`);
};
