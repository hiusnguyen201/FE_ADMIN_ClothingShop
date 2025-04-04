import { FlexBox } from "@/components/FlexBox";
import { RolePermissionsListTable } from "@/components/form/role/EditRoleTabs/RolePermissionsListTable";
import { Role } from "@/types/role";
import { rolePermissionsColumns } from "./role-permissions-columns";
import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SelectRolePermissionsDialogForm } from "@/components/form/role/EditRoleTabs/SelectRolePermissionsDialogForm";

export function EditRolePermissionsPage({ role }: { role: Role }) {
  return (
    <FlexBox>
      <Heading
        description="Add Permissions to this Role. Users who have this Role will receive all Permissions below that match the API
          of their login request."
        actionRight={
          <SelectRolePermissionsDialogForm role={role}>
            <Button>
              <Plus size={14} />
              Add Permissions
            </Button>
          </SelectRolePermissionsDialogForm>
        }
      />

      <RolePermissionsListTable role={role} columns={rolePermissionsColumns} />
    </FlexBox>
  );
}
