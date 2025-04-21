import { ProductVariantTable } from "./_components/ProductVariantTable";
import { RevenueReportCard } from "./_components/RevenueReportCard";
import { OrderReportCard } from "./_components/OrderReportCard";
import { CustomerReportCard } from "./_components/CustomerReportCard";
import { SalesOverviewChart } from "./_components/SalesOverviewChart";
import moment from "moment-timezone";

export function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="mb-6 flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Overview</h1>
          <div className="text-sm text-muted-foreground">{moment().tz("Asia/Ho_Chi_Minh").format("MMM D, YYYY")}</div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <RevenueReportCard />
        <OrderReportCard />
        <CustomerReportCard />
      </div>

      <SalesOverviewChart />

      <div className="mt-6">
        <ProductVariantTable />
      </div>
    </div>
  );
}
