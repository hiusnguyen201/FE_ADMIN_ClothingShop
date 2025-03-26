import { createAsyncThunk } from "@reduxjs/toolkit";
import { createRoleService, getListRoleService } from "@/redux/role/role.service";
import { CreateRolePayload, CreateRoleResponse, GetListRoleParams, GetListRoleResponse } from "@/redux/role/role.type";
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

export const getListRole = createAsyncThunk<GetListRoleResponse, GetListRoleParams, ThunkApiConfig>(
  "role/get-roles",
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
