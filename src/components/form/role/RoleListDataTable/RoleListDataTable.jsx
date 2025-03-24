import { useEffect, useRef, useState } from "react";
import { InputField, SelectObjectField } from "@/components/formik-fields";
import { ROLE_STATUS } from "@/constants/role";
import { DataTable } from "@/components/data-table";
import { useDispatch, useSelector } from "react-redux";
import { getListRole } from "@/redux/role/role.slice";
import { useDebouncedCallback } from "use-debounce";
import { DataTableLoading } from "@/components/data-table/DataTableLoading";
import { DataTablePagination } from "@/components/data-table/DataTablePagination";
import { saveHistory } from "@/utils/history";
import { columns } from "./columns";
import { filteredObj } from "@/utils/object";
import { useRoleTableFilters } from "./useRoleTableFilters";

export function RoleListDataTable() {
  const dispatch = useDispatch();
  const { list, meta, isLoading, isInitialized } = useSelector((state) => state.role);
  const { filters, handlePageChange, handleLimitChange, handleStatusChange, handleKeywordChange } =
    useRoleTableFilters();
  const prevKeyword = useRef(filters.keyword);

  const handleGetRoleList = () => {
    const filteredFilters = filteredObj(filters);
    const newUrl = `${window.location.href}?${new URLSearchParams(filteredFilters)}`;
    saveHistory(newUrl);
    dispatch(getListRole(filteredFilters));
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
    <DataTableLoading loading={isLoading} initialized={isInitialized} className="flex flex-col gap-6">
      <div className="grid sm:grid-cols-3 grid-cols-2 items-center gap-3">
        <InputField
          className="col-span-3 sm:col-span-2"
          disabled={isLoading}
          name="search"
          type="text"
          placeholder="Enter a keyword"
          value={filters.keyword}
          onValueChange={handleKeywordChange}
        />

        <SelectObjectField
          disabled={isLoading}
          switchable
          className="col-span-3 sm:col-span-1"
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
        loading={isLoading}
      />

      <DataTablePagination
        loading={isLoading}
        limit={filters.limit}
        totalCount={meta?.totalCount || 0}
        page={filters.page}
        onLimitChange={handleLimitChange}
        onPageChange={handlePageChange}
      />
    </DataTableLoading>
  );
}
