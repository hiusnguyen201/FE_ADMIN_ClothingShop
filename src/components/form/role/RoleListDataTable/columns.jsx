import React, { useState } from "react";
import { DiamondMinusIcon, DiamondPlusIcon, MoreHorizontal, Trash2Icon } from "lucide-react";
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
// import DeleteRoleDialog from "@/middlewares/DeleteRole";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useDispatch } from "react-redux";
import { TruncatedTextWithTooltip } from "@/components/TruncatedTextWithTooltip";
// import { activeRoleById, deactiveRoleById } from "@/lib/features/role/roleThunks";

export const columns = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <Link className="text-blue-500" to={"/roles/" + row.original.slug}>
        {row.getValue("name")}
      </Link>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return <Badge className="capitalize">{status}</Badge>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    maxSize: 400,
    cell: ({ row }) => <TruncatedTextWithTooltip>{row.getValue("description")}</TruncatedTextWithTooltip>,
  },
  {
    id: "actions",
    size: 64,
    cell: ({ row }) => {
      const role = row.original;
      const [isDialogOpen, setIsDialogOpen] = useState(false);

      const handleDeleteClick = () => {
        setIsDialogOpen(true);
      };

      const handleCloseDialog = () => {
        setIsDialogOpen(false);
      };
      const dispatch = useDispatch();

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link to={`/roles/${role.name}`} state={{ id: role._id }}>
                <DropdownMenuItem className=" focus:bg-[#f6f6f6]">Views Details</DropdownMenuItem>
              </Link>
              <Link to={`/roles/${role.name}`} state={{ id: role._id }}>
                <DropdownMenuItem className="focus:bg-[#f6f6f6]">Assign To Users</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              {role.isActive ? (
                <DropdownMenuItem
                  className="focus:bg-yellow-400 focus:text-white text-yellow-400"
                  onClick={async () => {
                    await dispatch(deactiveRoleById(role._id));
                  }}
                >
                  <DiamondMinusIcon />
                  Deactivate
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  className="focus:bg-green-400 focus:text-white text-green-400"
                  onClick={async () => {
                    await dispatch(activeRoleById(role._id));
                  }}
                >
                  <DiamondPlusIcon />
                  Activate
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={handleDeleteClick} className="focus:bg-red-500 focus:text-white text-red-400">
                <Trash2Icon />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {isDialogOpen && <DeleteRoleDialog role={role} onClose={handleCloseDialog} />}
        </>
      );
    },
  },
];
