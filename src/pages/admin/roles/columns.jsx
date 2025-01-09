import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import DeleteRoleDialog from "@/middlewares/DeleteRole";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ROLE_STATUS = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
};

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const isactive = row.getValue("isActive");
      if (isactive === true) {
        return (
          <Badge variant="outline" className="bg-green-500 text-white">
            Active
          </Badge>
        );
      }
      return (
        <Badge variant="outline" className="bg-red-500 text-white">
          Inactive
        </Badge>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "icon",
    header: "Icon",
    cell: ({ row }) => (
      <div className="capitalize">
        <img src={row.getValue("icon")} alt="Preview" className="w-8 h-8" />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger className="max-w-[100px] truncate overflow-hidden">
            {row.getValue("name")}
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.getValue("name")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger className="max-w-[200px] truncate overflow-hidden">
            {row.getValue("name")}
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.getValue("name")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    id: "actions",
    header: "Action",
    enableHiding: false,
    cell: ({ row }) => {
      const role = row.original;
      const [isDialogOpen, setIsDialogOpen] = useState(false);

      const handleDeleteClick = () => {
        setIsDialogOpen(true);
      };

      const handleCloseDialog = () => {
        setIsDialogOpen(false);
      };

      return (
        <div>
          <DropdownMenu >
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link
                to={`/admin/roles/edit/${role.name}`}
                state={{ id: role._id }}
              >
                <DropdownMenuItem>Edit</DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={handleDeleteClick} >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {isDialogOpen && (
            <DeleteRoleDialog role={role} onClose={handleCloseDialog} />
          )}
        </div>
      );
    },
  },
];
