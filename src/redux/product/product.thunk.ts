import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  checkProductNameExistService,
  createProductService,
  editProductInfoService,
  editProductVariantsService,
  exportListProductExcelService,
  getListProductService,
  getProductService,
  removeProductService,
} from "@/redux/product/product.service";
import {
  CheckProductNameExistPayload,
  CheckProductNameExistResponse,
  CreateProductPayload,
  CreateProductResponse,
  EditProductInfoPayload,
  EditProductInfoResponse,
  EditProductVariantsPayload,
  EditProductVariantsResponse,
  ExportListProductExcelResponse,
  GetListProductPayload,
  GetListProductResponse,
  GetProductPayload,
  GetProductResponse,
  RemoveProductPayload,
  RemoveProductResponse,
} from "@/redux/product/product.type";
import { ThunkApiConfig } from "@/types/thunk-api";
import { downloadFileBlob } from "@/utils/object";

export const checkProductNameExist = createAsyncThunk<
  CheckProductNameExistResponse,
  CheckProductNameExistPayload,
  ThunkApiConfig
>("product/check-product-name-exist", async (payload, { rejectWithValue }) => {
  try {
    const response: CheckProductNameExistResponse = await checkProductNameExistService(payload);
    return response;
  } catch (e: any) {
    const message: string = e?.response?.data?.message || e.message || e.toString();
    return rejectWithValue(message);
  }
});

export const createProduct = createAsyncThunk<CreateProductResponse, CreateProductPayload, ThunkApiConfig>(
  "product/create-product",
  async (payload, { rejectWithValue }) => {
    try {
      const response: CreateProductResponse = await createProductService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const getListProduct = createAsyncThunk<GetListProductResponse, GetListProductPayload, ThunkApiConfig>(
  "product/get-list-product",
  async (filters, { rejectWithValue }) => {
    try {
      const response: GetListProductResponse = await getListProductService(filters);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const exportListProductExcel = createAsyncThunk<void, GetListProductPayload, ThunkApiConfig>(
  "product/export-list-product-excel",
  async (filters, { rejectWithValue }) => {
    try {
      const data: ExportListProductExcelResponse = await exportListProductExcelService(filters);
      downloadFileBlob(data, "products-list.xlsx");
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const getProduct = createAsyncThunk<GetProductResponse, GetProductPayload, ThunkApiConfig>(
  "product/get-product",
  async (payload, { rejectWithValue }) => {
    try {
      const response: GetProductResponse = await getProductService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const editProductInfo = createAsyncThunk<EditProductInfoResponse, EditProductInfoPayload, ThunkApiConfig>(
  "product/edit-product-info",
  async (payload, { rejectWithValue }) => {
    try {
      const response: EditProductInfoResponse = await editProductInfoService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const editProductVariants = createAsyncThunk<
  EditProductVariantsResponse,
  EditProductVariantsPayload,
  ThunkApiConfig
>("product/edit-product-variants", async (payload, { rejectWithValue }) => {
  try {
    const response: EditProductVariantsResponse = await editProductVariantsService(payload);
    return response;
  } catch (e: any) {
    const message: string = e?.response?.data?.message || e.message || e.toString();
    return rejectWithValue(message);
  }
});

export const removeProduct = createAsyncThunk<RemoveProductResponse, RemoveProductPayload, ThunkApiConfig>(
  "product/remove-product",
  async (payload, { rejectWithValue }) => {
    try {
      const response: RemoveProductResponse = await removeProductService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);
