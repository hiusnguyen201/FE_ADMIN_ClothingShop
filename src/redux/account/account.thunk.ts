import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  changPasswordService,
  editProfileService,
  getListNotificationInUserService,
  getPermissionsInUserService,
  getProfileService,
  markAllAsReadNotificationInUserService,
  markAsReadNotificationInUserService,
} from "@/redux/account/account.service";
import {
  ChangePasswordPayload,
  ChangePasswordResponse,
  EditProfilePayload,
  EditProfileResponse,
  GetListNotificationInUserPayload,
  GetListNotificationInUserResponse,
  MarkAsReadNotificationInUserPayload,
  MarkAsReadNotificationInUserResponse,
  GetPermissionsInUserResponse,
  GetProfileResponse,
  MarkAllAsReadNotificationInUserResponse,
} from "@/redux/account/account.type";
import { ThunkApiConfig } from "@/types/thunk-api";

export const getProfile = createAsyncThunk<GetProfileResponse, void, ThunkApiConfig>(
  "account/get-profile",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetProfileResponse = await getProfileService();
      return response;
    } catch (error: any) {
      const message: string = error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);

export const getPermissionsInUser = createAsyncThunk<GetPermissionsInUserResponse, void, ThunkApiConfig>(
  "account/get-permissions-in-user",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetPermissionsInUserResponse = await getPermissionsInUserService();
      return response;
    } catch (error: any) {
      const message: string = error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);

export const editProfile = createAsyncThunk<EditProfileResponse, EditProfilePayload, ThunkApiConfig>(
  "account/edit-profile",
  async (payload, { rejectWithValue }) => {
    try {
      const response: EditProfileResponse = await editProfileService(payload);
      return response;
    } catch (error: any) {
      const message: string = error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);

export const changePassword = createAsyncThunk<ChangePasswordResponse, ChangePasswordPayload, ThunkApiConfig>(
  "account/change-password",
  async (payload, { rejectWithValue }) => {
    try {
      const response: ChangePasswordResponse = await changPasswordService(payload);
      return response;
    } catch (error: any) {
      const message: string = error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);

export const getListNotificationInUser = createAsyncThunk<
  GetListNotificationInUserResponse,
  GetListNotificationInUserPayload,
  ThunkApiConfig
>("account/get-list-notification-in-user", async (payload, { rejectWithValue }) => {
  try {
    const response: GetListNotificationInUserResponse = await getListNotificationInUserService(payload);
    return response;
  } catch (error: any) {
    const message: string = error.response?.data?.message || error.message || error.toString();
    return rejectWithValue(message);
  }
});

export const getListNewNotificationInUser = createAsyncThunk<
  GetListNotificationInUserResponse,
  GetListNotificationInUserPayload,
  ThunkApiConfig
>("account/get-list-new-notification-in-user", async (payload, { rejectWithValue }) => {
  try {
    const response: GetListNotificationInUserResponse = await getListNotificationInUserService(payload);
    return response;
  } catch (error: any) {
    const message: string = error.response?.data?.message || error.message || error.toString();
    return rejectWithValue(message);
  }
});

export const markAsReadNotificationInUser = createAsyncThunk<
  MarkAsReadNotificationInUserResponse,
  MarkAsReadNotificationInUserPayload,
  ThunkApiConfig
>("account/mark-as-read-notification-in-user", async (payload, { rejectWithValue }) => {
  try {
    const response: MarkAsReadNotificationInUserResponse = await markAsReadNotificationInUserService(payload);
    return response;
  } catch (error: any) {
    const message: string = error.response?.data?.message || error.message || error.toString();
    return rejectWithValue(message);
  }
});

export const markAllAsReadNotificationInUser = createAsyncThunk<
  MarkAllAsReadNotificationInUserResponse,
  void,
  ThunkApiConfig
>("account/mark-all-as-read-notifications-in-user", async (_, { rejectWithValue }) => {
  try {
    const response: MarkAllAsReadNotificationInUserResponse = await markAllAsReadNotificationInUserService();
    return response;
  } catch (error: any) {
    const message: string = error.response?.data?.message || error.message || error.toString();
    return rejectWithValue(message);
  }
});
