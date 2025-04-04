import * as Yup from "yup";
import { FormikHelpers, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Fragment, ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { CreateDialogForm } from "@/components/dialog-form";
import { InputFormikField } from "@/components/formik-fields";
import { toast } from "@/hooks/use-toast";
import { checkRoleNameExist, createRole } from "@/redux/role/role.thunk";
import { CheckRoleNameExistResponse, CreateRolePayload, CreateRoleResponse, RoleState } from "@/redux/role/role.type";

const initialValues: CreateRolePayload = {
  name: "",
  description: "",
};

const createRoleSchema = Yup.object().shape({
  name: Yup.string().required().min(3).max(50),
  description: Yup.string().required().min(3).max(255),
});

type CreateRoleDialogFormProps = {
  children?: ReactNode;
  open?: false;
  onOpenChange?: (value: boolean) => void;
};

export function CreateRoleDialogForm({ children, open, onOpenChange }: CreateRoleDialogFormProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector<RoleState>((selector) => selector.role);

  const handleSubmit = async (values: CreateRolePayload, { resetForm }: FormikHelpers<CreateRolePayload>) => {
    try {
      const response: CreateRoleResponse = await dispatch(createRole(values)).unwrap();
      resetForm();
      const { data: role, message } = response;
      toast({ title: message });
      navigate(`/roles/${role.id}/settings`);
    } catch (error: any) {
      toast({ variant: "destructive", title: error });
    }
  };

  const checkUniqueName = async (values: CreateRolePayload) => {
    const errors: { [key: string]: string } = {};

    const response: CheckRoleNameExistResponse = await dispatch(checkRoleNameExist({ name: values.name })).unwrap();
    if (response.data) {
      errors.name = "Role name already exists";
    }

    return errors;
  };

  return (
    <CreateDialogForm
      title="New Role"
      open={open}
      trigger={children}
      onOpenChange={onOpenChange}
      initialValues={initialValues}
      validationSchema={createRoleSchema}
      extendSchema={checkUniqueName}
      onSubmit={handleSubmit}
      loading={loading.checkRoleNameExist || loading.createRole}
    >
      {(formik: ReturnType<typeof useFormik<CreateRolePayload>>) => (
        <Fragment>
          <InputFormikField name="name" type="text" label="Name" required formikProps={formik} />

          <InputFormikField name="description" type="text" label="Description" required formikProps={formik} />
        </Fragment>
      )}
    </CreateDialogForm>
  );
}
