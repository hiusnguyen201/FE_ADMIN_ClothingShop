import { useAppDispatch, useAppSelector } from "@/redux/store";
import { DataTable } from "@/components/data-table";
import { getListSubcategory } from "@/redux/category/category.thunk";
import { DataTableLoading } from "@/components/data-table/DataTableLoading";
import { CategoryState } from "@/redux/category/category.type";
import { toast } from "@/hooks/use-toast";
import { Category } from "@/types/category";
import { useEffect } from "react";
import { subcategoriesColumns } from "@/pages/categories/tabs/subcategories-columns";

export function SubcategoryListTable({ category }: { category: Category }) {
  const dispatch = useAppDispatch();
  const { listSub, loading, initializedSubList, newItem, removedCategoryIds } = useAppSelector<CategoryState>(
    (state) => state.category
  );

  const handleGetListSubcategory = async () => {
    try {
      await dispatch(getListSubcategory({ page: 1, limit: 100, categoryId: category.id })).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  useEffect(() => {
    handleGetListSubcategory();
  }, [dispatch, newItem, removedCategoryIds]);

  return (
    <DataTableLoading initialized={initializedSubList} className="flex flex-col gap-6 w-full">
      <DataTable
        loading={loading.getListSubcategory}
        data={listSub}
        placeholder="No categories found. Note: if a category was just created/deleted, it takes some time for it to be indexed."
        columns={subcategoriesColumns}
      />
    </DataTableLoading>
  );
}
