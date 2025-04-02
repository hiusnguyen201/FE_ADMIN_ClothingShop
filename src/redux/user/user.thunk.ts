import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  checkEmailExistService,
  createUserService,
  editListUserPermissionsService,
  editUserInfoService,
  getListUserPermissionsService,
  getListUserService,
  getUserService,
  removeUserService,
} from "@/redux/user/user.service";
import {
  CheckEmailExistPayload,
  CheckEmailExistResponse,
  CreateUserPayload,
  CreateUserResponse,
  EditListUserPermissionsPayload,
  EditListUserPermissionsResponse,
  EditUserInfoPayload,
  EditUserInfoResponse,
  GetListUserPayload,
  GetListUserPermissionsPayload,
  GetListUserPermissionsResponse,
  GetListUserResponse,
  GetUserPayload,
  GetUserResponse,
  RemoveUserPayload,
  RemoveUserResponse,
} from "@/redux/user/user.type";
import { ThunkApiConfig } from "@/types/thunk-api";

export const createUser = createAsyncThunk<CreateUserResponse, CreateUserPayload, ThunkApiConfig>(
  "user/create-user",
  async (payload, { rejectWithValue }) => {
    try {
      const response: CreateUserResponse = await createUserService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const getListUser = createAsyncThunk<GetListUserResponse, GetListUserPayload, ThunkApiConfig>(
  "user/get-list-user",
  async (filters, { rejectWithValue }) => {
    try {
      const response: GetListUserResponse = await getListUserService(filters);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const getUser = createAsyncThunk<GetUserResponse, GetUserPayload, ThunkApiConfig>(
  "user/get-user",
  async (payload, { rejectWithValue }) => {
    try {
      const response: GetUserResponse = await getUserService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const editUserInfo = createAsyncThunk<EditUserInfoResponse, EditUserInfoPayload, ThunkApiConfig>(
  "user/edit-user-info",
  async (payload, { rejectWithValue }) => {
    try {
      const response: GetUserResponse = await editUserInfoService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const removeUser = createAsyncThunk<RemoveUserResponse, RemoveUserPayload, ThunkApiConfig>(
  "user/remove-user",
  async (payload, { rejectWithValue }) => {
    try {
      const response: RemoveUserResponse = await removeUserService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const checkEmailExist = createAsyncThunk<CheckEmailExistResponse, CheckEmailExistPayload, ThunkApiConfig>(
  "user/check-user-name-exist",
  async (payload, { rejectWithValue }) => {
    try {
      const response: CheckEmailExistResponse = await checkEmailExistService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const getListUserPermissions = createAsyncThunk<
  GetListUserPermissionsResponse,
  GetListUserPermissionsPayload,
  ThunkApiConfig
>("user/get-list-user-permissions", async (filters, { rejectWithValue }) => {
  try {
    const response: GetListUserPermissionsResponse = await getListUserPermissionsService(filters);
    return response;
  } catch (e: any) {
    const message: string = e?.response?.data?.message || e.message || e.toString();
    return rejectWithValue(message);
  }
});

export const editListUserPermissions = createAsyncThunk<
  EditListUserPermissionsResponse,
  EditListUserPermissionsPayload,
  ThunkApiConfig
>("user/edit-list-user-permissions", async (payload, { rejectWithValue }) => {
  try {
    const response: EditListUserPermissionsResponse = await editListUserPermissionsService(payload);
    return response;
  } catch (e: any) {
    const message: string = e?.response?.data?.message || e.message || e.toString();
    return rejectWithValue(message);
  }
});
