import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addRolePermissionsService,
  checkRoleNameExistService,
  createRoleService,
  editRoleInfoService,
  getListRolePermissionsService,
  getListRoleService,
  getRoleService,
  removeRolePermissionService,
  removeRoleService,
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
  GetListRolePermissionsPayload,
  GetListRolePermissionsResponse,
  GetListRoleResponse,
  GetRolePayload,
  GetRoleResponse,
  RemoveRolePayload,
  RemoveRoleResponse,
  AddRolePermissionsResponse,
  AddRolePermissionsPayload,
} from "@/redux/role/role.type";
import { ThunkApiConfig } from "@/types/thunk-api";

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

export const getListRolePermissions = createAsyncThunk<
  GetListRolePermissionsResponse,
  GetListRolePermissionsPayload,
  ThunkApiConfig
>("role/get-list-role-permissions", async (filters, { rejectWithValue }) => {
  try {
    const response: GetListRolePermissionsResponse = await getListRolePermissionsService(filters);
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
