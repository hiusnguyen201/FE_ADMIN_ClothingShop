import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { DataTable } from "@/components/data-table";
import { getListUser } from "@/redux/user/user.thunk";
import { DataTableLoading } from "@/components/data-table/DataTableLoading";
import { DataTablePagination } from "@/components/data-table/DataTablePagination";
import { UserState } from "@/redux/user/user.type";
import { toast } from "@/hooks/use-toast";
import { useUserTableFilters } from "./useUserTableFilters";
import { SearchFormField } from "@/components/form-fields/SearchFormFIeld";
import { useSearchParams } from "react-router-dom";
import { convertToSearchParams } from "@/utils/object";
import { userColumns } from "@/pages/users/user-columns";

export function UserListTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { list, totalCount, loading, initializedList, removedUserIds, newItem } = useAppSelector<UserState>(
    (state) => state.user
  );
  const { filters, handlePageChange, handleLimitChange, handleKeywordChange, isDefault } = useUserTableFilters({
    searchParams,
  });

  const handleGetUserList = async () => {
    try {
      await dispatch(getListUser(filters)).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  useEffect(() => {
    if (!isDefault) {
      setSearchParams(convertToSearchParams(filters));
    }

    handleGetUserList();
  }, [filters, dispatch, removedUserIds, newItem]);

  return (
    <DataTableLoading initialized={initializedList} className="flex flex-col gap-6 w-full">
      <div className="grid sm:grid-cols-3 grid-cols-2 items-center gap-3">
        <SearchFormField
          name="keyword"
          disabled={loading.getListUser}
          className="col-span-3 sm:col-span-2"
          value={filters.keyword}
          onValueChange={handleKeywordChange}
          placeholder="Enter a keyword"
        />
      </div>

      <DataTable
        data={list}
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
