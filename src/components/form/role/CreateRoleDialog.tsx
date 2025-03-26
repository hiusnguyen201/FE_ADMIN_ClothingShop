import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { createContext, Fragment, ReactNode, useContext, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { CreateDialogForm } from "@/components/dialog-form";
import { InputFormikField } from "@/components/formik-fields";
import { Button } from "@/components/ui/button";
import { ROLE_STATUS } from "@/types/role";
import { toast } from "@/hooks/use-toast";
import { createRole } from "@/redux/role/role.thunk";
import { CreateRolePayload, RoleState } from "@/redux/role/role.type";

type CreateRoleDialogContextType = {
  open: boolean;
  openCreateRoleDialog: () => void;
  closeCreateRoleDialog: () => void;
};

const CreateRoleDialogContext = createContext<CreateRoleDialogContextType>({
  open: false,
  openCreateRoleDialog: () => {},
  closeCreateRoleDialog: () => {},
});

const initialValues: CreateRolePayload = {
  name: "",
  description: "",
  status: ROLE_STATUS.ACTIVE,
};

const createRoleSchema = Yup.object().shape({
  name: Yup.string().required().min(3).max(50),
  description: Yup.string().required().min(3).max(255),
  status: Yup.string().required().oneOf(Object.values(ROLE_STATUS)),
});

export function CreateRoleDialogProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const { isLoading } = useAppSelector<RoleState>((selector) => selector.role);

  const openCreateRoleDialog = () => {
    setOpen(true);
  };

  const closeCreateRoleDialog = () => {
    setOpen(false);
  };

  const handleSubmit = async (values: CreateRolePayload, { resetForm }: FormikHelpers<CreateRolePayload>) => {
    try {
      const data = await dispatch(createRole(values)).unwrap();
      resetForm();
      const { data: role, message } = data;
      toast({ title: message });
      navigate("/roles/" + role.slug);
    } catch (error: any) {
      toast({ variant: "destructive", title: error });
    }
  };

  return (
    <CreateRoleDialogContext.Provider value={{ open, openCreateRoleDialog, closeCreateRoleDialog }}>
      {children}

      {open && (
        <CreateDialogForm
          title="New Role"
          open={open}
          onClose={closeCreateRoleDialog}
          initialValues={initialValues}
          validationSchema={createRoleSchema}
          onSubmit={handleSubmit}
          loading={isLoading}
        >
          {(formik: ReturnType<typeof useFormik<CreateRolePayload>>) => (
            <Fragment>
              <InputFormikField name="name" type="text" label="Name" required formikProps={formik} />

              <InputFormikField name="description" type="text" label="Description" required formikProps={formik} />
            </Fragment>
          )}
        </CreateDialogForm>
      )}
    </CreateRoleDialogContext.Provider>
  );
}

export const useCreateRoleDialog = () => useContext(CreateRoleDialogContext);

export const ButtonOpenCreateRoleDialog = ({ children }: { children?: ReactNode }) => {
  const { openCreateRoleDialog } = useCreateRoleDialog();
  return <Button onClick={openCreateRoleDialog}>{children}</Button>;
};
