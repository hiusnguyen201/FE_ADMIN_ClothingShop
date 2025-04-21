import { useAppDispatch, useAppSelector } from "@/redux/store";
import { MetricsCard } from "./MetricsCard";
import { ReportState } from "@/redux/report/report.type";
import { formatCurrencyVND } from "@/utils/string";
import { useEffect } from "react";
import { getRevenueReport } from "@/redux/report/report.thunk";
import { Link } from "react-router-dom";

export function RevenueReportCard() {
  const dispatch = useAppDispatch();
  const { loading, revenueReport } = useAppSelector<ReportState>((selector) => selector.report);

  useEffect(() => {
    (async () => {
      await dispatch(getRevenueReport()).unwrap();
    })();
  }, []);

  if (!revenueReport || loading.getRevenueReport) {
    return <div className="rounded-xl bg-muted/50" />;
  }

  return (
    <Link to="/orders">
      <MetricsCard
        title="Total Sales"
        value={formatCurrencyVND(revenueReport.totalRevenueOverall)}
        change={{
          value: formatCurrencyVND(revenueReport.todayTotalRevenue),
          percentage: revenueReport.percentage + "%",
          isPositive: revenueReport.percentage >= 0,
        }}
      />
    </Link>
  );
}
