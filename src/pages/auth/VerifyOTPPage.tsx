import { VerifyOTPForm } from "@/components/form/auth/VerifyOTPForm";
import { Link, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export function VerifyOTPPage() {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Verify Your Account</h1>
        <p className="text-balance text-sm text-muted-foreground">Enter the verification code we sent to your email</p>
      </div>
      <div className="grid gap-6">
        <VerifyOTPForm user={user} />

        <div className="flex items-center">
          <Link to="/login" className="inline-flex items-center gap-2 text-sm">
            <ArrowLeft size={16} />
            <span>Back to Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
