import * as Yup from "yup";
import { User } from "@/types/user";
import { ChangePasswordPayload, AccountState } from "@/redux/account/account.type";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { changePassword } from "@/redux/account/account.thunk";
import { FormikHelpers, FormikProps, useFormik } from "formik";
import { toast } from "@/hooks/use-toast";
import { InputFormikField } from "@/components/formik-fields";
import { LoadingButton } from "@/components/LoadingButton";
import { FlexBox } from "@/components/FlexBox";

const changePasswordSchema = Yup.object().shape({
  password: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .required("New password is required")
    .min(4, "New password must be at least 4 characters")
    .max(50, "New password cannot exceed 50 characters"),
  confirmNewPassword: Yup.string()
    .required("Please confirm your new password")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});

export function ChangePasswordForm({ account }: { account: User }) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector<AccountState>((selector) => selector.account);

  const initialValues: ChangePasswordPayload = {
    id: account.id,
    password: "",
    confirmNewPassword: "",
    newPassword: "",
  };

  const handleSubmit = async (values: ChangePasswordPayload, { resetForm }: FormikHelpers<ChangePasswordPayload>) => {
    try {
      await dispatch(changePassword(values)).unwrap();
      resetForm();
      toast({ title: "Change password successful" });
    } catch (error: any) {
      toast({ variant: "destructive", title: error });
    }
  };

  const formik: FormikProps<ChangePasswordPayload> = useFormik({
    initialValues,
    validationSchema: changePasswordSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <FlexBox size="large" onSubmit={formik.handleSubmit} component="form" className="max-w-[600px]">
      <InputFormikField label="Password" name="password" type="password" required formikProps={formik} />
      <InputFormikField label="New password" name="newPassword" type="password" required formikProps={formik} />
      <InputFormikField
        label="Confirm password"
        name="confirmNewPassword"
        type="password"
        required
        formikProps={formik}
      />

      <div className="flex items-center justify-end w-full">
        <LoadingButton type="submit" loading={loading.changePassword} disabled={loading.changePassword}>
          Change
        </LoadingButton>
      </div>
    </FlexBox>
  );
}
