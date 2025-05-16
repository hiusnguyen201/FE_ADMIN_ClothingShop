import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { exportListOrderExcel } from "@/redux/order/order.thunk";
import { GetListOrderPayload, OrderState } from "@/redux/order/order.type";
import { Download } from "lucide-react";
import { usePermission } from "@/hooks/use-permission";
import { PERMISSIONS } from "@/constants/permissions";

export function ExportListOrderExcelButton({ filters }: { filters: GetListOrderPayload }) {
  const can = usePermission();
  if (!can(PERMISSIONS.EXPORT_ORDERS_EXCEL)) return null;

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector<OrderState>((selector) => selector.order);

  const handleExport = async () => {
    try {
      await dispatch(exportListOrderExcel(filters)).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  return (
    <Button
      className="min-w-[100px] sm:max-w-[120px]"
      variant="outline"
      disabled={loading.exportListOrderExcel}
      onClick={handleExport}
    >
      <Download />
      Export
    </Button>
  );
}
