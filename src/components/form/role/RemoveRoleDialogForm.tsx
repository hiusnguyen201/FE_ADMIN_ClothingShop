import { ReactNode } from "react";
import { AlertDialog } from "@/components/AlertDialog";
import { Role } from "@/types/role";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { RemoveRoleResponse, RoleState } from "@/redux/role/role.type";
import { removeRole } from "@/redux/role/role.thunk";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

type RemoveRoleDialogFormProps = {
  role: Role;
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
};

export function RemoveRoleDialogForm({ role, children, open, onOpenChange }: RemoveRoleDialogFormProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector<RoleState>((selector) => selector.role);

  const handleRemove = async () => {
    try {
      const response: RemoveRoleResponse = await dispatch(removeRole({ id: role.id })).unwrap();
      toast({ title: response.message });
      navigate("/roles");
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
      title="Remove Role"
      description={`Are you sure you want to delete role "${role.name}"?`}
      onConfirm={handleRemove}
      loading={loading.removeRole}
      cancelText="Cancel"
      confirmText="Confirm"
    />
  );
}
