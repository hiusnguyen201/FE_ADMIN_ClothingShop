import * as Yup from "yup";
import { FormikHelpers, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Fragment, ReactNode, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { CreateDialogForm } from "@/components/dialog-form";
import { InputFormikField, SelectBoxFormikField, SelectObjectFormikField } from "@/components/formik-fields";
import { toast } from "@/hooks/use-toast";
import { checkEmailExist, createUser } from "@/redux/user/user.thunk";
import { CheckEmailExistResponse, CreateUserPayload, CreateUserResponse, UserState } from "@/redux/user/user.type";
import { GENDER } from "@/types/user";
import { REGEX_PATTERNS } from "@/types/constant";
import { getListRole } from "@/redux/role/role.thunk";
import { RoleState } from "@/redux/role/role.type";

const initialValues: CreateUserPayload = {
  name: "",
  email: "",
  phone: "",
  gender: "",
  roleId: null,
};

const createUserSchema = Yup.object().shape({
  name: Yup.string().required().min(3).max(50),
  email: Yup.string().required().email(),
  phone: Yup.string()
    .required()
    .matches(REGEX_PATTERNS.PHONE_NUMBER["VN"], { message: "phone is not Vietnam phone number" }),
  gender: Yup.string()
    .required()
    .oneOf([...Object.values(GENDER)], { message: "gender is required" }),
  roleId: Yup.string().nullable().optional(),
});

type CreateUserDialogFormProps = {
  children?: ReactNode;
  open?: false;
  onOpenChange?: (value: boolean) => void;
};

export function CreateUserDialogForm({ children, open, onOpenChange }: CreateUserDialogFormProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector<UserState>((selector) => selector.user);
  const { list: listRole } = useAppSelector<RoleState>((selector) => selector.role);
  const [openSelectRole, setOpenSelectRole] = useState(false);

  const handleSubmit = async (values: CreateUserPayload, { resetForm }: FormikHelpers<CreateUserPayload>) => {
    try {
      const response: CreateUserResponse = await dispatch(createUser(values)).unwrap();
      resetForm();
      const { data: user, message } = response;
      toast({ title: message });
      navigate(`/users/${user.id}/settings`);
    } catch (error: any) {
      toast({ variant: "destructive", title: error });
    }
  };

  const checkUniqueEmail = async (values: CreateUserPayload) => {
    const errors: { [key: string]: string } = {};

    const response: CheckEmailExistResponse = await dispatch(checkEmailExist({ email: values.email })).unwrap();
    if (response.data) {
      errors.email = "Email already exists";
    }

    return errors;
  };

  useEffect(() => {
    (async () => {
      await dispatch(getListRole({ page: 1, limit: 100 })).unwrap();
    })();
  }, []);

  return (
    <CreateDialogForm
      title="Create User"
      open={open}
      trigger={children}
      onOpenChange={onOpenChange}
      initialValues={initialValues}
      validationSchema={createUserSchema}
      extendSchema={checkUniqueEmail}
      onSubmit={handleSubmit}
      loading={loading.checkEmailExist || loading.createUser}
      disableClose={openSelectRole}
    >
      {(formik: ReturnType<typeof useFormik<CreateUserPayload>>) => (
        <Fragment>
          <InputFormikField name="name" type="text" label="Name" required formikProps={formik} />

          <InputFormikField name="email" type="email" label="Email" required formikProps={formik} />

          <InputFormikField name="phone" type="tel" label="Phone" required formikProps={formik} />

          <SelectBoxFormikField
            name="gender"
            type="radio"
            label="Gender"
            options={Object.values(GENDER)}
            required
            formikProps={formik}
          />

          <SelectObjectFormikField
            switchable
            open={openSelectRole}
            onOpenChange={setOpenSelectRole}
            label="Role"
            placeHolder="Select a role"
            name="roleId"
            options={listRole.map((item) => ({ value: item.id, title: item.name }))}
            formikProps={formik}
          />
        </Fragment>
      )}
    </CreateDialogForm>
  );
}
