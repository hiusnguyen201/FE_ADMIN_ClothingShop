import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  changPasswordService,
  editProfileService,
  getPermissionsInUserService,
  getProfileService,
} from "@/redux/account/account.service";
import {
  ChangePasswordPayload,
  ChangePasswordResponse,
  EditProfilePayload,
  EditProfileResponse,
  GetPermissionsInUserResponse,
  GetProfileResponse,
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
