import * as React from "react";
import DataTableCustom from "../../components/DataTableCustom";
import { columns } from "./columns";
import { ROLE_STATUS, USER_STATUS } from "./columns";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  getCoreRowModel,
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
import axios from "axios";




export default function RolesPage() {
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = React.useState([]);
  const [meta, setMeta] = React.useState([]);
  const [page, setPage] = React.useState("1");
  const [itemPerPage, setItemPerPage] = React.useState("10");

  React.useEffect(() => {
    async function getAllUsers() {
      const data = await axios.get(`http://localhost:3000/api/v1/roles/get-roles?page=${page}&itemPerPage=${itemPerPage}`);
      setData(data.data.data ?? []);
      setMeta(data.data.meta ?? []);
    }

    getAllUsers();
  }, []);

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
        <DataTableCustom columns={columns} filter={table} meta={meta} />
      </div>
    </>
  );
}
