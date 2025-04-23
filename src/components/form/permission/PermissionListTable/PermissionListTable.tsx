import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { DataTable } from "@/components/data-table";
import { getListPermission } from "@/redux/permission/permission.thunk";
import { DataTableLoading } from "@/components/data-table/DataTableLoading";
import { DataTablePagination } from "@/components/data-table/DataTablePagination";
import { PermissionState } from "@/redux/permission/permission.type";
import { toast } from "@/hooks/use-toast";
import { usePermissionTableFilters } from "./usePermissionTableFilters";
import { SearchFormField } from "@/components/form-fields/SearchFormFIeld";
import { convertToSearchParams } from "@/utils/object";
import { useSearchParams } from "react-router-dom";
import { permissionColumns } from "@/pages/permissions/permission-columns";

export function PermissionListTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { list, totalCount, loading, initializedList } = useAppSelector<PermissionState>((state) => state.permission);
  const { filters, handlePageChange, handleLimitChange, handleKeywordChange, isDefault } = usePermissionTableFilters({
    searchParams,
  });

  const handleGetPermissionList = async () => {
    try {
      await dispatch(getListPermission(filters)).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  useEffect(() => {
    if (!isDefault) {
      setSearchParams(convertToSearchParams(filters));
    }

    handleGetPermissionList();
  }, [filters, dispatch]);

  return (
    <DataTableLoading initialized={initializedList} className="flex flex-col gap-6 w-full">
      <div className="grid sm:grid-cols-3 grid-cols-2 items-center gap-3">
        <SearchFormField
          name="keyword"
          disabled={loading.getListPermission}
          className="col-span-3 sm:col-span-2"
          value={filters.keyword}
          onValueChange={handleKeywordChange}
          placeholder="Enter a keyword"
        />
      </div>

      <DataTable
        data={list}
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
