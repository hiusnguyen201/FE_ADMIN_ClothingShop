import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { DataTable } from "@/components/data-table";
import { getListPermission } from "@/redux/permission/permission.thunk";
import { DataTableLoading } from "@/components/data-table/DataTableLoading";
import { DataTablePagination } from "@/components/data-table/DataTablePagination";
import { PermissionState } from "@/redux/permission/permission.type";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "@/hooks/use-toast";
import { Permission } from "@/types/permission";
import { usePermissionTableFilters } from "./usePermissionTableFilters";
import { SearchFormField } from "@/components/form-fields/SearchFormFIeld";
import { filterObj } from "@/utils/object";
import { setHistory } from "@/utils/history";

export function PermissionListTable({ columns }: { columns: ColumnDef<Permission, any>[] }) {
  const dispatch = useAppDispatch();
  const { list, totalCount, loading } = useAppSelector<PermissionState>((state) => state.permission);
  const { filters, handlePageChange, handleLimitChange, handleKeywordChange } = usePermissionTableFilters();

  const handleGetPermissionList = async () => {
    try {
      await dispatch(getListPermission(filters)).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  useEffect(() => {
    setHistory(`${location.pathname}?${new URLSearchParams(filterObj(filters))}`);
    handleGetPermissionList();
  }, [filters, dispatch]);

  return (
    <DataTableLoading loading={loading.getListPermission} className="flex flex-col gap-6 w-full">
      <div className="grid sm:grid-cols-3 grid-cols-2 items-center gap-3">
        <SearchFormField
          name="keyword"
          disabled={loading.getListPermission}
          className="col-span-3 sm:col-span-2"
          value={filters.keyword}
          onSearchClick={(value) => handleKeywordChange(value)}
          placeholder="Enter a keyword"
        />
      </div>

      <DataTable
        data={list}
        placeholder="No permissions found. Note: if a permission was just created/deleted, it takes some time for it to be indexed."
        columns={columns}
      />

      {Math.ceil(totalCount / filters.limit) > 1 && (
        <DataTablePagination
          loading={loading.getListPermission}
          limit={filters.limit}
          totalCount={totalCount}
          page={filters.page}
          onLimitChange={handleLimitChange}
          onPageChange={handlePageChange}
        />
      )}
    </DataTableLoading>
  );
}
