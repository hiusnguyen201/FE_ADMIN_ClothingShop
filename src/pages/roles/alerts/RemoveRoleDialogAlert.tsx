import { ButtonOpenRemoveRoleDialog, RemoveRoleDialogFormProvider } from "@/components/form/role/RemoveRoleDialogForm";
import { Role } from "@/types/role";
import { ReactNode } from "react";

export function RemoveRoleDialogAlert({ children, role }: { children: ReactNode; role: Role }) {
  return (
    <RemoveRoleDialogFormProvider
      cancelText="Cancel"
      confirmText="Confirm"
      title="Remove Role"
      description={`Are you sure you want to delete role "${role.name}"?`}
      role={role}
    >
      <ButtonOpenRemoveRoleDialog>{children}</ButtonOpenRemoveRoleDialog>
    </RemoveRoleDialogFormProvider>
  );
}
