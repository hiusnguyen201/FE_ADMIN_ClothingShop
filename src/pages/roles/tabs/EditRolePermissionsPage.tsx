import { FlexBox } from "@/components/FlexBox";
import { SelectRolePermissions } from "@/components/form/role/EditRoleTabs/SelectRolePermissions";
import { Role } from "@/types/role";

export function EditRolePermissionsPage({ role }: { role: Role }) {
  return (
    <FlexBox>
      <SelectRolePermissions role={role} />
    </FlexBox>
  );
}
