import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  checkCategoryNameExistService,
  createCategoryService,
  editCategoryInfoService,
  exportListCategoryExcelService,
  getCategoryService,
  getListCategoryService,
  getListSubcategoryService,
  removeCategoryService,
} from "@/redux/category/category.service";
import {
  GetListCategoryPayload,
  GetListCategoryResponse,
  CreateCategoryResponse,
  CreateCategoryPayload,
  CheckCategoryNameExistResponse,
  CheckCategoryNameExistPayload,
  GetCategoryResponse,
  GetCategoryPayload,
  EditCategoryInfoResponse,
  EditCategoryInfoPayload,
  RemoveCategoryResponse,
  RemoveCategoryPayload,
  GetListSubcategoryResponse,
  GetListSubcategoryPayload,
  ExportListCategoryExcelResponse,
} from "@/redux/category/category.type";
import { ThunkApiConfig } from "@/types/thunk-api";
import { downloadFileBlob } from "@/utils/object";

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

export const exportListCategoryExcel = createAsyncThunk<void, GetListCategoryPayload, ThunkApiConfig>(
  "category/export-list-category-excel",
  async (filters, { rejectWithValue }) => {
    try {
      const data: ExportListCategoryExcelResponse = await exportListCategoryExcelService(filters);
      downloadFileBlob(data, "categories-list.xlsx");
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const getCategory = createAsyncThunk<GetCategoryResponse, GetCategoryPayload, ThunkApiConfig>(
  "category/get-category",
  async (payload, { rejectWithValue }) => {
    try {
      const response: GetCategoryResponse = await getCategoryService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const editCategoryInfo = createAsyncThunk<EditCategoryInfoResponse, EditCategoryInfoPayload, ThunkApiConfig>(
  "category/edit-category-info",
  async (payload, { rejectWithValue }) => {
    try {
      const response: GetCategoryResponse = await editCategoryInfoService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const removeCategory = createAsyncThunk<RemoveCategoryResponse, RemoveCategoryPayload, ThunkApiConfig>(
  "category/remove-category",
  async (payload, { rejectWithValue }) => {
    try {
      const response: RemoveCategoryResponse = await removeCategoryService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const getListSubcategory = createAsyncThunk<
  GetListSubcategoryResponse,
  GetListSubcategoryPayload,
  ThunkApiConfig
>("category/get-list-subcategory", async (filters, { rejectWithValue }) => {
  try {
    const response: GetListCategoryResponse = await getListSubcategoryService(filters);
    return response;
  } catch (e: any) {
    const message: string = e?.response?.data?.message || e.message || e.toString();
    return rejectWithValue(message);
  }
});
