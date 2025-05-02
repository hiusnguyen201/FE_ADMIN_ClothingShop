import { Link } from "react-router-dom";
import { BringToFront } from "lucide-react";
import { NavUser } from "@/components/layouts/NavUser";
import { useAuth } from "@/hooks/use-auth";
import { BusinessNotification } from "@/components/layouts/BusinessNotification";

export function Header() {
  const { user } = useAuth();
  return (
    <header className="bg-black z-[50] left-0 right-0 fixed top-0 w-full px-2 flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center">
        <Link to={"/"} className="flex h-12 items-center gap-2 text-white px-6">
          <BringToFront className="h-6 w-6" />
          <span className="font-bold">Fashion</span>
        </Link>
      </div>

      {user && (
        <div className="flex items-center gap-3">
          <BusinessNotification />
          <NavUser user={user} />
        </div>
      )}
    </header>
  );
}
