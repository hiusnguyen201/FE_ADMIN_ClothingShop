import { ReactNode } from "react";
import { AlertDialog } from "@/components/AlertDialog";
import { User } from "@/types/user";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ResetPasswordUserResponse, UserState } from "@/redux/user/user.type";
import { resetPasswordUser } from "@/redux/user/user.thunk";
import { toast } from "@/hooks/use-toast";

type ResetPasswordUserDialogFormProps = {
  user: User;
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
};

export function ResetPasswordUserDialogForm({ user, children, open, onOpenChange }: ResetPasswordUserDialogFormProps) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector<UserState>((selector) => selector.user);

  const handleResetPassword = async () => {
    try {
      const response: ResetPasswordUserResponse = await dispatch(resetPasswordUser({ userId: user.id })).unwrap();
      toast({ title: response.message });
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  return (
    <AlertDialog
      open={open}
      trigger={children}
      onOpenChange={onOpenChange}
      title="Confirm Password Reset"
      description={`Are you sure you want to reset this "${user.name}" password? This action cannot be undone. \n The user will be required to use the new password or complete the reset process via email.`}
      onConfirm={handleResetPassword}
      loading={loading.resetPasswordUser}
      cancelText="Cancel"
      confirmText="Confirm"
    />
  );
}
