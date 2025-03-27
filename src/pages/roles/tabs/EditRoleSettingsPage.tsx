import { FlexBox } from "@/components/FlexBox";
import { AlertBox } from "@/components/AlertBox";
import { EditRoleInfoForm } from "@/components/form/role/EditRoleTabs/EditRoleInfoForm";
import { ButtonOpenRemoveRoleDialog, RemoveRoleDialogFormProvider } from "@/components/form/role/RemoveRoleDialogForm";
import { useAppSelector } from "@/redux/store";
import { RoleState } from "@/redux/role/role.type";
import { useEffect, useState } from "react";

export function EditRoleSettingsPage() {
  const { item } = useAppSelector<RoleState>((selector) => selector.role);
  if (!item) return;
  const [role, setRole] = useState(item);

  useEffect(() => {
    setRole(role);
  }, [item]);

  return (
    <FlexBox size="large">
      {/* Edit Form */}
      <EditRoleInfoForm role={role} />

      <FlexBox size="small">
        <h2 className="text-lg font-medium">Danger Zone</h2>

        {/* Remove Dialog Form*/}
        <RemoveRoleDialogFormProvider
          cancelText="Cancel"
          confirmText="Remove"
          title="Remove Role"
          description={`Are you sure you want to delete role "${role.name}"?`}
          role={role}
        >
          <AlertBox
            title="Remove Role"
            description="Once confirmed, this operation can't be undone!"
            rightAction={<ButtonOpenRemoveRoleDialog>Remove This Role</ButtonOpenRemoveRoleDialog>}
          />
        </RemoveRoleDialogFormProvider>
      </FlexBox>
    </FlexBox>
  );
}
