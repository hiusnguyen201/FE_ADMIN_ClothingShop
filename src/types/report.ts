export type OrderReport = {
  totalOrderOverall: number;
  todayTotalNewOrders: number;
  yesterdayTotalNewOrders: number;
  percentage: number;
};

export type CustomerReport = {
  totalCustomerOverall: number;
  todayTotalNewCustomers: number;
  yesterdayTotalNewCustomers: number;
  percentage: number;
};

export type RevenueReport = {
  totalRevenueOverall: number;
  todayTotalRevenue: number;
  yesterdayTotalRevenue: number;
  percentage: number;
};

export type SaleReport = {
  timestamp: Date;
  sales: number;
};
