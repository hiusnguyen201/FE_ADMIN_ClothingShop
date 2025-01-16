import { BasicButton } from "@/components/basic-button";
import { Loader } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { verifyOtpSchema } from "@/pages/auth/authShemas/verifyOtpSchema";
import { verifyOtp } from "@/lib/slices/auth.slice";
import { useToast } from "@/hooks/use-toast";

export default function VerifyOtpPage() {
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    user,
    error,
    isLoading,
    isAuthenticated,
    is2FactorRequired,
    accessToken,
  } = useSelector((state) => state.auth);

  const storedUser = localStorage.getItem("user");
  const parsedUser = JSON.parse(storedUser);
  const emailUser = parsedUser?.email || "";
  const typeUser = parsedUser?.type || "";
  const formik = useFormik({
    initialValues: {
      otp: "",
      email: emailUser,
      type: typeUser,
    },
    validationSchema: verifyOtpSchema,
    onSubmit: (values) => {
      dispatch(
        verifyOtp({
          otp: values.otp,
          email: values.email,
        })
      ).then((resultAction) => {
        if (verifyOtp.fulfilled.match(resultAction)) {
          setErrorMessage(null);
        } else {
          switch (resultAction.payload.status) {
            case 401:
              setErrorMessage("otp does not fail or has expired");
              break;
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
      });
    },
  });
  const handleChange = (value, index) => {
    const currentOtp = formik.values.otp.split("");
    currentOtp[index] = value;
    formik.setFieldValue("otp", currentOtp.join(""));
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace navigation
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !formik.values.otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    if (!user) return;
    if (isAuthenticated && !is2FactorRequired && accessToken) {
      if (formik.values.type === "Customer") {
        navigate("/");
      } else {
        navigate("/admin/dashboard");
      }
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
          <div className="flex space-x-2 px-2 pb-3">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                className="w-12 h-12 text-center text-lg border rounded focus:outline-none"
                value={formik.values.otp[index] || ""}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
          {formik.errors.otp && (
            <p className="text-red-500 text-sm text-muted-foreground">
              {formik.errors.otp}
            </p>
          )}

          <BasicButton
            className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 ml-auto w-full disabled:opacity-75"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Loader className="w-6 h-6 animate-spin" /> : "Login"}
          </BasicButton>
        </form>

        <span className="px-8 text-center text-sm text-muted-foreground">
          Come back Login Page?&nbsp;
          <Link
            to="/auth/register"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign up.
          </Link>
        </span>
      </div>
    </div>
  );
}
