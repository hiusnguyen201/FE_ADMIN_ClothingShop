import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { User } from "@/types/user";
import { DataTable } from "@/components/data-table";
import { getListUser } from "@/redux/user/user.thunk";
import { DataTableLoading } from "@/components/data-table/DataTableLoading";
import { DataTablePagination } from "@/components/data-table/DataTablePagination";
import { UserState } from "@/redux/user/user.type";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "@/hooks/use-toast";
import { useUserTableFilters } from "./useUserTableFilters";
import { SearchFormField } from "@/components/form-fields/SearchFormFIeld";
import { setHistory } from "@/utils/history";
import { filterObj } from "@/utils/object";

export function UserListTable({ columns }: { columns: ColumnDef<User, any>[] }) {
  const dispatch = useAppDispatch();
  const { list, totalCount, loading } = useAppSelector<UserState>((state) => state.user);
  const { filters, handlePageChange, handleLimitChange, handleKeywordChange } = useUserTableFilters();
  const location = useLocation();

  const handleGetUserList = async () => {
    try {
      await dispatch(getListUser(filters)).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  useEffect(() => {
    setHistory(`${location.pathname}?${new URLSearchParams(filterObj(filters))}`);
    handleGetUserList();
  }, [filters, dispatch]);

  return (
    <DataTableLoading loading={loading.getListUser} className="flex flex-col gap-6 w-full">
      <div className="grid sm:grid-cols-3 grid-cols-2 items-center gap-3">
        <SearchFormField
          name="keyword"
          disabled={loading.getListUser}
          className="col-span-3 sm:col-span-2"
          value={filters.keyword}
          onSearchClick={(value) => handleKeywordChange(value)}
          placeholder="Enter a keyword"
        />
      </div>

      <DataTable
        data={list}
        placeholder="No users found. Note: if a user was just created/deleted, it takes some time for it to be indexed."
        columns={columns}
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
