import { BasicButton } from "@/components/basic-button";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader } from "lucide-react";
import { useFormik } from "formik";
import { useEffect } from "react";
import { MdOutlineMailLock } from "react-icons/md";

export default function SendForgotPasswordPage() {
  const { isLoading, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const emailUser = user.email || "";
  const formik = useFormik({
    initialValues: {
      email: emailUser,
    },
    onSubmit: async () => {
      navigate("/auth/login");
    },
  });
  // useEffect(() => {
  //   if (!formik.values.email) {
  //     navigate("auth/login");
  //     return;
  //   }
  // }, [formik.values.email]);
  return (
    <div className="flex h-full items-center p-4 lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Reset Password
          </h1>
          <MdOutlineMailLock className="mx-auto w-20 h-20" />
          <p className="text-ml text-muted-foreground">
            Verification code has been sent to email
          </p>
          <p className="text-ml text-muted-foreground text-red-500">
            {formik.values.email}
          </p>
          <p className="text-ml text-muted-foreground">Please veirfy</p>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <BasicButton
            className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 mt-2 ml-auto w-full disabled:opacity-75"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Loader className="w-6 h-6 animate-spin" /> : "Ok"}
          </BasicButton>
        </form>
      </div>
    </div>
  );
}
