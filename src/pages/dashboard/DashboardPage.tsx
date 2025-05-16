import { ProductVariantTable } from "./_components/ProductVariantTable";
import { RevenueReportCard } from "./_components/RevenueReportCard";
import { OrderReportCard } from "./_components/OrderReportCard";
import { CustomerReportCard } from "./_components/CustomerReportCard";
import { SalesOverviewChart } from "./_components/SalesOverviewChart";
import moment from "moment-timezone";
import { SelectFormField } from "@/components/form-fields";
import { useState } from "react";
import { COMPARISON_VALUES } from "@/types/report";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecentOrderListTable } from "@/components/form/order/OrderListTable/RecentOrderListTable";

export function DashboardPage() {
  const [compareTo, setCompareTo] = useState<COMPARISON_VALUES>(COMPARISON_VALUES.YESTERDAY);

  return (
    <div className="flex flex-1 flex-col gap-4 p-5">
      <div className="mb-6 flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Overview</h1>
          <div className="text-sm text-muted-foreground">{moment().tz("Asia/Ho_Chi_Minh").format("MMM D, YYYY")}</div>
        </div>
        <div className="flex items-center gap-1 text-sm min-w-[130px]">
          <SelectFormField
            name="compareTo"
            value={compareTo}
            onValueChange={(value) => setCompareTo(value)}
            options={Object.values(COMPARISON_VALUES).map((item) => ({ title: item, value: item }))}
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <RevenueReportCard compareTo={compareTo} />
        <OrderReportCard compareTo={compareTo} />
        <CustomerReportCard compareTo={compareTo} />
      </div>

      <SalesOverviewChart />

      <Tabs defaultValue="product" className="mt-6">
        <TabsList>
          <TabsTrigger value="product">Top Products</TabsTrigger>
          <TabsTrigger value="order">Recent Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="product">
          <ProductVariantTable />
        </TabsContent>
        <TabsContent value="order">
          <RecentOrderListTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
