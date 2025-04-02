import * as Yup from "yup";
import { GENDER, User } from "@/types/user";
import { CheckEmailExistResponse, EditUserInfoPayload, EditUserInfoResponse, UserState } from "@/redux/user/user.type";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { checkEmailExist, editUserInfo } from "@/redux/user/user.thunk";
import { FormikHelpers, FormikProps, useFormik } from "formik";
import { toast } from "@/hooks/use-toast";
import { InputFormikField, SelectBoxFormikField } from "@/components/formik-fields";
import { LoadingButton } from "@/components/LoadingButton";
import { FlexBox } from "@/components/FlexBox";
import { REGEX_PATTERNS } from "@/types/constant";

const editUserInfoSchema = Yup.object().shape({
  name: Yup.string().required().min(3).max(50),
  email: Yup.string().required().email(),
  phone: Yup.string()
    .required()
    .matches(REGEX_PATTERNS.PHONE_NUMBER["VN"], { message: "phone is not Vietnam phone number" }),
  gender: Yup.string()
    .required()
    .oneOf([...Object.values(GENDER)], { message: "gender is required" }),
});

export function EditUserInfoForm({ user }: { user: User }) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector<UserState>((selector) => selector.user);

  const initialValues: EditUserInfoPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    gender: user.gender,
  };

  const handleSubmit = async (values: EditUserInfoPayload, { resetForm }: FormikHelpers<EditUserInfoPayload>) => {
    try {
      const response: EditUserInfoResponse = await dispatch(editUserInfo(values)).unwrap();
      resetForm({ values: { ...values, ...response.data } });
      toast({ title: response.message });
    } catch (error: any) {
      toast({ variant: "destructive", title: error });
    }
  };

  const checkUniqueEmail = async (values: EditUserInfoPayload) => {
    if (!values.email || values.email === initialValues.email) return;
    const errors: { [key: string]: string } = {};

    const response: CheckEmailExistResponse = await dispatch(checkEmailExist({ email: values.email })).unwrap();
    if (response.data) {
      errors.email = "Email already exists";
    }

    return errors;
  };

  const formik: FormikProps<EditUserInfoPayload> = useFormik({
    initialValues,
    validationSchema: editUserInfoSchema,
    validateOnChange: false,
    validateOnBlur: false,
    validate: checkUniqueEmail,
    onSubmit: handleSubmit,
  });

  return (
    <FlexBox size="large" onSubmit={formik.handleSubmit} component="form" className="max-w-[600px]">
      <FlexBox>
        <InputFormikField label="Name" name="name" type="text" required formikProps={formik} />

        <InputFormikField label="Email" name="email" type="email" required formikProps={formik} />

        <InputFormikField label="Phone" name="phone" type="tel" required formikProps={formik} />

        <SelectBoxFormikField
          name="gender"
          type="radio"
          label="Gender"
          options={Object.values(GENDER)}
          required
          formikProps={formik}
        />
      </FlexBox>

      <LoadingButton loading={loading.editUser} disabled={loading.editUser}>
        Save
      </LoadingButton>
    </FlexBox>
  );
}
