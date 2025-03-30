import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useFormik, FormikHelpers, FormikProps } from "formik";
import { cn } from "@/lib/utils";
import { LoadingButton } from "@/components/LoadingButton";
import { sendOtpViaEmail } from "@/redux/auth/auth.thunk";
import { InputFormikField } from "@/components/formik-fields";
import { toast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { AuthState, LoginPayload } from "@/redux/auth/auth.type";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";

const initialValues: LoginPayload = {
  email: "admin123@gmail.com",
  password: "1234",
};

const loginSchema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required(),
});

export function LoginForm({ className }: { className?: string }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { loading, user, error, isAuthenticated } = useAppSelector<AuthState>((selector) => selector.auth);

  useEffect(() => {
    if (error) {
      toast({ variant: "destructive", title: error });
    }
  }, [error]);

  const handleSubmit = async (values: LoginPayload, { resetForm }: FormikHelpers<LoginPayload>) => {
    if (!login) return;
    await login(values);
    if (!isAuthenticated || !user) return;

    resetForm({});

    if (user.verifiedAt) {
      toast({ title: "Login successful" });
      await navigate("/");
    } else {
      dispatch(sendOtpViaEmail({ email: user.email }));
      await navigate("/verify-otp");
    }
  };

  const formik: FormikProps<LoginPayload> = useFormik({
    initialValues,
    validationSchema: loginSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className={cn("grid gap-6", className)}>
      <InputFormikField
        label="Email"
        name="email"
        type="email"
        disabled={loading.login}
        required
        formikProps={formik}
      />

      <InputFormikField
        label="Password"
        name="password"
        type="password"
        disabled={loading.login}
        required
        formikProps={formik}
      />

      <LoadingButton loading={loading.login} disabled={!formik.isValid || loading.login}>
        Login
      </LoadingButton>
    </form>
  );
}
