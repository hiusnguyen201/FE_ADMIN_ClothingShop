import { getAccessToken } from "@/utils/jwt";
import { filteredObj } from "@/utils/object";
import axios, { AxiosResponse } from "axios";
import {
  CreateRoleResponse,
  GetListRolePayload,
  GetListRoleResponse,
  CreateRolePayload,
  CheckRoleNameExistPayload,
  CheckRoleNameExistResponse,
  GetRoleParams,
  GetRoleResponse,
  EditRoleInfoPayload,
  EditRoleInfoResponse,
  RemoveRolePayload,
  RemoveRoleResponse,
} from "@/redux/role/role.type";

const apiUrl: string = import.meta.env.VITE_API_URL;

export const checkRoleNameExistService = async (
  payload: CheckRoleNameExistPayload
): Promise<CheckRoleNameExistResponse> => {
  const response: AxiosResponse = await axios.post(`${apiUrl}/roles/is-exist-role-name`, payload);
  return response.data;
};

export const createRoleService = async (payload: CreateRolePayload): Promise<CreateRoleResponse> => {
  const response: AxiosResponse = await axios.post(`${apiUrl}/roles/create-role`, payload, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
  return response.data;
};

export const getListRoleService = async (filters: GetListRolePayload): Promise<GetListRoleResponse> => {
  const filteredFilters: Record<string, string> = filteredObj(filters);
  const response: AxiosResponse = await axios.get(`${apiUrl}/roles/get-roles?${new URLSearchParams(filteredFilters)}`, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
  return response.data;
};

export const getRoleService = async (payload: GetRoleParams): Promise<GetRoleResponse> => {
  const response: AxiosResponse = await axios.get(`${apiUrl}/roles/get-role-by-id/${payload.id}`, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
  return response.data;
};

export const editRoleInfoService = async (payload: EditRoleInfoPayload): Promise<EditRoleInfoResponse> => {
  const response: AxiosResponse = await axios.patch(`${apiUrl}/roles/update-role-by-id/${payload.id}`, payload, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
  return response.data;
};

export const removeRoleService = async (payload: RemoveRolePayload): Promise<RemoveRoleResponse> => {
  const response: AxiosResponse = await axios.delete(`${apiUrl}/roles/remove-role-by-id/${payload.id}`, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
  return response.data;
};
