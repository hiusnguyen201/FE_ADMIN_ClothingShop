import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { GENDER } from "./constant";
import { useRoleTableFilters } from "./useRoleTableFilters";
import { User, columns } from "./columns";
import { useEffect, useState, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import Title from "./Title";
import TableBottom from "./TableBottom";
import { DataTable } from "./data-table";
import { useDispatch } from "react-redux";
import { getAllUsers } from "@/lib/slices/userSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";

interface MetaData {
  offSet: number;
  limit: number;
  page: number;
  totalPage: number;
  totalCount: number;
  isNext: boolean;
  isPrevious: boolean;
  isFirst: boolean;
  isLast: boolean;
}

export default function ListUsers() {
  const [data, setData] = useState<User[]>([]);
  const [meta, setMeta] = useState<MetaData>({
    offSet: 0,
    limit: 10,
    page: 1,
    totalPage: 1,
    totalCount: 0,
    isNext: true,
    isPrevious: false,
    isFirst: true,
    isLast: false,
  });

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const {
    searchQuery,
    setSearchQuery,
    genderFilter,
    setGenderFilter,
    resetFilters,
    setChangePageSize,
    changePageSize,
  } = useRoleTableFilters();

  const toggleGender = useCallback(
    (gender: string) => {
      setGenderFilter((prev) =>
        prev.includes(gender)
          ? prev.filter((item) => item !== gender)
          : [...prev, gender]
      );
    },
    [setGenderFilter]
  );

  const handlePageSizeChange = useCallback(
    (newSize: number) => {
      setChangePageSize(newSize);
      setMeta((prev) => ({
        ...prev,
        page: 1,
        limit: newSize,
      }));
    },
    [setChangePageSize]
  );

  const handlePageChange = useCallback((newPage: number) => {
    setMeta((prev) => ({ ...prev, page: newPage }));
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const filters = {
          keyword: searchQuery,
          limit: changePageSize,
          page: meta.page,
          gender: genderFilter.join(","),
        };

        const resultAction = await dispatch(getAllUsers(filters));
        if (getAllUsers.fulfilled.match(resultAction)) {
          const responseData = resultAction.payload;
          if (responseData?.data) {
            let userList = responseData.data.list;

            if (genderFilter.length > 0) {
              userList = userList.filter((user: User) =>
                genderFilter.some(
                  (filterValue) =>
                    String(user.gender).toLowerCase() ===
                    filterValue.toLowerCase()
                )
              );
            }

            setData(userList);

            setMeta({
              ...responseData.data.meta,
              totalPage: Math.ceil(
                responseData.data.meta.totalCount / changePageSize
              ),
              isFirst: responseData.data.meta.page === 1,
              isLast:
                responseData.data.meta.page ===
                responseData.data.meta.totalPage,
              isNext:
                responseData.data.meta.page < responseData.data.meta.totalPage,
              isPrevious: responseData.data.meta.page > 1,
            });
          } else {
            setData([]);
          }
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setData([]);
      }
    };

    fetchUsers();
  }, [dispatch, searchQuery, genderFilter, changePageSize, meta.page]);

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (data === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-6 py-3">
      <Title
        title="User"
        titleBtn="Add new"
        linkRoute="/admin/users/create-user"
      />

      <div className="flex items-center py-4 space-x-2">
        <Input
          placeholder="Search name..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <span>Gender</span>
              {genderFilter.length > 0 && (
                <>
                  <div className="border mx-1 h-full" />
                  {genderFilter.map((item) => (
                    <Badge key={item}>
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </Badge>
                  ))}
                </>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {Object.values(GENDER).map((gender) => (
              <DropdownMenuItem
                key={String(gender)}
                onClick={(e) => {
                  e.preventDefault();
                  toggleGender(gender);
                }}
              >
                <Checkbox checked={genderFilter.includes(gender)} />
                <span className="ml-2">{gender as string}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {(genderFilter.length > 0 || searchQuery) && (
          <Button variant="outline" onClick={resetFilters}>
            Reset Filters
          </Button>
        )}
      </div>

      <DataTable columns={columns} data={data || []} isLoading={!data} />

      <TableBottom
        currentPage={meta.page}
        totalPages={meta.totalPage}
        pageSize={changePageSize}
        totalCount={meta.totalCount}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        isFirst={meta.isFirst}
        isLast={meta.isLast}
        isNext={meta.isNext}
        isPrevious={meta.isPrevious}
      />
    </div>
  );
}
