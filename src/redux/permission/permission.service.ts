import { filterObj } from "@/utils/object";
import { apiInstance } from "@/redux/api";
import { GetListPermissionPayload, GetListPermissionResponse } from "@/redux/permission/permission.type";

export const getListPermissionService = async (
  filters: GetListPermissionPayload
): Promise<GetListPermissionResponse> => {
  const filteredFilters: Record<string, string> = filterObj(filters);
  return await apiInstance.get(`/permissions/get-permissions?${new URLSearchParams(filteredFilters)}`);
};
