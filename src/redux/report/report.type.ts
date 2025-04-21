import { Nullable } from "@/types/common";
import { BaseResponse } from "@/types/response";
import { CustomerReport, OrderReport, RevenueReport, SaleReport } from "@/types/report";
import { ProductVariant } from "@/types/product";

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
  };
  customerReport: Nullable<CustomerReport>;
  orderReport: Nullable<OrderReport>;
  revenueReport: Nullable<RevenueReport>;
  topProductVariants: ProductVariant[];
  salesReport: SaleReport[];
  error: Nullable<string>;
}

/**
 * Get Customer Report
 */
export interface GetCustomerReportResponse extends BaseResponse<CustomerReport> {}

/**
 * Get Order Report
 */
export interface GetOrderReportResponse extends BaseResponse<OrderReport> {}

/**
 * Get Revenue Report
 */
export interface GetRevenueReportResponse extends BaseResponse<RevenueReport> {}

/**
 * Get Top Product Variants
 */
export interface GetTopProductVariantsResponse extends BaseResponse<ProductVariant[]> {}

/**
 * Get Sales Report
 */
export interface GetSalesReportResponse extends BaseResponse<SaleReport[]> {}
