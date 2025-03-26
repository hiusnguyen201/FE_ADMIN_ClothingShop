import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useFormik, FormikHelpers, FormikProps } from "formik";
import { cn } from "@/lib/utils";
import { LoadingButton } from "@/components/LoadingButton";
import { login, sendOtpViaEmail } from "@/redux/auth/auth.thunk";
import { InputFormikField } from "@/components/formik-fields";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/icons";
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
  const { isLoading } = useAppSelector<AuthState>((selector) => selector.auth);

  const handleSubmit = async (values: LoginPayload, { resetForm }: FormikHelpers<LoginPayload>) => {
    try {
      const { data }: LoginResponse = await dispatch(login(values)).unwrap();
      const user = data.user;
      resetForm();
      if (user && user.verifiedAt) {
        navigate("/");
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
    <form className={cn("flex flex-col gap-6", className)} onSubmit={formik.handleSubmit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">Enter your email below to login to your account</p>
      </div>

      <div className="grid gap-6">
        <InputFormikField label="Email" name="email" type="email" required formikProps={formik} />

        <InputFormikField label="Password" name="password" type="password" required formikProps={formik} />

        <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
          Forgot your password?
        </a>

        <LoadingButton loading={isLoading} disabled={isLoading}>
          Login
        </LoadingButton>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
        <Button variant="outline" className="w-full">
          <GoogleIcon />
          Login with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
}
