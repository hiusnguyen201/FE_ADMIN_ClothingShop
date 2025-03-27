import { FlexBox } from "@/components/FlexBox";
import { AlertBox } from "@/components/AlertBox";
import { EditRoleInfoForm } from "@/components/form/role/EditRoleTabs/EditRoleInfoForm";
import { ButtonOpenRemoveRoleDialog, RemoveRoleDialogFormProvider } from "@/components/form/role/RemoveRoleDialogForm";
import { useAppSelector } from "@/redux/store";
import { RoleState } from "@/redux/role/role.type";
import { ROLE_STATUS } from "@/types/role";
import {
  ActivateRoleDialogFormProvider,
  ButtonOpenActivateRoleDialog,
} from "@/components/form/role/ActivateRoleDialogForm";
import {
  ButtonOpenDeactivateRoleDialog,
  DeactivateRoleDialogFormProvider,
} from "@/components/form/role/DeactivateRoleDialogForm";

export function EditRoleSettingsPage() {
  const { item: role } = useAppSelector<RoleState>((selector) => selector.role);
  if (!role) return;

  return (
    <FlexBox size="large">
      {/* Edit Form */}
      <EditRoleInfoForm role={role} />

      <FlexBox size="small">
        <h2 className="text-lg font-medium">Danger Zone</h2>

        {role.status === ROLE_STATUS.INACTIVE ? (
          // Activate Form
          <ActivateRoleDialogFormProvider
            cancelText="Cancel"
            confirmText="Confirm"
            title="Reactivate Role"
            description={`Activating the "${role.name}" role will immediately change user access based on its permissions.`}
            role={role}
          >
            <AlertBox
              title="Reactivate Role"
              description="Enabling this role will restore permissions for assigned users."
              rightAction={<ButtonOpenActivateRoleDialog>Reactivate</ButtonOpenActivateRoleDialog>}
            />
          </ActivateRoleDialogFormProvider>
        ) : (
          // Deactivate Form
          <DeactivateRoleDialogFormProvider
            cancelText="Cancel"
            confirmText="Confirm"
            title="Deactivate Role"
            description={`Deactivating the "${role.name}" role will immediately change user access based on its permissions.`}
            role={role}
          >
            <AlertBox
              title="Deactivate Role"
              description="Disabling this role will revoke access for all assigned users based on its permissions."
              rightAction={<ButtonOpenDeactivateRoleDialog>Deactivate</ButtonOpenDeactivateRoleDialog>}
            />
          </DeactivateRoleDialogFormProvider>
        )}

        <RemoveRoleDialogFormProvider
          cancelText="Cancel"
          confirmText="Confirm"
          title="Remove Role"
          description={`Are you sure you want to delete role "${role.name}"?`}
          role={role}
        >
          <AlertBox
            title="Remove Role"
            description="Once confirmed, this operation can't be undone!"
            rightAction={<ButtonOpenRemoveRoleDialog>Remove</ButtonOpenRemoveRoleDialog>}
          />
        </RemoveRoleDialogFormProvider>
      </FlexBox>
    </FlexBox>
  );
}
