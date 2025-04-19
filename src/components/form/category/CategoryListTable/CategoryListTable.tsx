import { useAppDispatch, useAppSelector } from "@/redux/store";
import { DataTable } from "@/components/data-table";
import { getListCategory } from "@/redux/category/category.thunk";
import { DataTableLoading } from "@/components/data-table/DataTableLoading";
import { DataTablePagination } from "@/components/data-table/DataTablePagination";
import { CategoryState } from "@/redux/category/category.type";
import { toast } from "@/hooks/use-toast";
import { useCategoryTableFilters } from "./useCategoryTableFilters";
import { SearchFormField } from "@/components/form-fields/SearchFormFIeld";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { convertToSearchParams } from "@/utils/object";
import { categoryColumns } from "./category-columns";

export function CategoryListTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { list, totalCount, loading, initializedList } = useAppSelector<CategoryState>((state) => state.category);
  const { filters, handlePageChange, handleLimitChange, handleKeywordChange } = useCategoryTableFilters({
    searchParams,
  });

  const handleGetCategoryList = async () => {
    try {
      await dispatch(getListCategory(filters)).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  useEffect(() => {
    setSearchParams(convertToSearchParams(filters));
    handleGetCategoryList();
  }, [filters]);

  return (
    <DataTableLoading initialized={initializedList} className="flex flex-col gap-6 w-full">
      <div className="grid sm:grid-cols-3 grid-cols-2 items-center gap-3">
        <SearchFormField
          name="keyword"
          disabled={loading.getListCategory}
          className="col-span-3 sm:col-span-2"
          value={filters.keyword}
          onValueChange={handleKeywordChange}
          placeholder="Enter a keyword"
        />
      </div>

      <DataTable
        data={list}
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
