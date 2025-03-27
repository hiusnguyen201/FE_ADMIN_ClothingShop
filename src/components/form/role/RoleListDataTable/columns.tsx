import { useState } from "react";
import { DiamondMinusIcon, DiamondPlusIcon, MoreHorizontal, Trash2Icon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
// import DeleteRoleDialog from "@/middlewares/DeleteRole";
import { useDispatch } from "react-redux";
import { TruncatedTextWithTooltip } from "@/components/TruncatedTextWithTooltip";
import { Role, ROLE_STATUS } from "@/types/role";
import { ColumnDef } from "@tanstack/react-table";
// import { activeRoleById, deactiveRoleById } from "@/lib/features/role/roleThunks";

export const columns: ColumnDef<Role>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <Link className="text-blue-500" to={"/roles/" + row.original.id + "/settings"}>
        {row.getValue("name")}
      </Link>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    maxSize: 540,
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
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[180px]">
              <Link to={`/roles/${role.id}/settings`}>
                <DropdownMenuItem className="cursor-pointer capitalize">Views Details</DropdownMenuItem>
              </Link>

              <DropdownMenuSeparator />
              {role.status === ROLE_STATUS.ACTIVE ? (
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={async () => {
                    // await dispatch(deactivateRoleById(role._id));
                  }}
                >
                  <DiamondMinusIcon />
                  Deactivate
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={async () => {
                    // await dispatch(activateRoleById(role._id));
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

          {/* {isDialogOpen && <DeleteRoleDi/alog role={role} onClose={handleCloseDialog} />} */}
        </>
      );
    },
  },
];
