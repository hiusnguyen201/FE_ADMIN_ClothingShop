import { LoginForm } from "@/components/form/auth/LoginForm";
import { GoogleIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block bg-zinc-900"></div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                  Enter your email below to login to your account
                </p>
              </div>
              <div className="grid gap-6">
                <LoginForm />

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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
