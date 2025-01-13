import { BasicButton } from "@/components/basic-button";
import InputAndLabel from "@/components/input-and-label";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "lucide-react";
import { useFormik } from "formik";
import { forgotPasswordSchema } from "@/pages/auth/authShemas/forgotPasswordSchema";
import { useEffect, useState } from "react";
import { forgotPassword } from "@/lib/slices/auth.slice";
import { useToast } from "@/hooks/use-toast";

export default function ForgotPasswordPage() {
  const { isLoading, error, user } = useSelector((state) => state.auth);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const formik = useFormik({
    initialValues: {
      email: "",
      callbackUrl: import.meta.env.VITE_CALLBACKURL + "/auth/reset-password",
    },
    validationSchema: forgotPasswordSchema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: async (values) => {
      console.log(urlParams);
      dispatch(
        forgotPassword({
          email: values.email,
          callbackUrl: values.callbackUrl,
        })
      );
    },
  });
  useEffect(() => {
    if (!error) {
      setErrorMessage(null);
    } else {
      switch (error.status) {
        case 404:
          setErrorMessage("User not found");
          break;
        default:
          setErrorMessage("");
          toast({
            title: "Internal Server Error",
            variant: "destructive",
          });
      }
    }
  }, [error]);
  useEffect(() => {
    if (!user) return;
    if (user.email) {
      navigate("/auth/send-forgot-password-success");
    }
  }, [user]);
  return (
    <div className="flex h-full items-center p-4 lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Forgot Password
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email below to reset your password
          </p>
        </div>
        {errorMessage && (
          <p className="text-white p-3 text-sm text-muted-foreground bg-red-500 rounded">
            {errorMessage}
          </p>
        )}
        <form onSubmit={formik.handleSubmit}>
          <InputAndLabel
            label="Email"
            id="email"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => {
              formik.handleChange(e);
              formik.setFieldTouched("email", true);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={
              formik.errors.email && formik.touched.email
                ? "border-red-500 border-2"
                : "focus-visible:ring-1"
            }
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-500 text-sm text-muted-foreground">
              {formik.errors.email}
            </p>
          )}
          <BasicButton
            className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 mt-2 ml-auto w-full disabled:opacity-75"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Loader className="w-6 h-6 animate-spin" /> : "Send"}
          </BasicButton>
        </form>
        <span className="px-8 text-center text-sm text-muted-foreground">
          Already have an anccount?&nbsp;
          <Link
            to="/auth/register"
            className="underline underline-offset-4 hover:text-primary"
          >
            Login.
          </Link>
        </span>
      </div>
    </div>
  );
}
