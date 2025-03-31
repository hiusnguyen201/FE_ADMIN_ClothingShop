import { filterObj } from "@/utils/object";
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
  EditListRolePermissionsPayload,
  EditListRolePermissionsResponse,
} from "@/redux/role/role.type";

export const checkRoleNameExistService = async (
  payload: CheckRoleNameExistPayload
): Promise<CheckRoleNameExistResponse> => {
  return await apiInstance.post("/roles/is-exist-role-name", payload);
};

export const createRoleService = async (payload: CreateRolePayload): Promise<CreateRoleResponse> => {
  return await apiInstance.post("/roles/create-role", payload);
};

export const getListRoleService = async (filters: GetListRolePayload): Promise<GetListRoleResponse> => {
  const filteredFilters: Record<string, string> = filterObj(filters);
  return await apiInstance.get(`/roles/get-roles?${new URLSearchParams(filteredFilters)}`);
};

export const getRoleService = async (payload: GetRolePayload): Promise<GetRoleResponse> => {
  return await apiInstance.get(`/roles/get-role-by-id/${payload.id}`);
};

export const editRoleInfoService = async (payload: EditRoleInfoPayload): Promise<EditRoleInfoResponse> => {
  return await apiInstance.patch(`/roles/update-role-by-id/${payload.id}`, payload);
};

export const removeRoleService = async (payload: RemoveRolePayload): Promise<RemoveRoleResponse> => {
  return await apiInstance.delete(`/roles/remove-role-by-id/${payload.id}`);
};

export const getListRolePermissionsService = async (
  payload: GetListRolePermissionsPayload
): Promise<GetListRolePermissionsResponse> => {
  const filteredFilters: Record<string, string> = filterObj(payload);
  return await apiInstance.get(`/roles/get-role-permissions-by-id?${new URLSearchParams(filteredFilters)}`);
};

export const editListRolePermissionsService = async (
  payload: EditListRolePermissionsPayload
): Promise<EditListRolePermissionsResponse> => {
  return await apiInstance.put("/roles/update-role-permissions-by-id", payload);
};
