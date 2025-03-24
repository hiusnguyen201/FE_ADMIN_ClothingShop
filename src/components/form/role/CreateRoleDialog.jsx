import * as Yup from "yup";
import { createContext, Fragment, useContext, useState } from "react";
import { CreateDialogForm } from "@/components/dialog-form";
import { InputField } from "@/components/formik-fields";
import { Button } from "@/components/ui/button";
import { ROLE_STATUS } from "@/constants/role";
import { toast } from "@/hooks/use-toast";
import { createRole } from "@/redux/role/role.slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: "",
  description: "",
  status: ROLE_STATUS.ACTIVE,
};

const createRoleSchema = Yup.object().shape({
  name: Yup.string().required().min(3).max(50),
  description: Yup.string().required().min(3).max(255),
  status: Yup.string().required().oneOf(Object.values(ROLE_STATUS)),
});

const CreateRoleDialogContext = createContext();

export function CreateRoleDialogProvider({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { isLoading } = useSelector((selector) => selector.role);

  const openCreateRoleDialog = () => {
    setOpen(true);
  };

  const closeCreateRoleDialog = () => {
    setOpen(false);
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const data = await dispatch(createRole(values)).unwrap();
      resetForm();
      const { data: role, message } = data;
      toast({ title: message });
      navigate("/roles/" + role.slug);
    } catch (error) {
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
          {(formikProps) => (
            <Fragment>
              <InputField name="name" type="text" label="Name" required {...formikProps} />

              <InputField name="description" type="text" label="Description" required {...formikProps} />
            </Fragment>
          )}
        </CreateDialogForm>
      )}
    </CreateRoleDialogContext.Provider>
  );
}

export const useCreateRoleDialog = () => useContext(CreateRoleDialogContext);

export const ButtonOpenCreateRoleDialog = ({ children }) => {
  const { openCreateRoleDialog } = useCreateRoleDialog();
  return <Button onClick={openCreateRoleDialog}>{children}</Button>;
};
