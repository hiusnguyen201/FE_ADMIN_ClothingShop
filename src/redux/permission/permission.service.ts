import { convertToSearchParams } from "@/utils/object";
import { apiInstance } from "@/redux/api";
import {
  ExportListPermissionExcelResponse,
  GetListPermissionPayload,
  GetListPermissionResponse,
} from "@/redux/permission/permission.type";

export const getListPermissionService = async (
  payload: GetListPermissionPayload
): Promise<GetListPermissionResponse> => {
  return await apiInstance.get(`/permissions/get-permissions?${convertToSearchParams(payload)}`);
};

export const exportListPermissionExcelService = async (
  payload: GetListPermissionPayload
): Promise<ExportListPermissionExcelResponse> => {
  return await apiInstance.get(`/permissions/export-excel?${convertToSearchParams(payload)}`, {
    responseType: "blob",
  });
};
