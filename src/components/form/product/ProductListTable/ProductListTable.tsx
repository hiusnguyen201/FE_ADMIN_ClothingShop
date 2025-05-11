import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { DataTable } from "@/components/data-table";
import { getListProduct } from "@/redux/product/product.thunk";
import { DataTableLoading } from "@/components/data-table/DataTableLoading";
import { DataTablePagination } from "@/components/data-table/DataTablePagination";
import { ProductFieldsSort, ProductState } from "@/redux/product/product.type";
import { toast } from "@/hooks/use-toast";
import { useProductTableFilters } from "./useProductTableFilters";
import { SearchFormField } from "@/components/form-fields/SearchFormFIeld";
import { productColumns } from "./product-columns";
import { ProductFilterSidebarForm } from "./ProductFilterSidebarForm";

export function ProductListTable() {
  const dispatch = useAppDispatch();
  const { list, totalCount, loading, initializedList, removedProductIds, newItem } = useAppSelector<ProductState>(
    (state) => state.product
  );
  const { filters, handlePageChange, handleLimitChange, handleKeywordChange, handleFiltersChange, handleSortChange } =
    useProductTableFilters();

  const handleGetProductList = async () => {
    try {
      await dispatch(getListProduct(filters)).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  useEffect(() => {
    handleGetProductList();
  }, [filters, dispatch, removedProductIds, newItem]);

  return (
    <DataTableLoading initialized={initializedList} className="flex flex-col gap-6 w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3">
        <SearchFormField
          name="keyword"
          disabled={loading.getListProduct}
          className="flex-grow"
          value={filters.keyword}
          onValueChange={handleKeywordChange}
          placeholder="Enter a keyword"
        />

        <ProductFilterSidebarForm
          onApplyFilter={handleFiltersChange}
          values={{
            status: filters.status,
            categoryIds: filters.categoryIds,
            maxPrice: filters.maxPrice,
            minPrice: filters.minPrice,
          }}
        />
      </div>

      <DataTable
        data={list}
        onSortingChange={(sorting) => {
          handleSortChange(sorting[0]?.id as ProductFieldsSort, sorting[0]?.desc);
        }}
        loading={loading.getListProduct}
        placeholder="No products found. Note: if a product was just created/deleted, it takes some time for it to be indexed."
        columns={productColumns}
        heightPerRow={77}
      />

      <DataTablePagination
        loading={loading.getListProduct}
        limit={filters.limit}
        totalCount={totalCount}
        page={filters.page}
        onLimitChange={handleLimitChange}
        onPageChange={handlePageChange}
      />
    </DataTableLoading>
  );
}
