import { Link } from "react-router-dom";
import { Clipboard, MoreHorizontal, Trash } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { TruncatedTextWithTooltip } from "@/components/TruncatedTextWithTooltip";
import { Role } from "@/types/role";
import { RemoveRoleDialogForm } from "@/components/form/role/RemoveRoleDialogForm";
import { useState } from "react";
import { usePermission } from "@/hooks/use-permission";
import { PERMISSIONS } from "@/constants/permissions";

export const roleColumns: ColumnDef<Role, any>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <Link className="text-blue-500" to={"/roles/" + row.original.id + "/settings"}>
        {row.original.name}
      </Link>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    maxSize: 600,
    cell: ({ row }) => <TruncatedTextWithTooltip>{row.original.description}</TruncatedTextWithTooltip>,
  },
  {
    id: "actions",
    maxSize: 64,
    cell: ({ row }) => <RoleActions role={row.original} />,
  },
];

export function RoleActions({ role }: { role: Role }) {
  const can = usePermission();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <DropdownMenu open={isMenuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button size="icon" className="w-8 h-8" variant="outline">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="bottom"
          align="end"
          className="absolute right-0 z-10 bg-white text-black p-2 rounded shadow-lg min-w-[180px]"
        >
          {can(PERMISSIONS.READ_DETAILS_ROLE) && (
            <Link to={`/roles/${role.id}/settings`}>
              <DropdownMenuItem>
                <Clipboard /> View Details
              </DropdownMenuItem>
            </Link>
          )}

          {can(PERMISSIONS.REMOVE_ROLE) && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  setIsDialogOpen(true);
                }}
                className="text-destructive focus:text-destructive focus:bg-destructive/10"
              >
                <Trash /> Remove
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {can(PERMISSIONS.REMOVE_ROLE) && (
        <RemoveRoleDialogForm role={role} open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      )}
    </>
  );
}
