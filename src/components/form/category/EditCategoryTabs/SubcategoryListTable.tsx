import { useAppDispatch, useAppSelector } from "@/redux/store";
import { DataTable } from "@/components/data-table";
import { getListSubcategory } from "@/redux/category/category.thunk";
import { DataTableLoading } from "@/components/data-table/DataTableLoading";
import { CategoryState } from "@/redux/category/category.type";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "@/hooks/use-toast";
import { Category } from "@/types/category";
import { useEffect } from "react";

export function SubcategoryListTable({
  columns,
  category,
}: {
  category: Category;
  columns: ColumnDef<Category, any>[];
}) {
  const dispatch = useAppDispatch();
  const { listSub, loading, initializedSubList } = useAppSelector<CategoryState>((state) => state.category);

  const handleGetListSubcategory = async () => {
    try {
      await dispatch(getListSubcategory({ page: 1, limit: 100, categoryId: category.id })).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  useEffect(() => {
    handleGetListSubcategory();
  }, [dispatch]);

  return (
    <DataTableLoading initialized={initializedSubList} className="flex flex-col gap-6 w-full">
      <DataTable
        loading={loading.getListSubcategory}
        data={listSub}
        placeholder="No categories found. Note: if a category was just created/deleted, it takes some time for it to be indexed."
        columns={columns}
      />
    </DataTableLoading>
  );
}
