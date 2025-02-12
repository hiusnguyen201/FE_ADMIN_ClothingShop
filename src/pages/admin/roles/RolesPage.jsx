import * as React from "react";
import DataTableCustom from "../../../components/DataTableCustom";
import { columns } from "./columns";
import { ChevronDown, LogIn } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import Heading from "@/./components/heading";
import { useSelector } from "react-redux";
import { getAllRoles } from "@/lib/slices/role.slice";
import { useDebouncedCallback } from "use-debounce";
import { useAppDispatch } from "@/lib/hooks";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "react-router-dom";
import SelectForm from "@/components/select-form";

const statusCondition = [
  { title: "Active", value: "Active" },
  { title: "Inactive", value: "Inactive" },
];

export default function RolesPage() {
  const dispatch = useAppDispatch();
  const {
    list: data,
    meta,
    isLoading,
    error,
  } = useSelector((state) => state.role);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const { toast } = useToast();

  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = React.useState({
    page: searchParams.get("page") ? +searchParams.get("page") : 1,
    limit: searchParams.get("limit") ? +searchParams.get("limit") : 10,
    keyword: searchParams.get("keyword") ? searchParams.get("keyword") : "",
    statusfilter: searchParams.get("statusfilter")
      ? searchParams.get("statusfilter")
      : "",
  });
  const prevKeyword = React.useRef(filter.keyword);

  const getAllRolesDebounced = useDebouncedCallback(() => {
    dispatch(getAllRoles(filter));
  }, 700);

  React.useEffect(() => {
    if (error === null) return;
    if (error.status === 429) {
      toast({
        title: "Error!",
        description: "Too many requests please try again later",
        variant: "destructive",
      });
    }
  }, [error]);
  
  React.useEffect(() => {
    setSearchParams(filter);
    const newfilter = { ...filter, };
    if (newfilter.statusfilter === "Active") {
      newfilter.isActive = true;
    } else if (newfilter.statusfilter === "Inactive") {newfilter.isActive = false;}
    
    if (prevKeyword.current !== filter.keyword) {
      getAllRolesDebounced(filter);
      prevKeyword.current = filter.keyword;
      return;
    }
    dispatch(getAllRoles(newfilter));
  }, [filter]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      <div className="p-4 md:px-6">
        <Heading
          description={"Manage roles (Server side table functionalities.)"}
          link={"/admin/roles/add"}
          title={"Role"}
          titleBtnAdd={"Add Role"}
          total={meta.totalCount}
        />
        <div className="sm:flex items-center py-4 space-y-2 gap-2">
          <Input
            placeholder="Filter name..."
            className="max-w-sm mt-2"
            value={filter.keyword}
            onChange={(e) => {
              prevKeyword.current = filter.keyword;
              setFilter((prev) => ({ ...prev, keyword: e.target.value }));
            }}
          />
          <div className="flex gap-2">
            <SelectForm
              filter={filter}
              setFilter={setFilter}
              searchParams={searchParams}
              data={statusCondition}
              namebtn={"status"}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <DataTableCustom
          columns={columns}
          table={table}
          meta={meta}
          isLoading={isLoading}
          onLimitChange={(limit) => setFilter((prev) => ({ ...prev, limit }))}
          onPageChange={(page) => setFilter((prev) => ({ ...prev, page }))}
        />
      </div>
    </>
  );
}
