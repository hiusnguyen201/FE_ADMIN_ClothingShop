import { createAsyncThunk } from "@reduxjs/toolkit";
import { exportListPermissionExcelService, getListPermissionService } from "@/redux/permission/permission.service";
import {
  GetListPermissionPayload,
  GetListPermissionResponse,
  ExportListPermissionExcelResponse,
} from "@/redux/permission/permission.type";
import { ThunkApiConfig } from "@/types/thunk-api";
import { downloadFileBlob } from "@/utils/object";

export const getListPermission = createAsyncThunk<GetListPermissionResponse, GetListPermissionPayload, ThunkApiConfig>(
  "permission/get-list-permission",
  async (filters, { rejectWithValue }) => {
    try {
      const response: GetListPermissionResponse = await getListPermissionService(filters);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const exportListPermissionExcel = createAsyncThunk<void, GetListPermissionPayload, ThunkApiConfig>(
  "permission/export-list-permission-excel",
  async (filters, { rejectWithValue }) => {
    try {
      const data: ExportListPermissionExcelResponse = await exportListPermissionExcelService(filters);
      downloadFileBlob(data, "permissions-list.xlsx");
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);
