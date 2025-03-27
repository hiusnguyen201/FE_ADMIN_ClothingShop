import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useRef } from "react";
import { ROLE_STATUS } from "@/types/role";
import { DataTable } from "@/components/data-table";
import { getListRole } from "@/redux/role/role.thunk";
import { DataTableLoading } from "@/components/data-table/DataTableLoading";
import { DataTablePagination } from "@/components/data-table/DataTablePagination";
import { setHistory } from "@/utils/history";
import { filteredObj } from "@/utils/object";
import { columns } from "./columns";
import { useRoleTableFilters } from "./useRoleTableFilters";
import { Input } from "@/components/ui/input";
import { SelectFormField } from "@/components/form-fields";
import { RoleState } from "@/redux/role/role.type";

export function RoleListDataTable() {
  const dispatch = useAppDispatch();
  const { list, totalCount, loading, isInitialized } = useAppSelector<RoleState>((state) => state.role);
  const { filters, handlePageChange, handleLimitChange, handleStatusChange, handleKeywordChange } =
    useRoleTableFilters();
  const prevKeyword = useRef(filters.keyword);

  const handleGetRoleList = () => {
    const newUrl = `${window.location.href}?${new URLSearchParams(filteredObj(filters))}`;
    setHistory(newUrl);
    dispatch(getListRole(filters));
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
    <DataTableLoading loading={loading.getListRole} initialized={isInitialized} className="flex flex-col gap-6">
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

        <SelectFormField
          disabled={loading.getListRole}
          name="status"
          value={filters.status}
          onValueChange={handleStatusChange}
          options={Object.values(ROLE_STATUS).map((status) => ({ title: status, value: status }))}
        />
      </div>

      <DataTable
        data={list}
        placeholder="No roles found. Note: if a role was just created/deleted, it takes some time for it to be indexed."
        columns={columns}
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
