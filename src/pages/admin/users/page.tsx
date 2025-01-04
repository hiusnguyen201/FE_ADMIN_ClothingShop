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
import * as React from "react";
import { GENDER } from "./constant";
import { useRoleTableFilters } from "./useRoleTableFilters";
import { User, columns } from "./columns";
import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import Title from "./Title";
import TableBottom from "./TableBottom";
import { DataTable } from "./data-table";

async function getData(): Promise<User[]> {
  const names = [
    "John",
    "Michael",
    "David",
    "Chris",
    "Matthew",
    "James",
    "Robert",
    "Daniel",
    "Andrew",
    "Joseph",
    "Anna",
  ];
  return new Array(30).fill(null).map(() => ({
    id: Math.random().toString(36).substring(7),
    name: names[Math.floor(Math.random() * names.length)],
    phone: "0912345678",
    dateOfBirth: "11/2/2000",
    gender: Math.random() < 0.5 ? "male" : "female",
  }));
}

export default function Page() {
  const [data, setData] = useState<User[] | null>(null);
  const [meta, setMeta] = useState({
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

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }
    fetchData();
  }, []);

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const {
    searchQuery,
    setSearchQuery,
    genderFilter,
    setGenderFilter,
    resetFilters,
    setChangePageSize,
    changePageSize,
  } = useRoleTableFilters();

  const handleNextPage = () => {
    setMeta((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  const handlePreviousPage = () => {
    setMeta((prev) => ({ ...prev, page: prev.page - 1 }));
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-6 py-3">
      <Title
        title="User"
        titleBtn="Add new"
        linkRoute="/admin/users/add-user"
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
                  <div className="border mx-1 h-full"></div>
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
                  setGenderFilter((prev) =>
                    prev.includes(gender)
                      ? prev.filter((item) => item !== gender)
                      : [...prev, gender]
                  );
                }}
              >
                <Checkbox checked={genderFilter.includes(gender)} />
                <span>{gender as string}</span>
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

      <DataTable
        columns={columns}
        data={data ? table.getRowModel().rows.map((row) => row.original) : []}
        isLoading={!data}
      />
      <TableBottom
        getCanPreviousPage={() => meta.isPrevious}
        getCanNextPage={() => meta.isNext}
        previousPage={handlePreviousPage}
        nextPage={handleNextPage}
        onPageSizeChange={setChangePageSize}
        pageSize={changePageSize}
        tableOffSet={meta.offSet + 1}
        tableLimit={Math.min(meta.offSet + meta.limit, meta.totalCount)}
        tableTotalCount={meta.totalCount}
      />
    </div>
  );
}
