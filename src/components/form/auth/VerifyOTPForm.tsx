import * as Yup from "yup";
import { InputFormikField } from "@/components/formik-fields";
import { LoadingButton } from "@/components/LoadingButton";
import { AuthState, VerifyOtpPayload } from "@/redux/auth/auth.type";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { FormikHelpers, FormikProps, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { sendOtpViaEmail } from "@/redux/auth/auth.thunk";
import { CountdownTimer } from "@/components/ui/countdown-timer";
import { toast } from "@/hooks/use-toast";
import { User } from "@/types/user";
import { REGEX_PATTERNS } from "@/types/constant";

const verifyOtpSchema = Yup.object().shape({
  otp: Yup.string().required().trim().matches(REGEX_PATTERNS.OTP, "OTP must be a 6-digit number"),
});

export function VerifyOTPForm({ user }: { user: User }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector<AuthState>((selector) => selector.auth);
  const { verifyOtp } = useAuth();

  const handleSubmit = async (values: VerifyOtpPayload, { resetForm }: FormikHelpers<VerifyOtpPayload>) => {
    try {
      await verifyOtp(values);
      resetForm();
      toast({ title: "Login successful" });
      navigate("/");
    } catch (err: any) {
      toast({ title: err.message || "Verify OTP failed", variant: "destructive" });
    }
  };

  const formik: FormikProps<VerifyOtpPayload> = useFormik({
    initialValues: {
      otp: "",
      userId: user.id || "",
    },
    validationSchema: verifyOtpSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  const handleResendOTP = async () => {
    await dispatch(sendOtpViaEmail({ email: user.email })).unwrap();
    toast({ title: "Resend successful" });
  };

  return (
    <form onSubmit={formik.handleSubmit} className="grid gap-6">
      <div>
        <InputFormikField
          name="otp"
          label="Verification Code"
          type="text"
          placeholder="Enter your one-time code"
          formikProps={formik}
        />

        <CountdownTimer disabled={loading.sendOtpViaEmail} onClickAgain={handleResendOTP} />
      </div>

      <LoadingButton loading={loading.verifyOtp} disabled={loading.verifyOtp}>
        Verify Account
      </LoadingButton>
    </form>
  );
}
