import { BasicButton } from "@/components/basic-button";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isLoading, isVerified } = useSelector((state) => state.auth);
  const handleChange = (value, index) => {
    const newOtp = [...otp];

    if (value.length > 1) {
      const pastedOtp = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newOtp[i] = pastedOtp[i] || "";
      }
      setOtp(newOtp);

      const lastFilledIndex = newOtp.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const verifyOtp = otp.join("");
    console.log("verifited");
    // navigate("/");
  };
  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [otp]);
  return (
    <div className="flex h-full items-center p-4 lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Verify Your Email
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit otp sent to your email address
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="6"
                className="w-12 h-12 text-center text-lg border rounded focus:outline-none"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
        </form>
        {error && (
          <p className="text-red-500 text-sm text-muted-foreground">
            {error?.message}
          </p>
        )}
        <BasicButton
          className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 ml-auto w-full"
          children="Verify Email"
        />
        <span className="px-8 text-center text-sm text-muted-foreground">
          Don't have an account?&nbsp;
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
