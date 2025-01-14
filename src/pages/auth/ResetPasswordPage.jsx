import { BasicButton } from "@/components/basic-button";
import InputAndLabel from "@/components/input-and-label";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "lucide-react";
import { useFormik } from "formik";
import { resetPasswordSchema } from "@/pages/auth/authShemas/resetPasswordSchema";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { resetPassword } from "@/lib/slices/auth.slice";

export default function ResetPasswordPage() {
  const { isLoading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: async (values) => {
      dispatch(resetPassword(values)).then((resultAction) => {
        if (resetPassword.fulfilled.match(resultAction)) {
          setErrorMessage(null);
          navigate("/auth/login");
        } else {
          switch (resultAction.payload.status) {
            case 401:
              setErrorMessage("Invalid or expired token");
              break;
            default:
              setErrorMessage("");
              toast({
                title: "Internal Server Error",
                variant: "destructive",
              });
          }
        }
      });
    },
  });

  return (
    <div className="flex h-full items-center p-4 lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Reset Password
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your new password below to change your password
          </p>
        </div>
        {errorMessage && (
          <p className="text-white p-3 text-sm text-muted-foreground bg-red-500 rounded">
            {errorMessage}
          </p>
        )}
        <form onSubmit={formik.handleSubmit}>
          <div className="relative my-2">
            <InputAndLabel
              label="Password"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              onChange={(e) => {
                formik.handleChange(e);
                formik.setFieldTouched("password", true);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={
                formik.errors.password && formik.touched.password
                  ? "border-red-500 border-2"
                  : "focus-visible:ring-1"
              }
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-500 text-sm text-muted-foreground">
                {formik.errors.password}
              </p>
            )}
            <button
              className="absolute right-3 top-10 cursor-pointer text-xl"
              type="button"
              onClick={toggleShowPassword}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="relative my-2">
            <InputAndLabel
              label="Confirm Password"
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Enter your confirm password"
              onChange={(e) => {
                formik.handleChange(e);
                formik.setFieldTouched("confirmPassword", true);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className={
                formik.errors.confirmPassword && formik.touched.confirmPassword
                  ? "border-red-500 border-2"
                  : "focus-visible:ring-1"
              }
            />
            {formik.errors.confirmPassword &&
              formik.touched.confirmPassword && (
                <p className="text-red-500 text-sm text-muted-foreground">
                  {formik.errors.confirmPassword}
                </p>
              )}
            <button
              className="absolute right-3 top-10 cursor-pointer text-xl"
              type="button"
              onClick={toggleShowConfirmPassword}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <BasicButton
            className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 mt-2 ml-auto w-full disabled:opacity-75"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Loader className="w-6 h-6 animate-spin" /> : "Login"}
          </BasicButton>
        </form>
        <span className="px-8 text-center text-sm text-muted-foreground">
          Already have an anccount?&nbsp;
          <Link
            to="/auth/login"
            className="underline underline-offset-4 hover:text-primary"
          >
            Login.
          </Link>
        </span>
      </div>
    </div>
  );
}
