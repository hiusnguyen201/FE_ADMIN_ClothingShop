import { Link } from "react-router-dom";
import { CircleCheck, CircleX, Clipboard, MoreHorizontal, Trash } from "lucide-react";
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
import { Role, ROLE_STATUS } from "@/types/role";
import {
  ButtonOpenDeactivateRoleDialog,
  DeactivateRoleDialogFormProvider,
} from "@/components/form/role/DeactivateRoleDialogForm";
import {
  ActivateRoleDialogFormProvider,
  ButtonOpenActivateRoleDialog,
} from "@/components/form/role/ActivateRoleDialogForm";
import { BadgeVariant } from "@/components/BadgeVariant";
import { ButtonOpenRemoveRoleDialog, RemoveRoleDialogFormProvider } from "@/components/form/role/RemoveRoleDialogForm";

export const rowColumns: ColumnDef<Role, any>[] = [
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <BadgeVariant variant={row.original.status === ROLE_STATUS.ACTIVE ? "success" : "destructive"}>
        {row.original.status}
      </BadgeVariant>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    maxSize: 540,
    cell: ({ row }) => <TruncatedTextWithTooltip>{row.original.description}</TruncatedTextWithTooltip>,
  },
  {
    id: "actions",
    size: 64,
    cell: ({ row }) => {
      const role = row.original;
      return <RoleActions role={role} />;
    },
  },
];

export function RoleActions({ role }: { role: Role }) {
  return (
    <DropdownMenu>
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
        <Link to={`/roles/${role.id}/settings`}>
          <DropdownMenuItem>
            <Clipboard /> View Details
          </DropdownMenuItem>
        </Link>

        <ActivateRoleDialogFormProvider
          cancelText="Cancel"
          confirmText="Confirm"
          title="Activate Role"
          description={`Activating the "${role.name}" role will immediately change user access based on its permissions.`}
          role={role}
        >
          <ButtonOpenActivateRoleDialog>
            <DropdownMenuItem className="text-success focus:text-success focus:bg-success/10">
              <CircleCheck />
              Active
            </DropdownMenuItem>
          </ButtonOpenActivateRoleDialog>
        </ActivateRoleDialogFormProvider>

        <DropdownMenuSeparator />

        {role.status === ROLE_STATUS.ACTIVE ? (
          <DeactivateRoleDialogFormProvider
            cancelText="Cancel"
            confirmText="Confirm"
            title="Deactivate Role"
            description={`Deactivating the "${role.name}" role will immediately change user access based on its permissions.`}
            role={role}
          >
            <ButtonOpenDeactivateRoleDialog>
              <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                <CircleX />
                Deactivate
              </DropdownMenuItem>
            </ButtonOpenDeactivateRoleDialog>
          </DeactivateRoleDialogFormProvider>
        ) : (
          <RemoveRoleDialogFormProvider
            cancelText="Cancel"
            confirmText="Confirm"
            title="Remove Role"
            description={`Are you sure you want to delete role "${role.name}"?`}
            role={role}
          >
            <ButtonOpenRemoveRoleDialog>
              <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                <Trash /> Remove
              </DropdownMenuItem>
            </ButtonOpenRemoveRoleDialog>
          </RemoveRoleDialogFormProvider>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
