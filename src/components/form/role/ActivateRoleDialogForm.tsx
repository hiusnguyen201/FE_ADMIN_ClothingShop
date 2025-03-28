import { cloneElement, createContext, ReactElement, ReactNode, useContext, useState } from "react";
import { AlertDialog } from "@/components/AlertDialog";
import { Role } from "@/types/role";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ActivateRoleResponse, RoleState } from "@/redux/role/role.type";
import { activateRole } from "@/redux/role/role.thunk";
import { toast } from "@/hooks/use-toast";

type ActivateRoleDialogFormContextType = {
  open: boolean;
  openActivateRoleDialogForm: () => void;
  closeActivateRoleDialogForm: () => void;
};

const ActivateRoleDialogFormContext = createContext<ActivateRoleDialogFormContextType>({
  open: false,
  openActivateRoleDialogForm: () => {},
  closeActivateRoleDialogForm: () => {},
});

export const useActivateRoleDialogForm = () => useContext(ActivateRoleDialogFormContext);

export const ButtonOpenActivateRoleDialog = ({ children }: { children?: ReactNode }) => {
  const { openActivateRoleDialogForm } = useActivateRoleDialogForm();
  return cloneElement(children as ReactElement, {
    onClick: (e: MouseEvent) => {
      e.preventDefault();
      openActivateRoleDialogForm();
    },
  });
};

type ActivateRoleDialogFormProviderProps = {
  role: Role;
  children: ReactNode;
  title: string;
  description: string;
  cancelText: string;
  confirmText: string;
};

export function ActivateRoleDialogFormProvider({
  title,
  description,
  role,
  children,
  cancelText,
  confirmText,
}: ActivateRoleDialogFormProviderProps) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector<RoleState>((selector) => selector.role);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const openActivateRoleDialogForm = () => {
    setOpenDialog(true);
  };

  const closeActivateRoleDialogForm = () => {
    if (loading.activateRole) return;
    setOpenDialog(false);
  };

  const handleActivate = async () => {
    try {
      const response: ActivateRoleResponse = await dispatch(activateRole({ id: role.id })).unwrap();
      toast({ title: response.message });
      closeActivateRoleDialogForm();
    } catch (error: any) {
      closeActivateRoleDialogForm();
      toast({ title: error, variant: "destructive" });
    }
  };

  return (
    <ActivateRoleDialogFormContext.Provider
      value={{ open: openDialog, openActivateRoleDialogForm, closeActivateRoleDialogForm }}
    >
      {children}

      {openDialog && (
        <AlertDialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          title={title}
          description={description}
          onClose={closeActivateRoleDialogForm}
          onConfirm={handleActivate}
          loading={loading.activateRole}
          cancelText={cancelText}
          confirmText={confirmText}
        />
      )}
    </ActivateRoleDialogFormContext.Provider>
  );
}
