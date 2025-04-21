import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ReportState } from "@/redux/report/report.type";
import { useEffect } from "react";
import { getSalesReport } from "@/redux/report/report.thunk";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatsChart } from "./StatsChart";

export function SalesOverviewChart() {
  const dispatch = useAppDispatch();
  const { loading, salesReport } = useAppSelector<ReportState>((selector) => selector.report);

  useEffect(() => {
    (async () => {
      await dispatch(getSalesReport()).unwrap();
    })();
  }, []);

  if (!salesReport || salesReport.length === 0 || loading.getSalesReport) {
    return <div className="rounded-xl bg-muted/50" />;
  }

  return (
    <Card className="mt-6 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Sales Overview</h2>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost">
            Today
          </Button>
          {/* <Button size="sm" variant="ghost">
              Last week
            </Button>
            <Button size="sm" variant="ghost">
              Last month
            </Button>
            <Button size="sm" variant="ghost">
              Last 6 month
            </Button>
            <Button size="sm" variant="ghost">
              Year
            </Button> */}
        </div>
      </div>
      <StatsChart sales={salesReport} />
    </Card>
  );
}
