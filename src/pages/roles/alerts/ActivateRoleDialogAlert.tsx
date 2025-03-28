import {
  ActivateRoleDialogFormProvider,
  ButtonOpenActivateRoleDialog,
} from "@/components/form/role/ActivateRoleDialogForm";
import { Role } from "@/types/role";
import { ReactNode } from "react";

export function ActivateRoleDialogAlert({ children, role }: { children: ReactNode; role: Role }) {
  return (
    <ActivateRoleDialogFormProvider
      cancelText="Cancel"
      confirmText="Confirm"
      title="Reactivate Role"
      description={`Activating the "${role.name}" role will immediately change user access based on its permissions.`}
      role={role}
    >
      <ButtonOpenActivateRoleDialog>{children}</ButtonOpenActivateRoleDialog>
    </ActivateRoleDialogFormProvider>
  );
}
