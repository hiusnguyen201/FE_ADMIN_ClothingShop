import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createOrderService,
  editOrderInfoService,
  getListOrderService,
  getOrderService,
  removeOrderService,
} from "@/redux/order/order.service";
import {
  CreateOrderPayload,
  CreateOrderResponse,
  EditOrderInfoPayload,
  EditOrderInfoResponse,
  GetListOrderPayload,
  GetListOrderResponse,
  GetOrderPayload,
  GetOrderResponse,
  RemoveOrderPayload,
  RemoveOrderResponse,
} from "@/redux/order/order.type";
import { ThunkApiConfig } from "@/types/thunk-api";

export const createOrder = createAsyncThunk<CreateOrderResponse, CreateOrderPayload, ThunkApiConfig>(
  "order/create-order",
  async (payload, { rejectWithValue }) => {
    try {
      const response: CreateOrderResponse = await createOrderService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const getListOrder = createAsyncThunk<GetListOrderResponse, GetListOrderPayload, ThunkApiConfig>(
  "order/get-list-order",
  async (filters, { rejectWithValue }) => {
    try {
      const response: GetListOrderResponse = await getListOrderService(filters);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const getOrder = createAsyncThunk<GetOrderResponse, GetOrderPayload, ThunkApiConfig>(
  "order/get-order",
  async (payload, { rejectWithValue }) => {
    try {
      const response: GetOrderResponse = await getOrderService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const editOrderInfo = createAsyncThunk<EditOrderInfoResponse, EditOrderInfoPayload, ThunkApiConfig>(
  "order/edit-order-info",
  async (payload, { rejectWithValue }) => {
    try {
      const response: GetOrderResponse = await editOrderInfoService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const removeOrder = createAsyncThunk<RemoveOrderResponse, RemoveOrderPayload, ThunkApiConfig>(
  "order/remove-order",
  async (payload, { rejectWithValue }) => {
    try {
      const response: RemoveOrderResponse = await removeOrderService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);
