import * as React from "react";
import DataTableCustom from "../../components/DataTableCustom";
import { columns } from "./columns";
import { ROLE_STATUS, USER_STATUS } from "./columns";
import { ChevronDown, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Heading from "@/./components/heading";

const data = [
  {
    id: "dasd",
    icon: "1",
    name: "admin",
    description: "abcxyz",
    status: "Activity"
  },
  {
    id: "ads",
    icon: "2",
    name: "user",
    description: "abcxyz",
    status: "Activity"
  },
  {
    id: "dvax",
    icon: "3",
    name: "tester",
    description: "abcxyz",
    status: "Activity"
  },
 
];

export default function RolesPage() {
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

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
      <div className="space-y-4">
        <Heading/>
        <div className="sm:flex items-center py-4 space-y-2 gap-2">
          <Input placeholder="Filter emails..." className="max-w-sm mt-2" />
          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="w-[100px] ">
                <SelectValue placeholder="Roles" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(USER_STATUS).map((item) => (
                  <SelectItem key={item} value={item}>
                    {USER_STATUS[item]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[100px] ">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(ROLE_STATUS).map((item) => (
                  <SelectItem key={item} value={item}>
                    {ROLE_STATUS[item]}
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
        <DataTableCustom columns={columns} filter={table} />
      </div>
    </>
  );
}
