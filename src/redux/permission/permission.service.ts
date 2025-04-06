import { convertToSearchParams } from "@/utils/object";
import { apiInstance } from "@/redux/api";
import { GetListPermissionPayload, GetListPermissionResponse } from "@/redux/permission/permission.type";

export const getListPermissionService = async (
  payload: GetListPermissionPayload
): Promise<GetListPermissionResponse> => {
  return await apiInstance.get(`/permissions/get-permissions?${convertToSearchParams(payload)}`);
};
