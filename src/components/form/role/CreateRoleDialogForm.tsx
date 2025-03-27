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
import { CheckRoleNameExistResponse, CreateRolePayload, CreateRoleResponse, RoleState } from "@/redux/role/role.type";
import { checkRoleNameExistService } from "@/redux/role/role.service";

type CreateRoleDialogFormContextType = {
  open: boolean;
  openCreateRoleDialogForm: () => void;
  closeCreateRoleDialogForm: () => void;
};

const CreateRoleDialogFormContext = createContext<CreateRoleDialogFormContextType>({
  open: false,
  openCreateRoleDialogForm: () => {},
  closeCreateRoleDialogForm: () => {},
});

export const useCreateRoleDialogForm = () => useContext(CreateRoleDialogFormContext);

export const ButtonOpenCreateRoleDialog = ({ children }: { children?: ReactNode }) => {
  const { openCreateRoleDialogForm } = useCreateRoleDialogForm();
  return <Button onClick={openCreateRoleDialogForm}>{children}</Button>;
};

const initialValues: CreateRolePayload = {
  name: "",
  description: "",
  status: ROLE_STATUS.ACTIVE,
};

const createRoleSchema = Yup.object().shape({
  name: Yup.string()
    .required()
    .min(3)
    .max(50)
    .test("uniqueRoleName", "Role name already exist", async (name): Promise<boolean> => {
      const response: CheckRoleNameExistResponse = await checkRoleNameExistService({ name });
      return !response.data;
    }),
  description: Yup.string().required().min(3).max(255),
  status: Yup.string().required().oneOf(Object.values(ROLE_STATUS)),
});

export function CreateRoleDialogFormProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const { loading } = useAppSelector<RoleState>((selector) => selector.role);

  const openCreateRoleDialogForm = () => {
    setOpen(true);
  };

  const closeCreateRoleDialogForm = () => {
    setOpen(false);
  };

  const handleSubmit = async (values: CreateRolePayload, { resetForm }: FormikHelpers<CreateRolePayload>) => {
    try {
      const response: CreateRoleResponse = await dispatch(createRole(values)).unwrap();
      resetForm({});
      const { data: role, message } = response;
      toast({ title: message });
      navigate(`/roles/${role.id}/settings`);
    } catch (error: any) {
      toast({ variant: "destructive", title: error });
    }
  };

  return (
    <CreateRoleDialogFormContext.Provider value={{ open, openCreateRoleDialogForm, closeCreateRoleDialogForm }}>
      {children}

      {open && (
        <CreateDialogForm
          title="New Role"
          open={open}
          onClose={closeCreateRoleDialogForm}
          initialValues={initialValues}
          validationSchema={createRoleSchema}
          onSubmit={handleSubmit}
          loading={loading.createRole}
        >
          {(formik: ReturnType<typeof useFormik<CreateRolePayload>>) => (
            <Fragment>
              <InputFormikField name="name" type="text" label="Name" required formikProps={formik} />

              <InputFormikField name="description" type="text" label="Description" required formikProps={formik} />
            </Fragment>
          )}
        </CreateDialogForm>
      )}
    </CreateRoleDialogFormContext.Provider>
  );
}
