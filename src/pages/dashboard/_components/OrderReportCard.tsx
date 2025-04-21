import { useAppDispatch, useAppSelector } from "@/redux/store";
import { MetricsCard } from "./MetricsCard";
import { ReportState } from "@/redux/report/report.type";
import { useEffect } from "react";
import { getOrderReport } from "@/redux/report/report.thunk";
import { Link } from "react-router-dom";

export function OrderReportCard() {
  const dispatch = useAppDispatch();
  const { loading, orderReport } = useAppSelector<ReportState>((selector) => selector.report);

  useEffect(() => {
    (async () => {
      await dispatch(getOrderReport()).unwrap();
    })();
  }, []);

  if (!orderReport || loading.getOrderReport) {
    return <div className="rounded-xl bg-muted/50" />;
  }

  return (
    <Link to="/orders">
      <MetricsCard
        title="Orders"
        value={String(orderReport.totalOrderOverall)}
        change={{
          value: String(orderReport.todayTotalNewOrders),
          percentage: orderReport.percentage + "%",
          isPositive: orderReport.percentage >= 0,
        }}
      />
    </Link>
  );
}
