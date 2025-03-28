import { cloneElement, createContext, ReactElement, ReactNode, useContext, useState } from "react";
import { AlertDialog } from "@/components/AlertDialog";
import { Role } from "@/types/role";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { RemoveRoleResponse, RoleState } from "@/redux/role/role.type";
import { removeRole } from "@/redux/role/role.thunk";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

type RemoveRoleDialogFormContextType = {
  open: boolean;
  openRemoveRoleDialogForm: () => void;
  closeRemoveRoleDialogForm: () => void;
};

const RemoveRoleDialogFormContext = createContext<RemoveRoleDialogFormContextType>({
  open: false,
  openRemoveRoleDialogForm: () => {},
  closeRemoveRoleDialogForm: () => {},
});

export const useRemoveRoleDialogForm = () => useContext(RemoveRoleDialogFormContext);

export const ButtonOpenRemoveRoleDialog = ({ children }: { children?: ReactNode }) => {
  const { openRemoveRoleDialogForm } = useRemoveRoleDialogForm();
  return cloneElement(children as ReactElement, {
    onClick: (e: MouseEvent) => {
      e.preventDefault();
      openRemoveRoleDialogForm();
    },
  });
};

type RemoveRoleDialogFormProviderProps = {
  role: Role;
  children: ReactNode;
  title: string;
  description: string;
  cancelText: string;
  confirmText: string;
};

export function RemoveRoleDialogFormProvider({
  title,
  description,
  role,
  children,
  cancelText,
  confirmText,
}: RemoveRoleDialogFormProviderProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector<RoleState>((selector) => selector.role);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const openRemoveRoleDialogForm = () => {
    setOpenDialog(true);
  };

  const closeRemoveRoleDialogForm = () => {
    if (loading.removeRole) return;
    setOpenDialog(false);
  };

  const handleRemove = async () => {
    try {
      const response: RemoveRoleResponse = await dispatch(removeRole({ id: role.id })).unwrap();
      toast({ title: response.message });
      navigate("/roles");
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    } finally {
      closeRemoveRoleDialogForm();
    }
  };

  return (
    <RemoveRoleDialogFormContext.Provider
      value={{ open: openDialog, openRemoveRoleDialogForm, closeRemoveRoleDialogForm }}
    >
      {children}

      {openDialog && (
        <AlertDialog
          variant="destructive"
          open={openDialog}
          onOpenChange={setOpenDialog}
          title={title}
          description={description}
          onClose={closeRemoveRoleDialogForm}
          onConfirm={handleRemove}
          loading={loading.removeRole}
          cancelText={cancelText}
          confirmText={confirmText}
        />
      )}
    </RemoveRoleDialogFormContext.Provider>
  );
}
