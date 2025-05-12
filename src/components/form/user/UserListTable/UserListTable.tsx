import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { DataTable } from "@/components/data-table";
import { getListUser } from "@/redux/user/user.thunk";
import { DataTableLoading } from "@/components/data-table/DataTableLoading";
import { DataTablePagination } from "@/components/data-table/DataTablePagination";
import { UserFieldsSort, UserState } from "@/redux/user/user.type";
import { toast } from "@/hooks/use-toast";
import { SearchFormField } from "@/components/form-fields/SearchFormFIeld";
import { ExportListUserExcelButton } from "@/components/form/user/ExportListUserExcelButton";
import { useUserTableFilters } from "./useUserTableFilters";
import { userColumns } from "./user-columns";
import { UserFilterSidebarForm } from "./UserFilterSidebarForm";

export function UserListTable() {
  const dispatch = useAppDispatch();
  const { list, totalCount, loading, initializedList, removedUserIds, newItem } = useAppSelector<UserState>(
    (state) => state.user
  );
  const { filters, handlePageChange, handleLimitChange, handleKeywordChange, handleFiltersChange, handleSortChange } =
    useUserTableFilters();

  const handleGetUserList = async () => {
    try {
      await dispatch(getListUser(filters)).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  useEffect(() => {
    handleGetUserList();
  }, [filters, dispatch, removedUserIds, newItem]);

  return (
    <DataTableLoading initialized={initializedList} className="flex flex-col gap-6 w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3">
        <SearchFormField
          name="keyword"
          disabled={loading.getListUser}
          value={filters.keyword}
          onValueChange={handleKeywordChange}
          placeholder="Enter a keyword"
        />

        <UserFilterSidebarForm
          onApplyFilter={handleFiltersChange}
          values={{
            status: filters.status,
            gender: filters.gender,
          }}
        />
      </div>

      <div className="flex items-center sm:justify-end">
        <ExportListUserExcelButton filters={filters} />
      </div>

      <DataTable
        data={list}
        onSortingChange={(sorting) => {
          handleSortChange(sorting[0]?.id as UserFieldsSort, sorting[0]?.desc);
        }}
        placeholder="No users found. Note: if a user was just created/deleted, it takes some time for it to be indexed."
        columns={userColumns}
        heightPerRow={77}
      />

      <DataTablePagination
        loading={loading.getListUser}
        limit={filters.limit}
        totalCount={totalCount}
        page={filters.page}
        onLimitChange={handleLimitChange}
        onPageChange={handlePageChange}
      />
    </DataTableLoading>
  );
}
