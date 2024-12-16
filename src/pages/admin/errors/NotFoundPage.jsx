import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="absolute left-1/2 top-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center">
        <span className="bg-gradient-to-b from-foreground to-transparent bg-clip-text text-[10rem] font-extrabold leading-none text-transparent">
          404
        </span>
        <h2 className="font-heading my-2 text-2xl font-bold">
          Something's missing
        </h2>
        <p>
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8 flex justify-center gap-2">
          <button
            onClick={navigate(-1)}
            className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 rounded-md px-8"
          >
            Go back
          </button>
          <Link to={"/admin"}>
            <button className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 rounded-md px-8">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
