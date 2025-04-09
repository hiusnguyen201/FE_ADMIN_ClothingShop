import { createAsyncThunk } from "@reduxjs/toolkit";
import { getListOptionService } from "@/redux/option/option.service";
import { GetListOptionResponse } from "@/redux/option/option.type";
import { ThunkApiConfig } from "@/types/thunk-api";

export const getListOption = createAsyncThunk<GetListOptionResponse, void, ThunkApiConfig>(
  "option/get-list-option",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetListOptionResponse = await getListOptionService();
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);
