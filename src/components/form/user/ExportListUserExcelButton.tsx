import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { exportListUserExcel } from "@/redux/user/user.thunk";
import { UserState } from "@/redux/user/user.type";
import { Download } from "lucide-react";
import { GetListUserPayload } from "@/redux/user/user.type";

export function ExportListUserExcelButton({ filters }: { filters: GetListUserPayload }) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector<UserState>((selector) => selector.user);

  const handleExport = async () => {
    try {
      await dispatch(exportListUserExcel(filters)).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  return (
    <Button
      className="min-w-[100px] sm:max-w-[120px]"
      variant="outline"
      disabled={loading.exportListUserExcel}
      onClick={handleExport}
    >
      <Download />
      Export
    </Button>
  );
}
