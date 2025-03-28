import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useRef } from "react";
import { DataTable } from "@/components/data-table";
import { getListPermission } from "@/redux/permission/permission.thunk";
import { DataTableLoading } from "@/components/data-table/DataTableLoading";
import { DataTablePagination } from "@/components/data-table/DataTablePagination";
import { setHistory } from "@/utils/history";
import { filteredObj } from "@/utils/object";
import { usePermissionTableFilters } from "./usePermissionTableFilters";
import { Input } from "@/components/ui/input";
import { PermissionState } from "@/redux/permission/permission.type";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "@/hooks/use-toast";
import { Permission } from "@/types/permission";

export function PermissionListDataTable({ columns }: { columns: ColumnDef<Permission, any>[] }) {
  const dispatch = useAppDispatch();
  const { list, totalCount, loading, isInitialized } = useAppSelector<PermissionState>((state) => state.permission);
  const { filters, handlePageChange, handleLimitChange, handleKeywordChange } = usePermissionTableFilters();
  const prevKeyword = useRef(filters.keyword);

  const handleGetPermissionList = async () => {
    const newUrl = `${window.location.href}?${new URLSearchParams(filteredObj(filters))}`;
    setHistory(newUrl);
    try {
      await dispatch(getListPermission(filters)).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  const getListPermissionDebounced = useDebouncedCallback(handleGetPermissionList, 500);

  useEffect(() => {
    if (prevKeyword.current !== filters.keyword) {
      prevKeyword.current = filters.keyword;
      getListPermissionDebounced();
    } else {
      handleGetPermissionList();
    }
  }, [filters, dispatch]);

  return (
    <DataTableLoading
      loading={loading.getListPermission}
      initialized={isInitialized}
      className="flex flex-col gap-6 w-full"
    >
      <div className="grid sm:grid-cols-3 grid-cols-2 items-center gap-3">
        <Input
          className="col-span-3 sm:col-span-2"
          disabled={loading.getListPermission}
          name="keyword"
          type="text"
          placeholder="Enter a keyword"
          value={filters.keyword}
          onChange={(e) => handleKeywordChange(e.target.value)}
        />
      </div>

      <DataTable
        data={list}
        placeholder="No permissions found. Note: if a permission was just created/deleted, it takes some time for it to be indexed."
        columns={columns}
      />

      <DataTablePagination
        loading={loading.getListPermission}
        limit={filters.limit}
        totalCount={totalCount}
        page={filters.page}
        onLimitChange={handleLimitChange}
        onPageChange={handlePageChange}
      />
    </DataTableLoading>
  );
}
