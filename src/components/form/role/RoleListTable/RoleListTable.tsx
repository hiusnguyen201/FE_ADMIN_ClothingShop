import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { Role } from "@/types/role";
import { DataTable } from "@/components/data-table";
import { getListRole } from "@/redux/role/role.thunk";
import { DataTableLoading } from "@/components/data-table/DataTableLoading";
import { DataTablePagination } from "@/components/data-table/DataTablePagination";
import { RoleState } from "@/redux/role/role.type";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "@/hooks/use-toast";
import { useRoleTableFilters } from "./useRoleTableFilters";
import { SearchFormField } from "@/components/form-fields/SearchFormFIeld";
import { setHistory } from "@/utils/history";
import { useLocation } from "react-router-dom";
import { convertToQueryString } from "@/utils/object";

export function RoleListTable({ columns }: { columns: ColumnDef<Role, any>[] }) {
  const dispatch = useAppDispatch();
  const { list, totalCount, loading } = useAppSelector<RoleState>((state) => state.role);
  const { filters, handlePageChange, handleLimitChange, handleKeywordChange } = useRoleTableFilters();
  const location = useLocation();

  const handleGetRoleList = async () => {
    try {
      await dispatch(getListRole(filters)).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  useEffect(() => {
    setHistory(`${location.pathname}?${convertToQueryString(filters)}`);
    handleGetRoleList();
  }, [filters, dispatch]);

  return (
    <DataTableLoading loading={loading.getListRole} className="flex flex-col gap-6 w-full">
      <div className="grid sm:grid-cols-3 grid-cols-2 items-center gap-3">
        <SearchFormField
          name="keyword"
          disabled={loading.getListRole}
          className="col-span-3 sm:col-span-2"
          value={filters.keyword}
          onSearchClick={(value) => handleKeywordChange(value)}
          placeholder="Enter a keyword"
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
