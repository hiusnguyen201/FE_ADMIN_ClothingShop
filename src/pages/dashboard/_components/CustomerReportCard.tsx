import { useAppDispatch, useAppSelector } from "@/redux/store";
import { MetricsCard } from "./MetricsCard";
import { ReportState } from "@/redux/report/report.type";
import { useEffect } from "react";
import { getCustomerReport } from "@/redux/report/report.thunk";
import { Link } from "react-router-dom";

export function CustomerReportCard() {
  const dispatch = useAppDispatch();
  const { loading, customerReport } = useAppSelector<ReportState>((selector) => selector.report);

  useEffect(() => {
    (async () => {
      await dispatch(getCustomerReport()).unwrap();
    })();
  }, []);

  if (!customerReport || loading.getCustomerReport) {
    return <div className="rounded-xl bg-muted/50" />;
  }

  return (
    <Link to="/customers">
      <MetricsCard
        title="Customers"
        value={String(customerReport.totalCustomerOverall)}
        change={{
          value: String(customerReport.todayTotalNewCustomers),
          percentage: customerReport.percentage + "%",
          isPositive: customerReport.percentage >= 0,
        }}
      />
    </Link>
  );
}
