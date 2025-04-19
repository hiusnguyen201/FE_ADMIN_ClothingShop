import { ReactNode } from "react";
import { AlertDialog } from "@/components/AlertDialog";
import { User } from "@/types/user";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { RemoveUserResponse, UserState } from "@/redux/user/user.type";
import { removeUser } from "@/redux/user/user.thunk";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

type RemoveUserDialogFormProps = {
  user: User;
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
};

export function RemoveUserDialogForm({ user, children, open, onOpenChange }: RemoveUserDialogFormProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector<UserState>((selector) => selector.user);

  const handleRemove = async () => {
    try {
      const response: RemoveUserResponse = await dispatch(removeUser({ id: user.id })).unwrap();
      toast({ title: response.message });
      navigate("/users");
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  return (
    <AlertDialog
      open={open}
      trigger={children}
      onOpenChange={onOpenChange}
      title="Remove User"
      description={`Are you sure you want to delete user "${user.name}"?`}
      onConfirm={handleRemove}
      loading={loading.removeUser}
      cancelText="Cancel"
      confirmText="Confirm"
    />
  );
}
