import { useAppDispatch, useAppSelector } from "@/redux/store";
import { MetricsCard } from "./MetricsCard";
import { ReportState } from "@/redux/report/report.type";
import { useEffect } from "react";
import { getOrderReport } from "@/redux/report/report.thunk";
import { Link } from "react-router-dom";
import { COMPARISON_VALUES } from "@/types/report";
import { ShoppingCart } from "lucide-react";

export function OrderReportCard({ compareTo }: { compareTo: COMPARISON_VALUES }) {
  const dispatch = useAppDispatch();
  const { loading, orderReport } = useAppSelector<ReportState>((selector) => selector.report);

  useEffect(() => {
    (async () => {
      await dispatch(getOrderReport({ compareTo })).unwrap();
    })();
  }, [compareTo]);

  if (!orderReport || loading.getOrderReport) {
    return <div className="rounded-xl bg-muted/50" />;
  }

  return (
    <Link to="/orders">
      <MetricsCard
        title="Orders"
        chart={<ShoppingCart size={14} />}
        value={String(orderReport.totalOrderOverall)}
        change={{
          value: String(orderReport.currentCountNewOrder),
          percentage: orderReport.percentage + "%",
          isPositive: orderReport.percentage >= 0,
          unitCompare: compareTo,
        }}
      />
    </Link>
  );
}
