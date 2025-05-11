import { Trash2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { TruncatedTextWithTooltip } from "@/components/TruncatedTextWithTooltip";
import { Permission } from "@/types/permission";
import { Tag } from "@/components/Tag";
import { Role } from "@/types/role";
import { RemoveRolePermissionDialogForm } from "@/components/form/role/EditRoleTabs/RemoveRolePermissionDialogForm";
import { usePermission } from "@/hooks/use-permission";
import { PERMISSIONS } from "@/constants/permissions";

export const rolePermissionsColumns: ColumnDef<{ role: Role; permission: Permission }, any>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <Tag>{row.original.permission.name}</Tag>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <TruncatedTextWithTooltip>{row.original.permission.description}</TruncatedTextWithTooltip>,
  },
  {
    id: "actions",
    maxSize: 64,
    enableSorting: false,
    cell: ({ row }) => {
      const can = usePermission();
      return (
        can(PERMISSIONS.REMOVE_ROLE_PERMISSIONS) && (
          <RemoveRolePermissionDialogForm role={row.original.role} permission={row.original.permission}>
            <Button variant="outline" size="icon" className="w-8 h-8">
              <Trash2 />
            </Button>
          </RemoveRolePermissionDialogForm>
        )
      );
    },
  },
];
