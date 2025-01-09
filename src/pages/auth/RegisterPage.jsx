import { BasicButton } from "@/components/basic-button";
import InputAndLabel from "@/components/input-and-label";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaEyeSlash, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { registerSchema } from "@/pages/auth/authShemas/registerSchema";
import { register } from "@/lib/slices/auth.slice";
import { useState } from "react";

export default function RegisterPage() {
  const { error, isLoading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (values, actions) => {
    dispatch(register(values));
    navigate("/auth/login");
    actions.resetForm();
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
    validationSchema: registerSchema,
    onSubmit,
  });
  return (
    <div className="flex h-full items-center p-4 lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email below to create your account
          </p>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <InputAndLabel
            label="Name"
            id="name"
            type="text"
            placeholder="Enter your name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={
              formik.errors.name && formik.touched.name
                ? "border-red-500 border-2"
                : "focus-visible:ring-1"
            }
          />
          {formik.errors.name && formik.touched.name && (
            <p className="text-red-500 text-sm text-muted-foreground">
              {formik.errors.name}
            </p>
          )}
          <InputAndLabel
            label="Email"
            id="email"
            type="email"
            placeholder="Enter your email"
            onChange={formik.handleChange}
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
          <div className="relative">
            <InputAndLabel
              label="Password"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={
                formik.errors.password && formik.touched.password
                  ? "border-red-500 border-2"
                  : "focus-visible:ring-1"
              }
            />
            <button type="button" onClick={toggleShowPassword}>
              {showPassword ? (
                <FaEyeSlash className="absolute right-3 top-10 cursor-pointer text-xl " />
              ) : (
                <FaEye className="absolute right-3 top-10 cursor-pointer text-xl " />
              )}
            </button>
          </div>
          <div className="relative">
            <InputAndLabel
              label="Confirm Password"
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Enter your confirm password"
              onChange={formik.handleChange}
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
            <button type="button" onClick={toggleShowConfirmPassword}>
              {showConfirmPassword ? (
                <FaEyeSlash className="absolute right-3 top-10 cursor-pointer text-xl " />
              ) : (
                <FaEye className="absolute right-3 top-10 cursor-pointer text-xl " />
              )}
            </button>
          </div>

          <InputAndLabel
            label="Phone Number"
            id="phone"
            type="text"
            placeholder="Enter your phone number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            className={
              formik.errors.phone && formik.touched.phone
                ? "border-red-500 border-2"
                : "focus-visible:ring-1"
            }
          />
          {formik.errors.phone && formik.touched.phone && (
            <p className="text-red-500 text-sm text-muted-foreground">
              {formik.errors.phone}
            </p>
          )}
          <button
            className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 mt-2 ml-auto w-full"
            type="submit"
            disabled={(isLoading, formik.isSubmitting)}
          >
            {isLoading ? (
              <Loader className="w-6 h-6 animate-spin" />
            ) : (
              "Sign up"
            )}
          </button>
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
