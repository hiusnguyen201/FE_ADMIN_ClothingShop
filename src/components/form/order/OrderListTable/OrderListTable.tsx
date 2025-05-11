import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { DataTable } from "@/components/data-table";
import { getListOrder } from "@/redux/order/order.thunk";
import { DataTableLoading } from "@/components/data-table/DataTableLoading";
import { DataTablePagination } from "@/components/data-table/DataTablePagination";
import { OrderFieldsSort, OrderState } from "@/redux/order/order.type";
import { toast } from "@/hooks/use-toast";
import { useOrderTableFilters } from "./useOrderTableFilters";
import { SearchFormField } from "@/components/form-fields/SearchFormFIeld";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ORDER_STATUS } from "@/types/order";
import { orderColumns } from "./order-columns";
import { OrderFilterSidebarForm } from "./OrderFilterSidebarForm";

export function OrderListTable() {
  const dispatch = useAppDispatch();
  const { list, totalCount, loading, initializedList, removedOrderIds, newItem } = useAppSelector<OrderState>(
    (state) => state.order
  );
  const {
    filters,
    handlePageChange,
    handleLimitChange,
    handleSortChange,
    handleFiltersChange,
    handleKeywordChange,
    handleStatusChange,
  } = useOrderTableFilters();

  const handleGetOrderList = async () => {
    try {
      await dispatch(getListOrder(filters)).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  useEffect(() => {
    handleGetOrderList();
  }, [filters, removedOrderIds, dispatch, newItem]);

  return (
    <DataTableLoading initialized={initializedList} className="flex flex-col gap-6 w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3">
        <SearchFormField
          name="keyword"
          disabled={loading.getListOrder}
          value={filters.keyword}
          onValueChange={handleKeywordChange}
          placeholder="Enter a keyword"
        />

        <OrderFilterSidebarForm
          onApplyFilter={handleFiltersChange}
          values={{
            minTotal: filters.minTotal,
            maxTotal: filters.maxTotal,
          }}
        />
      </div>

      <Tabs defaultValue="all" value={filters.status ?? "all"} onValueChange={handleStatusChange}>
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4 h-auto">
          <TabsTrigger value={"all"} className="relative capitalize">
            All
          </TabsTrigger>
          {Object.values(ORDER_STATUS).map((status) => (
            <TabsTrigger key={status} value={status} className="relative capitalize">
              {status}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={"all"} className="mt-0">
          <DataTable
            data={list}
            onSortingChange={(sorting) => {
              handleSortChange(sorting[0]?.id as OrderFieldsSort, sorting[0]?.desc);
            }}
            loading={loading.getListOrder}
            placeholder="No orders found. Note: if a order was just created/deleted, it takes some time for it to be indexed."
            columns={orderColumns}
            heightPerRow={77}
          />
        </TabsContent>

        {Object.values(ORDER_STATUS).map((status) => (
          <TabsContent key={status} value={status} className="mt-0">
            <DataTable
              data={list}
              loading={loading.getListOrder}
              placeholder="No orders found. Note: if a order was just created/deleted, it takes some time for it to be indexed."
              columns={orderColumns}
              heightPerRow={77}
            />
          </TabsContent>
        ))}
      </Tabs>

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
