import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useRef } from "react";
import { Role } from "@/types/role";
import { DataTable } from "@/components/data-table";
import { getListRole } from "@/redux/role/role.thunk";
import { DataTableLoading } from "@/components/data-table/DataTableLoading";
import { DataTablePagination } from "@/components/data-table/DataTablePagination";
import { Input } from "@/components/ui/input";
import { RoleState } from "@/redux/role/role.type";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "@/hooks/use-toast";
import { useRoleTableFilters } from "./useRoleTableFilters";

export function RoleListTable({ columns }: { columns: ColumnDef<Role, any>[] }) {
  const dispatch = useAppDispatch();
  const { list, totalCount, loading, isInitialized } = useAppSelector<RoleState>((state) => state.role);
  const { filters, handlePageChange, handleLimitChange, handleKeywordChange } = useRoleTableFilters();
  const prevKeyword = useRef(filters.keyword);

  const handleGetRoleList = async () => {
    try {
      await dispatch(getListRole(filters)).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  const getListRoleDebounced = useDebouncedCallback(handleGetRoleList, 500);

  useEffect(() => {
    if (prevKeyword.current !== filters.keyword) {
      prevKeyword.current = filters.keyword;
      getListRoleDebounced();
    } else {
      handleGetRoleList();
    }
  }, [filters, dispatch]);

  return (
    <DataTableLoading loading={loading.getListRole} initialized={isInitialized} className="flex flex-col gap-6 w-full">
      <div className="grid sm:grid-cols-3 grid-cols-2 items-center gap-3">
        <Input
          className="col-span-3 sm:col-span-2"
          disabled={loading.getListRole}
          name="keyword"
          type="text"
          placeholder="Enter a keyword"
          value={filters.keyword}
          onChange={(e) => handleKeywordChange(e.target.value)}
        />
      </div>

      <DataTable
        data={list}
        placeholder="No roles found. Note: if a role was just created/deleted, it takes some time for it to be indexed."
        columns={columns}
        heightPerRow={77}
      />

      <DataTablePagination
        loading={loading.getListRole}
        limit={filters.limit}
        totalCount={totalCount}
        page={filters.page}
        onLimitChange={handleLimitChange}
        onPageChange={handlePageChange}
      />
    </DataTableLoading>
  );
}
