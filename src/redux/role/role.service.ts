import { getAccessToken } from "@/utils/jwt";
import { filteredObj } from "@/utils/object";
import axios, { AxiosResponse } from "axios";
import { CreateRoleResponse, GetListRoleParams, GetListRoleResponse, CreateRolePayload } from "@/redux/role/role.type";

const apiUrl: string = import.meta.env.VITE_API_URL;

export const createRoleService = async (payload: CreateRolePayload): Promise<CreateRoleResponse> => {
  const response: AxiosResponse = await axios.post(`${apiUrl}/roles/create-role`, payload, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
  return response.data;
};

export const getListRoleService = async (filters: GetListRoleParams): Promise<GetListRoleResponse> => {
  const filteredFilters: Record<string, string> = filteredObj(filters);
  const response: AxiosResponse = await axios.get(`${apiUrl}/roles/get-roles?${new URLSearchParams(filteredFilters)}`, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
  return response.data;
};
