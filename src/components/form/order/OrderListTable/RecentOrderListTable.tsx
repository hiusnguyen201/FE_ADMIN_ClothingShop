import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { DataTable } from "@/components/data-table";
import { toast } from "@/hooks/use-toast";
import { getRecentOrders } from "@/redux/report/report.thunk";
import { recentOrderColumns } from "./recent-order-columns";
import { ReportState } from "@/redux/report/report.type";

export function RecentOrderListTable() {
  const dispatch = useAppDispatch();
  const { recentOrders, loading } = useAppSelector<ReportState>((state) => state.report);

  const handleGetOrderList = async () => {
    try {
      await dispatch(getRecentOrders({ limit: 5 })).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  useEffect(() => {
    handleGetOrderList();
  }, [dispatch]);

  return (
    <DataTable
      data={recentOrders}
      loading={loading.getRecentOrders}
      placeholder="No orders found. Note: if a order was just created/deleted, it takes some time for it to be indexed."
      columns={recentOrderColumns}
      heightPerRow={77}
    />
  );
}
