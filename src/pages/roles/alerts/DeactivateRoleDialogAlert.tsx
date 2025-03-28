import { ActivateRoleDialogFormProvider } from "@/components/form/role/ActivateRoleDialogForm";
import { ButtonOpenDeactivateRoleDialog } from "@/components/form/role/DeactivateRoleDialogForm";
import { Role } from "@/types/role";
import { ReactNode } from "react";

export function DeactivateRoleDialogAlert({ children, role }: { children: ReactNode; role: Role }) {
  return (
    <ActivateRoleDialogFormProvider
      cancelText="Cancel"
      confirmText="Confirm"
      title="Deactivate Role"
      description={`Deactivating the "${role.name}" role will immediately change user access based on its permissions.`}
      role={role}
    >
      <ButtonOpenDeactivateRoleDialog> {children}</ButtonOpenDeactivateRoleDialog>
    </ActivateRoleDialogFormProvider>
  );
}
