import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCustomerService,
  editCustomerInfoService,
  getListCustomerService,
  getCustomerService,
  removeCustomerService,
} from "@/redux/customer/customer.service";
import {
  CreateCustomerPayload,
  CreateCustomerResponse,
  EditCustomerInfoPayload,
  EditCustomerInfoResponse,
  GetListCustomerPayload,
  GetListCustomerResponse,
  GetCustomerPayload,
  GetCustomerResponse,
  RemoveCustomerPayload,
  RemoveCustomerResponse,
} from "@/redux/customer/customer.type";
import { ThunkApiConfig } from "@/types/thunk-api";

export const createCustomer = createAsyncThunk<CreateCustomerResponse, CreateCustomerPayload, ThunkApiConfig>(
  "customer/create-customer",
  async (payload, { rejectWithValue }) => {
    try {
      const response: CreateCustomerResponse = await createCustomerService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const getListCustomer = createAsyncThunk<GetListCustomerResponse, GetListCustomerPayload, ThunkApiConfig>(
  "customer/get-list-customer",
  async (filters, { rejectWithValue }) => {
    try {
      const response: GetListCustomerResponse = await getListCustomerService(filters);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const getCustomer = createAsyncThunk<GetCustomerResponse, GetCustomerPayload, ThunkApiConfig>(
  "customer/get-customer",
  async (payload, { rejectWithValue }) => {
    try {
      const response: GetCustomerResponse = await getCustomerService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const editCustomerInfo = createAsyncThunk<EditCustomerInfoResponse, EditCustomerInfoPayload, ThunkApiConfig>(
  "customer/edit-customer-info",
  async (payload, { rejectWithValue }) => {
    try {
      const response: GetCustomerResponse = await editCustomerInfoService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const removeCustomer = createAsyncThunk<RemoveCustomerResponse, RemoveCustomerPayload, ThunkApiConfig>(
  "customer/remove-customer",
  async (payload, { rejectWithValue }) => {
    try {
      const response: RemoveCustomerResponse = await removeCustomerService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);
