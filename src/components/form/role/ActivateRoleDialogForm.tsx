import { createContext, ReactNode, useContext, useState } from "react";
import { AlertDialog } from "@/components/AlertDialog";
import { Role } from "@/types/role";
import { Button } from "@/components/ui/button";
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
  return (
    <Button variant="destructive" className="capitalize rounded text-white" onClick={openActivateRoleDialogForm}>
      {children}
    </Button>
  );
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
          onClose={() => setOpenDialog(false)}
          onConfirm={handleActivate}
          loading={loading.activateRole}
          cancelText={cancelText}
          confirmText={confirmText}
        />
      )}
    </ActivateRoleDialogFormContext.Provider>
  );
}
