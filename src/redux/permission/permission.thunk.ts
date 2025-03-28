import { createAsyncThunk } from "@reduxjs/toolkit";
import { getListPermissionService } from "@/redux/permission/permission.service";
import { GetListPermissionPayload, GetListPermissionResponse } from "@/redux/permission/permission.type";
import { ThunkApiConfig } from "@/types/thunk-api";

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
