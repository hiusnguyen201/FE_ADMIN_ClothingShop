import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { DataTable } from "@/components/data-table";
import { getListRole } from "@/redux/role/role.thunk";
import { DataTableLoading } from "@/components/data-table/DataTableLoading";
import { DataTablePagination } from "@/components/data-table/DataTablePagination";
import { RoleFieldsSort, RoleState } from "@/redux/role/role.type";
import { toast } from "@/hooks/use-toast";
import { SearchFormField } from "@/components/form-fields/SearchFormFIeld";
import { ExportListRoleExcelButton } from "@/components/form/role/ExportListRoleExcelButton";
import { useRoleTableFilters } from "./useRoleTableFilters";
import { roleColumns } from "./role-columns";

export function RoleListTable() {
  const dispatch = useAppDispatch();
  const { list, totalCount, loading, initializedList, removedRoleIds, newItem } = useAppSelector<RoleState>(
    (state) => state.role
  );
  const { filters, handlePageChange, handleLimitChange, handleKeywordChange, handleSortChange } = useRoleTableFilters();

  const handleGetRoleList = async () => {
    try {
      await dispatch(getListRole(filters)).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  useEffect(() => {
    handleGetRoleList();
  }, [filters, dispatch, removedRoleIds, newItem]);

  return (
    <DataTableLoading initialized={initializedList} className="flex flex-col gap-6 w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3">
        <SearchFormField
          name="keyword"
          disabled={loading.getListRole}
          value={filters.keyword}
          onValueChange={handleKeywordChange}
          placeholder="Enter a keyword"
        />
      </div>

      <div className="flex items-center justify-end">
        <ExportListRoleExcelButton filters={filters} />
      </div>

      <DataTable
        data={list}
        onSortingChange={(sorting) => {
          handleSortChange(sorting[0]?.id as RoleFieldsSort, sorting[0]?.desc);
        }}
        loading={loading.getListRole}
        placeholder="No roles found. Note: if a role was just created/deleted, it takes some time for it to be indexed."
        columns={roleColumns}
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
