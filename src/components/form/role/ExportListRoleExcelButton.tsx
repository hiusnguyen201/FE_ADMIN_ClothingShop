import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { exportListRoleExcel } from "@/redux/role/role.thunk";
import { GetListRolePayload, RoleState } from "@/redux/role/role.type";
import { Download } from "lucide-react";

export function ExportListRoleExcelButton({ filters }: { filters: GetListRolePayload }) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector<RoleState>((selector) => selector.role);

  const handleExport = async () => {
    try {
      await dispatch(exportListRoleExcel(filters)).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  return (
    <Button
      className="min-w-[100px] sm:max-w-[120px]"
      variant="outline"
      disabled={loading.exportListRoleExcel}
      onClick={handleExport}
    >
      <Download />
      Export
    </Button>
  );
}
