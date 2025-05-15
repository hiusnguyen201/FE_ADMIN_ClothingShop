export type OrderReport = {
  totalOrderOverall: number;
  currentCountNewOrder: number;
  previousCountNewOrder: number;
  percentage: number;
};

export type CustomerReport = {
  totalCustomerOverall: number;
  currentCountNewCustomer: number;
  previousCountNewCustomer: number;
  percentage: number;
};

export type RevenueReport = {
  totalRevenueOverall: number;
  currentTotalRevenue: number;
  previousTotalRevenue: number;
  percentage: number;
};

export type SaleReport = {
  startDate: Date;
  endDate: Date;
  sales: number;
};

export enum COMPARISON_VALUES {
  YESTERDAY = "yesterday",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  YEARLY = "yearly",
}

export enum SALE_VALUES {
  LAST_24_HOURS = "last-24-hours",
  LAST_WEEK = "last-week",
  LAST_MONTH = "last-month",
  LAST_6_MONTH = "last-6-month",
  YEAR = "year",
}
