import { NavUser } from "@/components/layouts/NavUser";
import { Wallet } from "lucide-react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="bg-black z-[100] left-0 right-0 fixed top-0 w-full px-2 flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center">
        <Link to={"/"} className="flex h-12 items-center gap-2 text-white px-6">
          <Wallet className="h-6 w-6" />
          <span className="font-bold">Vaultify</span>
        </Link>
      </div>

      <div>
        <NavUser />
      </div>
    </header>
  );
}
