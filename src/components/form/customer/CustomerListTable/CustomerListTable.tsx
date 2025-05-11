import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { DataTable } from "@/components/data-table";
import { getListCustomer } from "@/redux/customer/customer.thunk";
import { DataTableLoading } from "@/components/data-table/DataTableLoading";
import { DataTablePagination } from "@/components/data-table/DataTablePagination";
import { CustomerFieldsSort, CustomerState } from "@/redux/customer/customer.type";
import { toast } from "@/hooks/use-toast";
import { useCustomerTableFilters } from "./useCustomerTableFilters";
import { SearchFormField } from "@/components/form-fields/SearchFormFIeld";
import { CustomerFilterSidebarForm } from "./CustomerFilterSidebarForm";
import { customerColumns } from "./customer-columns";

export function CustomerListTable() {
  const dispatch = useAppDispatch();
  const { list, totalCount, loading, initializedList, removedCustomerIds, newItem } = useAppSelector<CustomerState>(
    (state) => state.customer
  );
  const { filters, handlePageChange, handleLimitChange, handleKeywordChange, handleSortChange, handleFiltersChange } =
    useCustomerTableFilters();

  const handleGetCustomerList = async () => {
    try {
      await dispatch(getListCustomer(filters)).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  useEffect(() => {
    handleGetCustomerList();
  }, [filters, dispatch, removedCustomerIds, newItem]);

  return (
    <DataTableLoading initialized={initializedList} className="flex flex-col gap-6 w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3">
        <SearchFormField
          name="keyword"
          disabled={loading.getListCustomer}
          value={filters.keyword}
          onValueChange={handleKeywordChange}
          placeholder="Enter a keyword"
        />

        <CustomerFilterSidebarForm
          onApplyFilter={handleFiltersChange}
          values={{
            status: filters.status,
            gender: filters.gender,
          }}
        />
      </div>

      <DataTable
        data={list}
        onSortingChange={(sorting) => {
          handleSortChange(sorting[0]?.id as CustomerFieldsSort, sorting[0]?.desc);
        }}
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
