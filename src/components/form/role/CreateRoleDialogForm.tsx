import * as Yup from "yup";
import { FormikHelpers, useFormik } from "formik";
import { Fragment, ReactNode, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { CreateDialogForm } from "@/components/dialog-form";
import { InputFormikField } from "@/components/formik-fields";
import { toast } from "@/hooks/use-toast";
import { checkRoleNameExist, createRole } from "@/redux/role/role.thunk";
import { CheckRoleNameExistResponse, CreateRolePayload, CreateRoleResponse, RoleState } from "@/redux/role/role.type";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
  const { loading } = useAppSelector<RoleState>((selector) => selector.role);
  const [internalOpen, setInternalOpen] = useState(false);

  const handleSubmit = async (values: CreateRolePayload, { resetForm }: FormikHelpers<CreateRolePayload>) => {
    try {
      const { data }: CreateRoleResponse = await dispatch(createRole(values)).unwrap();
      resetForm();
      toast({
        title: "Create role successful",
        action: (
          <Link to={`/roles/${data.id}/settings`}>
            <Button size="sm" className="underline h-8 gap-1">
              View Details
            </Button>
          </Link>
        ),
      });
      setInternalOpen(false);
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
      open={internalOpen}
      trigger={children}
      onOpenChange={setInternalOpen}
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
