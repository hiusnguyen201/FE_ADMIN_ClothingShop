import { useAppDispatch, useAppSelector } from "@/redux/store";
import { MetricsCard } from "./MetricsCard";
import { ReportState } from "@/redux/report/report.type";
import { useEffect } from "react";
import { getCustomerReport } from "@/redux/report/report.thunk";
import { Link } from "react-router-dom";
import { COMPARISON_VALUES } from "@/types/report";
import { Users } from "lucide-react";

export function CustomerReportCard({ compareTo }: { compareTo: COMPARISON_VALUES }) {
  const dispatch = useAppDispatch();
  const { loading, customerReport } = useAppSelector<ReportState>((selector) => selector.report);

  useEffect(() => {
    (async () => {
      await dispatch(getCustomerReport({ compareTo })).unwrap();
    })();
  }, [compareTo]);

  if (!customerReport || loading.getCustomerReport) {
    return <div className="rounded-xl bg-muted/50" />;
  }

  return (
    <Link to="/customers">
      <MetricsCard
        title="Customers"
        chart={<Users size={14} />}
        value={String(customerReport.totalCustomerOverall)}
        change={{
          value: String(customerReport.currentCountNewCustomer),
          percentage: customerReport.percentage + "%",
          isPositive: customerReport.percentage >= 0,
          unitCompare: compareTo,
        }}
      />
    </Link>
  );
}
