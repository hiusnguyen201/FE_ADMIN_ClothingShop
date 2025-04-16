import { createAsyncThunk } from "@reduxjs/toolkit";
import { getListDistrictService, getListProvinceService, getListWardService } from "@/redux/division/division.service";
import {
  GetListDistrictPayload,
  GetListDistrictResponse,
  GetListProvinceResponse,
  GetListWardPayload,
  GetListWardResponse,
} from "@/redux/division/division.type";
import { ThunkApiConfig } from "@/types/thunk-api";

export const getListProvince = createAsyncThunk<GetListProvinceResponse, void, ThunkApiConfig>(
  "division/get-list-province",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetListProvinceResponse = await getListProvinceService();
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const getListDistrict = createAsyncThunk<GetListDistrictResponse, GetListDistrictPayload, ThunkApiConfig>(
  "division/get-list-district",
  async (payload, { rejectWithValue }) => {
    try {
      const response: GetListDistrictResponse = await getListDistrictService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const getListWard = createAsyncThunk<GetListWardResponse, GetListWardPayload, ThunkApiConfig>(
  "division/get-list-ward",
  async (payload, { rejectWithValue }) => {
    try {
      const response: GetListWardResponse = await getListWardService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);
