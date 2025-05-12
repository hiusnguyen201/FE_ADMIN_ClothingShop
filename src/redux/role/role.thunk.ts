import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addRolePermissionsService,
  checkRoleNameExistService,
  createRoleService,
  editRoleInfoService,
  getListAssignedRolePermissionsService,
  getListUnassignedRolePermissionsService,
  getListRoleService,
  getRoleService,
  removeRolePermissionService,
  removeRoleService,
  exportListRoleExcelService,
} from "@/redux/role/role.service";
import {
  CheckRoleNameExistPayload,
  CheckRoleNameExistResponse,
  CreateRolePayload,
  CreateRoleResponse,
  RemoveRolePermissionPayload,
  RemoveRolePermissionResponse,
  EditRoleInfoPayload,
  EditRoleInfoResponse,
  GetListRolePayload,
  GetListAssignedRolePermissionsPayload,
  GetListAssignedRolePermissionsResponse,
  GetListRoleResponse,
  GetRolePayload,
  GetRoleResponse,
  RemoveRolePayload,
  RemoveRoleResponse,
  AddRolePermissionsResponse,
  AddRolePermissionsPayload,
  GetListUnassignedRolePermissionsResponse,
  GetListUnassignedRolePermissionsPayload,
  ExportListRoleExcelResponse,
} from "@/redux/role/role.type";
import { ThunkApiConfig } from "@/types/thunk-api";
import { downloadFileBlob } from "@/utils/object";

export const checkRoleNameExist = createAsyncThunk<
  CheckRoleNameExistResponse,
  CheckRoleNameExistPayload,
  ThunkApiConfig
>("role/check-role-name-exist", async (payload, { rejectWithValue }) => {
  try {
    const response: CheckRoleNameExistResponse = await checkRoleNameExistService(payload);
    return response;
  } catch (e: any) {
    const message: string = e?.response?.data?.message || e.message || e.toString();
    return rejectWithValue(message);
  }
});

export const createRole = createAsyncThunk<CreateRoleResponse, CreateRolePayload, ThunkApiConfig>(
  "role/create-role",
  async (payload, { rejectWithValue }) => {
    try {
      const response: CreateRoleResponse = await createRoleService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const getListRole = createAsyncThunk<GetListRoleResponse, GetListRolePayload, ThunkApiConfig>(
  "role/get-list-role",
  async (filters, { rejectWithValue }) => {
    try {
      const response: GetListRoleResponse = await getListRoleService(filters);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const exportListRoleExcel = createAsyncThunk<void, GetListRolePayload, ThunkApiConfig>(
  "role/export-list-role-excel",
  async (filters, { rejectWithValue }) => {
    try {
      const data: ExportListRoleExcelResponse = await exportListRoleExcelService(filters);
      downloadFileBlob(data, "roles-list.xlsx");
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const getRole = createAsyncThunk<GetRoleResponse, GetRolePayload, ThunkApiConfig>(
  "role/get-role",
  async (payload, { rejectWithValue }) => {
    try {
      const response: GetRoleResponse = await getRoleService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const editRoleInfo = createAsyncThunk<EditRoleInfoResponse, EditRoleInfoPayload, ThunkApiConfig>(
  "role/edit-role-info",
  async (payload, { rejectWithValue }) => {
    try {
      const response: GetRoleResponse = await editRoleInfoService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const removeRole = createAsyncThunk<RemoveRoleResponse, RemoveRolePayload, ThunkApiConfig>(
  "role/remove-role",
  async (payload, { rejectWithValue }) => {
    try {
      const response: RemoveRoleResponse = await removeRoleService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const getListAssignedRolePermissions = createAsyncThunk<
  GetListAssignedRolePermissionsResponse,
  GetListAssignedRolePermissionsPayload,
  ThunkApiConfig
>("role/get-list-assigned-role-permissions", async (filters, { rejectWithValue }) => {
  try {
    const response: GetListAssignedRolePermissionsResponse = await getListAssignedRolePermissionsService(filters);
    return response;
  } catch (e: any) {
    const message: string = e?.response?.data?.message || e.message || e.toString();
    return rejectWithValue(message);
  }
});

export const getListUnassignedRolePermissions = createAsyncThunk<
  GetListUnassignedRolePermissionsResponse,
  GetListUnassignedRolePermissionsPayload,
  ThunkApiConfig
>("role/get-list-unassigned-role-permissions", async (filters, { rejectWithValue }) => {
  try {
    const response: GetListUnassignedRolePermissionsResponse = await getListUnassignedRolePermissionsService(filters);
    return response;
  } catch (e: any) {
    const message: string = e?.response?.data?.message || e.message || e.toString();
    return rejectWithValue(message);
  }
});

export const addRolePermissions = createAsyncThunk<
  AddRolePermissionsResponse,
  AddRolePermissionsPayload,
  ThunkApiConfig
>("role/add-role-permissions", async (payload, { rejectWithValue }) => {
  try {
    const response: AddRolePermissionsResponse = await addRolePermissionsService(payload);
    return response;
  } catch (e: any) {
    const message: string = e?.response?.data?.message || e.message || e.toString();
    return rejectWithValue(message);
  }
});

export const removeRolePermission = createAsyncThunk<
  RemoveRolePermissionResponse,
  RemoveRolePermissionPayload,
  ThunkApiConfig
>("role/remove-role-permission", async (payload, { rejectWithValue }) => {
  try {
    const response: RemoveRolePermissionResponse = await removeRolePermissionService(payload);
    return response;
  } catch (e: any) {
    const message: string = e?.response?.data?.message || e.message || e.toString();
    return rejectWithValue(message);
  }
});
