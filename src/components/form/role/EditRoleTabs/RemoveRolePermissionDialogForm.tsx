import { ReactNode } from "react";
import { AlertDialog } from "@/components/AlertDialog";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { RemoveRolePermissionResponse, RoleState } from "@/redux/role/role.type";
import { removeRolePermission } from "@/redux/role/role.thunk";
import { toast } from "@/hooks/use-toast";
import { Permission } from "@/types/permission";
import { Role } from "@/types/role";

type RemoveRolePermissionDialogFormProps = {
  role: Role;
  permission: Permission;
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
};

export function RemoveRolePermissionDialogForm({
  role,
  permission,
  children,
  open,
  onOpenChange,
}: RemoveRolePermissionDialogFormProps) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector<RoleState>((selector) => selector.role);

  const handleRemove = async () => {
    try {
      const response: RemoveRolePermissionResponse = await dispatch(
        removeRolePermission({ roleId: role.id, permissionId: permission.id })
      ).unwrap();
      toast({ title: response.message });
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  return (
    <AlertDialog
      variant="destructive"
      open={open}
      trigger={children}
      onOpenChange={onOpenChange}
      title="Remove permission?"
      description={`Are you sure that you want to remove "${permission.name}"?`}
      onConfirm={handleRemove}
      loading={loading.removeRolePermission}
      cancelText="Cancel"
      confirmText="Confirm"
    />
  );
}
