import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useFormik, FormikHelpers, FormikProps } from "formik";
import { cn } from "@/lib/utils";
import { LoadingButton } from "@/components/LoadingButton";
import { login, sendOtpViaEmail } from "@/redux/auth/auth.thunk";
import { InputFormikField } from "@/components/formik-fields";
import { toast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { AuthState, LoginResponse, LoginPayload } from "@/redux/auth/auth.type";

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
  const { loading } = useAppSelector<AuthState>((selector) => selector.auth);

  const handleSubmit = async (values: LoginPayload, { resetForm }: FormikHelpers<LoginPayload>) => {
    try {
      const response: LoginResponse = await dispatch(login(values)).unwrap();
      const user = response.data.user;
      resetForm({});
      if (user && user.verifiedAt) {
        navigate("/");
        toast({ title: "Login successful" });
      } else {
        dispatch(sendOtpViaEmail({ email: user.email }));
        navigate("/verify-otp");
      }
    } catch (error: any) {
      toast({ variant: "destructive", title: error });
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

      <Link to="/forgot-password" className="ml-auto text-sm underline-offset-4 hover:underline">
        Forgot your password?
      </Link>

      <LoadingButton loading={loading.login} disabled={!formik.isValid || loading.login}>
        Login
      </LoadingButton>
    </form>
  );
}
