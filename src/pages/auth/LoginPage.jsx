import { BasicButton } from "@/components/basic-button";
import InputAndLabel from "@/components/input-and-label";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "lucide-react";
import { login } from "@/lib/slices/auth.slice";
import { useFormik } from "formik";
import { loginSchema } from "@/pages/auth/authShemas/loginSchema";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const { isLoading, error, isAuthenticated, is2FactorRequired, user } =
    useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: async (values) => {
      dispatch(login(values));
    },
  });

  useEffect(() => {
    if (!error) {
      setErrorMessage(null);
    } else {
      switch (error.status) {
        case 401:
          setErrorMessage("Incorrect email or password");
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
    if (!isAuthenticated && is2FactorRequired) {
      navigate("/auth/verify-otp");
    } else if (isAuthenticated && !is2FactorRequired) {
      navigate("/admin/dashboard");
    }
  }, [user]);

  return (
    <div className="flex h-full items-center p-4 lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email below to login your account
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

          <Link
            to="/auth/forgot-password"
            className="flex py-3 underline underline-offset-4 hover:text-primary text-sm text-muted-foreground"
          >
            Forgot password?
          </Link>

          <BasicButton
            className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 ml-auto w-full disabled:opacity-75"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="w-6 h-6 animate-spin" />
            ) : (
              "Login"
            )}
          </BasicButton>
        </form>
        <span className="px-8 text-center text-sm text-muted-foreground">
          Don't have an account?&nbsp;
          <Link
            to="/auth/register"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign up.
          </Link>
        </span>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <button
          className="
          inline-flex
          items-center
          justify-center
          rounded-md
          text-sm
          font-medium
          focus-visible:outline-none
          focus-visible:ring-1
          focus-visible:ring-ring
          disabled:pointer-events-none
          disabled:opacity-50
          border
          border-input
          bg-transparent
          shadow-sm
          hover:bg-accent
          hover:text-accent-foreground
          h-9
          px-4
          py-2
          w-full"
        >
          <FcGoogle className="mr-2 w-4 h-4" />
          Continue with Google
        </button>
        <button
          className="
          inline-flex
          items-center
          justify-center
          rounded-md
          text-sm
          font-medium
          transition-colors
          focus-visible:outline-none
          focus-visible:ring-1
          focus-visible:ring-ring
          disabled:pointer-events-none
          disabled:opacity-50
          border
          border-input
          bg-transparent
          shadow-sm
          hover:bg-accent
          hover:text-accent-foreground
          h-9
          px-4
          py-2
          w-full"
        >
          <FaFacebook className="mr-2 w-4 h-4 text-sky-500" />
          Continue with Facebook
        </button>
        <span className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our&nbsp;
          <Link
            to="/auth/terms-of-service"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>
          &nbsp;and&nbsp;
          <Link
            to="/auth/privacy-policy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </span>
      </div>
    </div>
  );
}
