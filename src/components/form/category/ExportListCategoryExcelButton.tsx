import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { exportListCategoryExcel } from "@/redux/category/category.thunk";
import { GetListCategoryPayload, CategoryState } from "@/redux/category/category.type";
import { Download } from "lucide-react";

export function ExportListCategoryExcelButton({ filters }: { filters: GetListCategoryPayload }) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector<CategoryState>((selector) => selector.category);

  const handleExport = async () => {
    try {
      await dispatch(exportListCategoryExcel(filters)).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  return (
    <Button
      className="min-w-[100px] sm:max-w-[120px]"
      variant="outline"
      disabled={loading.exportListCategoryExcel}
      onClick={handleExport}
    >
      <Download />
      Export
    </Button>
  );
}
