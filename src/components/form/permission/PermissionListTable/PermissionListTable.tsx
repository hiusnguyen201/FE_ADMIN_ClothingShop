import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { DataTable } from "@/components/data-table";
import { getListPermission } from "@/redux/permission/permission.thunk";
import { DataTableLoading } from "@/components/data-table/DataTableLoading";
import { DataTablePagination } from "@/components/data-table/DataTablePagination";
import { PermissionFieldsSort, PermissionState } from "@/redux/permission/permission.type";
import { toast } from "@/hooks/use-toast";
import { usePermissionTableFilters } from "./usePermissionTableFilters";
import { SearchFormField } from "@/components/form-fields/SearchFormFIeld";
import { permissionColumns } from "./permission-columns";
import { ExportListPermissionExcelButton } from "../ExportListPermissionExcelButton";

export function PermissionListTable() {
  const dispatch = useAppDispatch();
  const { list, totalCount, loading, initializedList } = useAppSelector<PermissionState>((state) => state.permission);
  const { filters, handlePageChange, handleLimitChange, handleKeywordChange, handleSortChange } =
    usePermissionTableFilters();

  const handleGetPermissionList = async () => {
    try {
      await dispatch(getListPermission(filters)).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  useEffect(() => {
    handleGetPermissionList();
  }, [filters, dispatch]);

  return (
    <DataTableLoading initialized={initializedList} className="flex flex-col gap-6 w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3">
        <SearchFormField
          name="keyword"
          disabled={loading.getListPermission}
          value={filters.keyword}
          onValueChange={handleKeywordChange}
          placeholder="Enter a keyword"
        />
      </div>

      <div className="flex items-center justify-end">
        <ExportListPermissionExcelButton filters={filters} />
      </div>

      <DataTable
        data={list}
        onSortingChange={(sorting) => {
          handleSortChange(sorting[0]?.id as PermissionFieldsSort, sorting[0]?.desc);
        }}
        loading={loading.getListPermission}
        placeholder="No permissions found. Note: if a permission was just created/deleted, it takes some time for it to be indexed."
        columns={permissionColumns}
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
