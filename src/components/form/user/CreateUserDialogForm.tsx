import * as Yup from "yup";
import { FormikHelpers, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Fragment, ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { CreateDialogForm } from "@/components/dialog-form";
import { InputFormikField, SelectBoxFormikField } from "@/components/formik-fields";
import { toast } from "@/hooks/use-toast";
import { checkEmailExist, createUser } from "@/redux/user/user.thunk";
import { CheckEmailExistResponse, CreateUserPayload, CreateUserResponse, UserState } from "@/redux/user/user.type";
import { GENDER } from "@/types/user";
import { REGEX_PATTERNS } from "@/types/constant";

const initialValues: CreateUserPayload = {
  name: "",
  email: "",
  phone: "",
  gender: "",
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
      errors.name = "Email already exists";
    }

    return errors;
  };

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
    >
      {(formik: ReturnType<typeof useFormik<CreateUserPayload>>) => (
        <Fragment>
          <InputFormikField autoFocus name="name" type="text" label="Name" required formikProps={formik} />

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
        </Fragment>
      )}
    </CreateDialogForm>
  );
}
