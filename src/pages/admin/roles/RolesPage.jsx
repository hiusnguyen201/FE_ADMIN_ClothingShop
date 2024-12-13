import * as React from "react";
import DataTableCustom from "../../../components/DataTableCustom";
import { columns } from "./columns";
import { ROLE_STATUS } from "./columns";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Heading from "@/./components/heading";
import { useDispatch, useSelector } from "react-redux";
import { getAllRoles } from "@/lib/slices/role.slice";

export default function RolesPage() {
  const dispatch = useDispatch();
  const { list: data, meta } = useSelector((state) => state.role);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [page, setPage] = React.useState(1);
  const [itemPerPage, setItemPerPage] = React.useState("10");
  const [statusFilter, setStatusFilter] = React.useState(undefined);

  React.useEffect(() => {
    // Gọi action để lấy danh sách roles
    dispatch(getAllRoles({ page, itemPerPage }));
  }, [dispatch, page, itemPerPage]);

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
  console.log(statusFilter);

  return (
    <>
      <div className="p-4 md:px-6">
        <Heading
          description={"Manage roles (Server side table functionalities.)"}
          link={"/admin/roles/add"}
          title={"Role"}
          titleBtnAdd={"Add Role"}
          total={meta.totalItems}
        />
        <div className="sm:flex items-center py-4 space-y-2 gap-2">
          <Input placeholder="Filter name..." className="max-w-sm mt-2" />
          <div className="flex gap-2">
            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value);
              }}
            >
              <SelectTrigger className="w-[100px] ">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={undefined}>Status</SelectItem>
                {Object.values(ROLE_STATUS).map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
          filter={table}
          meta={meta}
          onPageChange={(page) => setPage(page)}
          onItemPerPageChange={(itemPerPage) => setItemPerPage(itemPerPage)}
        />
      </div>
    </>
  );
}
