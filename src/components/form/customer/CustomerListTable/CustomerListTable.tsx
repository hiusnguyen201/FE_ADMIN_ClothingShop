import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { DataTable } from "@/components/data-table";
import { getListCustomer } from "@/redux/customer/customer.thunk";
import { DataTableLoading } from "@/components/data-table/DataTableLoading";
import { DataTablePagination } from "@/components/data-table/DataTablePagination";
import { CustomerState } from "@/redux/customer/customer.type";
import { toast } from "@/hooks/use-toast";
import { useCustomerTableFilters } from "./useCustomerTableFilters";
import { SearchFormField } from "@/components/form-fields/SearchFormFIeld";
import { convertToSearchParams } from "@/utils/object";
import { customerColumns } from "@/pages/customers/customer-columns";

export function CustomerListTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { list, totalCount, loading, initializedList, removedCustomerIds } = useAppSelector<CustomerState>(
    (state) => state.customer
  );
  const { filters, handlePageChange, handleLimitChange, handleKeywordChange, isDefault } = useCustomerTableFilters({
    searchParams,
  });

  useEffect(() => {
    if (!isDefault) {
      setSearchParams(convertToSearchParams(filters));
    }

    (async () => {
      try {
        await dispatch(getListCustomer(filters)).unwrap();
      } catch (error: any) {
        toast({ title: error, variant: "destructive" });
      }
    })();
  }, [filters, dispatch, removedCustomerIds]);

  return (
    <DataTableLoading initialized={initializedList} className="flex flex-col gap-6 w-full">
      <div className="grid sm:grid-cols-3 grid-cols-2 items-center gap-3">
        <SearchFormField
          name="keyword"
          disabled={loading.getListCustomer}
          className="col-span-3 sm:col-span-2"
          value={filters.keyword}
          onValueChange={handleKeywordChange}
          placeholder="Enter a keyword"
        />
      </div>

      <DataTable
        data={list}
        loading={loading.getListCustomer}
        placeholder="No customers found. Note: if a customer was just created/deleted, it takes some time for it to be indexed."
        columns={customerColumns}
        heightPerRow={77}
      />

      <DataTablePagination
        loading={loading.getListCustomer}
        limit={filters.limit}
        totalCount={totalCount}
        page={filters.page}
        onLimitChange={handleLimitChange}
        onPageChange={handlePageChange}
      />
    </DataTableLoading>
  );
}
