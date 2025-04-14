import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useFormik, FormikProps, FormikHelpers } from "formik";
import { cn } from "@/lib/utils";
import { LoadingButton } from "@/components/LoadingButton";
import { InputFormikField } from "@/components/formik-fields";
import { toast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { AuthState, LoginPayload } from "@/redux/auth/auth.type";
import { useAuth } from "@/hooks/use-auth";
import { useTimer } from "@/hooks/use-timer";
import { sendOtpViaEmail } from "@/redux/auth/auth.thunk";

const initialValues: LoginPayload = {
  email: "admin123@gmail.com",
  password: "1234",
};

const loginSchema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required(),
});

export function LoginForm({ className }: { className?: string }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { setEndTime, getRemainingSeconds } = useTimer();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector<AuthState>((selector) => selector.auth);

  const handleSubmit = async (values: LoginPayload, { resetForm }: FormikHelpers<LoginPayload>) => {
    try {
      await login?.(values);
      resetForm();

      if (!getRemainingSeconds()) {
        dispatch(sendOtpViaEmail({ email: values.email }));
        setEndTime(60);
      }

      toast({ title: "Please check your email to get OTP" });
      navigate("/verify-otp");
    } catch (err: any) {
      toast({ variant: "destructive", title: err.message });
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
      <InputFormikField label="Email" name="email" type="email" required formikProps={formik} />

      <InputFormikField label="Password" name="password" type="password" required formikProps={formik} />

      <LoadingButton loading={loading.login} disabled={loading.login}>
        Login
      </LoadingButton>
    </form>
  );
}
