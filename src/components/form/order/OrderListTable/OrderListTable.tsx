import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { DataTable } from "@/components/data-table";
import { getListOrder } from "@/redux/order/order.thunk";
import { DataTableLoading } from "@/components/data-table/DataTableLoading";
import { DataTablePagination } from "@/components/data-table/DataTablePagination";
import { OrderState } from "@/redux/order/order.type";
import { toast } from "@/hooks/use-toast";
import { useOrderTableFilters } from "./useOrderTableFilters";
import { SearchFormField } from "@/components/form-fields/SearchFormFIeld";
import { useSearchParams } from "react-router-dom";
import { convertToSearchParams } from "@/utils/object";
import { orderColumns } from "./order-columns";

export function OrderListTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { list, totalCount, loading } = useAppSelector<OrderState>((state) => state.order);
  const { filters, handlePageChange, handleLimitChange, handleKeywordChange } = useOrderTableFilters({ searchParams });

  const handleGetOrderList = async () => {
    try {
      await dispatch(getListOrder(filters)).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  useEffect(() => {
    setSearchParams(convertToSearchParams(searchParams));
    handleGetOrderList();
  }, [filters, dispatch]);

  return (
    <DataTableLoading loading={loading.getListOrder} className="flex flex-col gap-6 w-full">
      <div className="grid sm:grid-cols-3 grid-cols-2 items-center gap-3">
        <SearchFormField
          name="keyword"
          disabled={loading.getListOrder}
          className="col-span-3 sm:col-span-2"
          value={filters.keyword}
          onSearchClick={(value) => handleKeywordChange(value)}
          placeholder="Enter a keyword"
        />
      </div>

      <DataTable
        data={list}
        placeholder="No orders found. Note: if a order was just created/deleted, it takes some time for it to be indexed."
        columns={orderColumns}
        heightPerRow={77}
      />

      <DataTablePagination
        loading={loading.getListOrder}
        limit={filters.limit}
        totalCount={totalCount}
        page={filters.page}
        onLimitChange={handleLimitChange}
        onPageChange={handlePageChange}
      />
    </DataTableLoading>
  );
}
