import { Nullable } from "@/types/common";
import { BaseResponse } from "@/types/response";
import { COMPARISON_VALUES, CustomerReport, OrderReport, RevenueReport, SALE_VALUES, SaleReport } from "@/types/report";
import { ProductVariant } from "@/types/product";
import { Order } from "@/types/order";

/**
 * State
 */
export interface ReportState {
  loading: {
    getCustomerReport: boolean;
    getOrderReport: boolean;
    getRevenueReport: boolean;
    getTopProductVariants: boolean;
    getSalesReport: boolean;
    getRecentOrders: boolean;
  };
  customerReport: Nullable<CustomerReport>;
  orderReport: Nullable<OrderReport>;
  revenueReport: Nullable<RevenueReport>;
  topProductVariants: ProductVariant[];
  salesReport: SaleReport[];
  recentOrders: Order[];
  error: Nullable<string>;
}

/**
 * Get Customer Report
 */
export interface GetCustomerReportPayload {
  compareTo: COMPARISON_VALUES;
}
export interface GetCustomerReportResponse extends BaseResponse<CustomerReport> {}

/**
 * Get Order Report
 */
export interface GetOrderReportPayload {
  compareTo: COMPARISON_VALUES;
}
export interface GetOrderReportResponse extends BaseResponse<OrderReport> {}

/**
 * Get Revenue Report
 */
export interface GetRevenueReportPayload {
  compareTo: COMPARISON_VALUES;
}
export interface GetRevenueReportResponse extends BaseResponse<RevenueReport> {}

/**
 * Get Top Product Variants
 */
export interface GetTopProductVariantsPayload {
  limit: 5 | 10;
}
export interface GetTopProductVariantsResponse extends BaseResponse<ProductVariant[]> {}

/**
 * Get Sales Report
 */
export interface GetSalesReportPayload {
  type: SALE_VALUES;
}
export interface GetSalesReportResponse extends BaseResponse<SaleReport[]> {}

/**
 * Get Recent Orders
 */
export interface GetRecentOrdersPayload {
  limit: 5 | 10;
}
export interface GetRecentOrdersResponse extends BaseResponse<Order[]> {}
