import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProfileService } from "@/redux/account/account.service";
import { GetProfileResponse } from "@/redux/account/account.type";
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
