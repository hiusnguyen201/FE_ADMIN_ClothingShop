import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ReportState } from "@/redux/report/report.type";
import { useEffect, useState } from "react";
import { getSalesReport } from "@/redux/report/report.thunk";
import { Card } from "@/components/ui/card";
import { StatsChart } from "./StatsChart";
import { SALE_VALUES } from "@/types/report";
import { SelectFormField } from "@/components/form-fields";

export function SalesOverviewChart() {
  const dispatch = useAppDispatch();
  const { loading, salesReport } = useAppSelector<ReportState>((selector) => selector.report);
  const [type, setType] = useState<SALE_VALUES>(SALE_VALUES.LAST_24_HOURS);

  useEffect(() => {
    (async () => {
      await dispatch(getSalesReport({ type })).unwrap();
    })();
  }, [type]);

  if (!salesReport || salesReport.length === 0 || loading.getSalesReport) {
    return <div className="rounded-xl bg-muted/50" />;
  }

  return (
    <Card className="mt-6 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Sales Overview</h2>
        <div className="flex gap-2">
          <SelectFormField
            className="min-w-[140px]"
            name="type"
            value={type}
            onValueChange={(value) => setType(value)}
            options={Object.values(SALE_VALUES).map((item) => ({ title: item.replace(/-/g, " "), value: item }))}
          />
        </div>
      </div>
      <StatsChart type={type} sales={salesReport} />
    </Card>
  );
}
