import { getAccessToken } from "@/utils/jwt";
import { filteredObj } from "@/utils/object";
import axios, { AxiosResponse } from "axios";
import { GetListPermissionPayload, GetListPermissionResponse } from "@/redux/permission/permission.type";

const apiUrl: string = import.meta.env.VITE_API_URL;

export const getListPermissionService = async (
  filters: GetListPermissionPayload
): Promise<GetListPermissionResponse> => {
  const filteredFilters: Record<string, string> = filteredObj(filters);
  const response: AxiosResponse = await axios.get(
    `${apiUrl}/permissions/get-permissions?${new URLSearchParams(filteredFilters)}`,
    {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    }
  );
  return response.data;
};
