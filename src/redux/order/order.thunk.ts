import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  cancelOrderService,
  confirmOrderService,
  createOrderService,
  createShipOrderService,
  // editOrderInfoService,
  getListOrderService,
  getOrderService,
  processingOrderService,
  removeOrderService,
} from "@/redux/order/order.service";
import {
  CancelOrderPayload,
  CancelOrderResponse,
  ConfirmOrderPayload,
  ConfirmOrderResponse,
  CreateOrderPayload,
  CreateOrderResponse,
  CreateShipOrderPayload,
  CreateShipOrderResponse,
  // EditOrderInfoPayload,
  // EditOrderInfoResponse,
  GetListOrderPayload,
  GetListOrderResponse,
  GetOrderPayload,
  GetOrderResponse,
  ProcessingOrderPayload,
  ProcessingOrderResponse,
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

// export const editOrderInfo = createAsyncThunk<EditOrderInfoResponse, EditOrderInfoPayload, ThunkApiConfig>(
//   "order/edit-order-info",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const response: GetOrderResponse = await editOrderInfoService(payload);
//       return response;
//     } catch (e: any) {
//       const message: string = e?.response?.data?.message || e.message || e.toString();
//       return rejectWithValue(message);
//     }
//   }
// );

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

export const confirmOrder = createAsyncThunk<ConfirmOrderResponse, ConfirmOrderPayload, ThunkApiConfig>(
  "order/confirm-order",
  async (payload, { rejectWithValue }) => {
    try {
      const response: ConfirmOrderResponse = await confirmOrderService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const processingOrder = createAsyncThunk<ProcessingOrderResponse, ProcessingOrderPayload, ThunkApiConfig>(
  "order/processing-order",
  async (payload, { rejectWithValue }) => {
    try {
      const response: ProcessingOrderResponse = await processingOrderService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const cancelOrder = createAsyncThunk<CancelOrderResponse, CancelOrderPayload, ThunkApiConfig>(
  "order/cancel-order",
  async (payload, { rejectWithValue }) => {
    try {
      const response: CancelOrderResponse = await cancelOrderService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const createShipOrder = createAsyncThunk<CreateShipOrderResponse, CreateShipOrderPayload, ThunkApiConfig>(
  "order/create-shipping-order",
  async (payload, { rejectWithValue }) => {
    try {
      const response: CreateShipOrderResponse = await createShipOrderService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);
