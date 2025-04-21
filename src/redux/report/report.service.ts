import { apiInstance } from "@/redux/api";
import {
  GetCustomerReportResponse,
  GetOrderReportResponse,
  GetRevenueReportResponse,
  GetSalesReportResponse,
  GetTopProductVariantsResponse,
} from "@/redux/report/report.type";

export const getCustomerReportService = async (): Promise<GetCustomerReportResponse> => {
  return await apiInstance.get(`/report/customers/today`);
};

export const getOrderReportService = async (): Promise<GetOrderReportResponse> => {
  return await apiInstance.get(`/report/orders/today`);
};

export const getRevenueReportService = async (): Promise<GetRevenueReportResponse> => {
  return await apiInstance.get(`/report/revenue/today`);
};

export const getTopProductVariantsService = async (): Promise<GetTopProductVariantsResponse> => {
  return await apiInstance.get(`/report/products/top-sale`);
};
export const getSalesReportService = async (): Promise<GetSalesReportResponse> => {
  return await apiInstance.get(`/report/sales/today`);
};
