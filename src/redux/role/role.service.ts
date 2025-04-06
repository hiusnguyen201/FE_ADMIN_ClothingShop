import { convertToSearchParams } from "@/utils/object";
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
  RemoveRolePermissionPayload,
  RemoveRolePermissionResponse,
  AddRolePermissionsPayload,
  AddRolePermissionsResponse,
  GetListAssignedRolePermissionsPayload,
  GetListAssignedRolePermissionsResponse,
  GetListUnassignedRolePermissionsPayload,
  GetListUnassignedRolePermissionsResponse,
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
  return await apiInstance.get(`/roles/get-roles?${convertToSearchParams(payload)}`);
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

export const getListAssignedRolePermissionsService = async (
  payload: GetListAssignedRolePermissionsPayload
): Promise<GetListAssignedRolePermissionsResponse> => {
  return await apiInstance.get(
    `/roles/${payload.roleId}/assigned-permissions?${convertToSearchParams({ ...payload, roleId: null })}`
  );
};

export const getListUnassignedRolePermissionsService = async (
  payload: GetListUnassignedRolePermissionsPayload
): Promise<GetListUnassignedRolePermissionsResponse> => {
  return await apiInstance.get(
    `/roles/${payload.roleId}/unassigned-permissions?${convertToSearchParams({ ...payload, roleId: null })}`
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
