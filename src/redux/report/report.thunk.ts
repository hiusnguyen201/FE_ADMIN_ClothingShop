import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCustomerReportService,
  getOrderReportService,
  getRecentOrdersService,
  getRevenueReportService,
  getSalesReportService,
  getTopProductVariantsService,
} from "@/redux/report/report.service";
import {
  GetCustomerReportPayload,
  GetCustomerReportResponse,
  GetOrderReportPayload,
  GetOrderReportResponse,
  GetRecentOrdersPayload,
  GetRecentOrdersResponse,
  GetRevenueReportPayload,
  GetRevenueReportResponse,
  GetSalesReportPayload,
  GetSalesReportResponse,
  GetTopProductVariantsPayload,
  GetTopProductVariantsResponse,
} from "@/redux/report/report.type";
import { ThunkApiConfig } from "@/types/thunk-api";

export const getCustomerReport = createAsyncThunk<GetCustomerReportResponse, GetCustomerReportPayload, ThunkApiConfig>(
  "report/get-customer-report",
  async (payload, { rejectWithValue }) => {
    try {
      const response: GetCustomerReportResponse = await getCustomerReportService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const getOrderReport = createAsyncThunk<GetOrderReportResponse, GetOrderReportPayload, ThunkApiConfig>(
  "report/get-order-report",
  async (payload, { rejectWithValue }) => {
    try {
      const response: GetOrderReportResponse = await getOrderReportService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const getRevenueReport = createAsyncThunk<GetRevenueReportResponse, GetRevenueReportPayload, ThunkApiConfig>(
  "report/get-revenue-report",
  async (payload, { rejectWithValue }) => {
    try {
      const response: GetRevenueReportResponse = await getRevenueReportService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const getTopProductVariants = createAsyncThunk<
  GetTopProductVariantsResponse,
  GetTopProductVariantsPayload,
  ThunkApiConfig
>("report/get-top-product-variants", async (payload, { rejectWithValue }) => {
  try {
    const response: GetTopProductVariantsResponse = await getTopProductVariantsService(payload);
    return response;
  } catch (e: any) {
    const message: string = e?.response?.data?.message || e.message || e.toString();
    return rejectWithValue(message);
  }
});

export const getSalesReport = createAsyncThunk<GetSalesReportResponse, GetSalesReportPayload, ThunkApiConfig>(
  "report/get-sales-report",
  async (payload, { rejectWithValue }) => {
    try {
      const response: GetSalesReportResponse = await getSalesReportService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const getRecentOrders = createAsyncThunk<GetRecentOrdersResponse, GetRecentOrdersPayload, ThunkApiConfig>(
  "report/get-recent-orders",
  async (payload, { rejectWithValue }) => {
    try {
      const response: GetRecentOrdersResponse = await getRecentOrdersService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);
