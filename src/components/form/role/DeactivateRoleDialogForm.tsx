import { cloneElement, createContext, MouseEvent, ReactElement, ReactNode, useContext, useState } from "react";
import { AlertDialog } from "@/components/AlertDialog";
import { Role } from "@/types/role";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { DeactivateRoleResponse, RoleState } from "@/redux/role/role.type";
import { deactivateRole } from "@/redux/role/role.thunk";
import { toast } from "@/hooks/use-toast";

type DeactivateRoleDialogFormContextType = {
  open: boolean;
  openDeactivateRoleDialogForm: () => void;
  closeDeactivateRoleDialogForm: () => void;
};

const DeactivateRoleDialogFormContext = createContext<DeactivateRoleDialogFormContextType>({
  open: false,
  openDeactivateRoleDialogForm: () => {},
  closeDeactivateRoleDialogForm: () => {},
});

export const useDeactivateRoleDialogForm = () => useContext(DeactivateRoleDialogFormContext);

export const ButtonOpenDeactivateRoleDialog = ({ children }: { children?: ReactNode }) => {
  const { openDeactivateRoleDialogForm } = useDeactivateRoleDialogForm();
  return cloneElement(children as ReactElement, {
    onClick: (e: MouseEvent) => {
      e.preventDefault();
      openDeactivateRoleDialogForm();
    },
  });
};

type DeactivateRoleDialogFormProviderProps = {
  role: Role;
  children: ReactNode;
  title: string;
  description: string;
  cancelText: string;
  confirmText: string;
};

export function DeactivateRoleDialogFormProvider({
  title,
  description,
  role,
  children,
  cancelText,
  confirmText,
}: DeactivateRoleDialogFormProviderProps) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector<RoleState>((selector) => selector.role);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const openDeactivateRoleDialogForm = () => {
    setOpenDialog(true);
  };

  const closeDeactivateRoleDialogForm = () => {
    if (loading.deactivateRole) return;
    setOpenDialog(false);
  };

  const handleDeactivate = async () => {
    try {
      const response: DeactivateRoleResponse = await dispatch(deactivateRole({ id: role.id })).unwrap();
      toast({ title: response.message });
      closeDeactivateRoleDialogForm();
    } catch (error: any) {
      closeDeactivateRoleDialogForm();
      toast({ title: error, variant: "destructive" });
    }
  };

  return (
    <DeactivateRoleDialogFormContext.Provider
      value={{ open: openDialog, openDeactivateRoleDialogForm, closeDeactivateRoleDialogForm }}
    >
      {children}

      {openDialog && (
        <AlertDialog
          variant="destructive"
          open={openDialog}
          onOpenChange={setOpenDialog}
          title={title}
          description={description}
          onClose={closeDeactivateRoleDialogForm}
          onConfirm={handleDeactivate}
          loading={loading.deactivateRole}
          cancelText={cancelText}
          confirmText={confirmText}
        />
      )}
    </DeactivateRoleDialogFormContext.Provider>
  );
}
