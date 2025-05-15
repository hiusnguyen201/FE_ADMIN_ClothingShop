import { useAppDispatch, useAppSelector } from "@/redux/store";
import { MetricsCard } from "./MetricsCard";
import { ReportState } from "@/redux/report/report.type";
import { formatCurrencyVND } from "@/utils/string";
import { useEffect } from "react";
import { getRevenueReport } from "@/redux/report/report.thunk";
import { Link } from "react-router-dom";
import { COMPARISON_VALUES } from "@/types/report";
import { DollarSign } from "lucide-react";

export function RevenueReportCard({ compareTo }: { compareTo: COMPARISON_VALUES }) {
  const dispatch = useAppDispatch();
  const { loading, revenueReport } = useAppSelector<ReportState>((selector) => selector.report);

  useEffect(() => {
    (async () => {
      await dispatch(getRevenueReport({ compareTo })).unwrap();
    })();
  }, []);

  if (!revenueReport || loading.getRevenueReport) {
    return <div className="rounded-xl bg-muted/50" />;
  }

  return (
    <Link to="/orders">
      <MetricsCard
        title="Total Revenue"
        chart={<DollarSign size={14} />}
        value={formatCurrencyVND(revenueReport.totalRevenueOverall)}
        change={{
          value: formatCurrencyVND(revenueReport.currentTotalRevenue),
          percentage: revenueReport.percentage + "%",
          isPositive: revenueReport.percentage >= 0,
          unitCompare: compareTo,
        }}
      />
    </Link>
  );
}
