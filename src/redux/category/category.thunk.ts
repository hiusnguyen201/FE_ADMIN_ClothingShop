import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  checkCategoryNameExistService,
  createCategoryService,
  getListCategoryService,
} from "@/redux/category/category.service";
import {
  GetListCategoryPayload,
  GetListCategoryResponse,
  CreateCategoryResponse,
  CreateCategoryPayload,
  CheckCategoryNameExistResponse,
  CheckCategoryNameExistPayload,
} from "@/redux/category/category.type";
import { ThunkApiConfig } from "@/types/thunk-api";

export const getListCategory = createAsyncThunk<GetListCategoryResponse, GetListCategoryPayload, ThunkApiConfig>(
  "category/get-list-category",
  async (filters, { rejectWithValue }) => {
    try {
      const response: GetListCategoryResponse = await getListCategoryService(filters);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const createCategory = createAsyncThunk<CreateCategoryResponse, CreateCategoryPayload, ThunkApiConfig>(
  "category/create-category",
  async (payload, { rejectWithValue }) => {
    try {
      const response: CreateCategoryResponse = await createCategoryService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const checkCategoryNameExist = createAsyncThunk<
  CheckCategoryNameExistResponse,
  CheckCategoryNameExistPayload,
  ThunkApiConfig
>("category/check-category-name-exist", async (payload, { rejectWithValue }) => {
  try {
    const response: CheckCategoryNameExistResponse = await checkCategoryNameExistService(payload);
    return response;
  } catch (e: any) {
    const message: string = e?.response?.data?.message || e.message || e.toString();
    return rejectWithValue(message);
  }
});
