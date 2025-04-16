import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { DataTable } from "@/components/data-table";
import { getListProduct } from "@/redux/product/product.thunk";
import { DataTableLoading } from "@/components/data-table/DataTableLoading";
import { DataTablePagination } from "@/components/data-table/DataTablePagination";
import { ProductState } from "@/redux/product/product.type";
import { toast } from "@/hooks/use-toast";
import { useProductTableFilters } from "./useProductTableFilters";
import { SearchFormField } from "@/components/form-fields/SearchFormFIeld";
import { useSearchParams } from "react-router-dom";
import { convertToSearchParams } from "@/utils/object";
import { productColumns } from "./product-columns";

export function ProductListTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { list, totalCount, loading } = useAppSelector<ProductState>((state) => state.product);
  const { filters, handlePageChange, handleLimitChange, handleKeywordChange } = useProductTableFilters({
    searchParams,
  });

  const handleGetProductList = async () => {
    try {
      await dispatch(getListProduct(filters)).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  useEffect(() => {
    setSearchParams(convertToSearchParams(searchParams));
    handleGetProductList();
  }, [filters, dispatch]);

  return (
    <DataTableLoading loading={loading.getListProduct} className="flex flex-col gap-6 w-full">
      <div className="grid sm:grid-cols-3 grid-cols-2 items-center gap-3">
        <SearchFormField
          name="keyword"
          disabled={loading.getListProduct}
          className="col-span-3 sm:col-span-2"
          value={filters.keyword}
          onSearchClick={(value) => handleKeywordChange(value)}
          placeholder="Enter a keyword"
        />
      </div>

      <DataTable
        data={list}
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
