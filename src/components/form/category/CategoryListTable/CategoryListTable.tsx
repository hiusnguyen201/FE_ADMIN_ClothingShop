import { useAppDispatch, useAppSelector } from "@/redux/store";
import { DataTable } from "@/components/data-table";
import { getListCategory } from "@/redux/category/category.thunk";
import { DataTableLoading } from "@/components/data-table/DataTableLoading";
import { DataTablePagination } from "@/components/data-table/DataTablePagination";
import { CategoryFieldsSort, CategoryState } from "@/redux/category/category.type";
import { toast } from "@/hooks/use-toast";
import { useCategoryTableFilters } from "./useCategoryTableFilters";
import { SearchFormField } from "@/components/form-fields/SearchFormFIeld";
import { useEffect } from "react";
import { categoryColumns } from "./category-columns";

export function CategoryListTable() {
  const dispatch = useAppDispatch();
  const { list, totalCount, loading, initializedList, removedCategoryIds, newItem } = useAppSelector<CategoryState>(
    (state) => state.category
  );
  const { filters, handlePageChange, handleLimitChange, handleSortChange, handleKeywordChange } =
    useCategoryTableFilters();

  const handleGetCategoryList = async () => {
    try {
      await dispatch(getListCategory(filters)).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  useEffect(() => {
    handleGetCategoryList();
  }, [filters, dispatch, removedCategoryIds, newItem]);

  return (
    <DataTableLoading initialized={initializedList} className="flex flex-col gap-6 w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3">
        <SearchFormField
          name="keyword"
          disabled={loading.getListCategory}
          value={filters.keyword}
          onValueChange={handleKeywordChange}
          placeholder="Enter a keyword"
        />
      </div>

      <DataTable
        data={list}
        onSortingChange={(sorting) => {
          handleSortChange(sorting[0]?.id as CategoryFieldsSort, sorting[0]?.desc);
        }}
        loading={loading.getListCategory}
        placeholder="No categories found. Note: if a category was just created/deleted, it takes some time for it to be indexed."
        columns={categoryColumns}
      />

      <DataTablePagination
        loading={loading.getListCategory}
        limit={filters.limit}
        totalCount={totalCount}
        page={filters.page}
        onLimitChange={handleLimitChange}
        onPageChange={handlePageChange}
      />
    </DataTableLoading>
  );
}
