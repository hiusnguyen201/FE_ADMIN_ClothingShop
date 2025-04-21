import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCustomerReportService,
  getOrderReportService,
  getRevenueReportService,
  getSalesReportService,
  getTopProductVariantsService,
} from "@/redux/report/report.service";
import {
  GetCustomerReportResponse,
  GetOrderReportResponse,
  GetRevenueReportResponse,
  GetSalesReportResponse,
  GetTopProductVariantsResponse,
} from "@/redux/report/report.type";
import { ThunkApiConfig } from "@/types/thunk-api";

export const getCustomerReport = createAsyncThunk<GetCustomerReportResponse, void, ThunkApiConfig>(
  "report/get-customer-report",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetCustomerReportResponse = await getCustomerReportService();
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const getOrderReport = createAsyncThunk<GetOrderReportResponse, void, ThunkApiConfig>(
  "report/get-order-report",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetOrderReportResponse = await getOrderReportService();
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const getRevenueReport = createAsyncThunk<GetRevenueReportResponse, void, ThunkApiConfig>(
  "report/get-revenue-report",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetRevenueReportResponse = await getRevenueReportService();
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const getTopProductVariants = createAsyncThunk<GetTopProductVariantsResponse, void, ThunkApiConfig>(
  "report/get-top-product-variants",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetTopProductVariantsResponse = await getTopProductVariantsService();
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const getSalesReport = createAsyncThunk<GetSalesReportResponse, void, ThunkApiConfig>(
  "report/get-sales-report",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetSalesReportResponse = await getSalesReportService();
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);
