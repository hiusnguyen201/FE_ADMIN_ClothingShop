import { NavUser } from "@/components/layouts/NavUser";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeft } from "lucide-react";

export function Header() {
  const { toggleSidebar, isMobile } = useSidebar();

  return (
    <header className="px-2 border-b flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div>
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="border-t  w-full p-4 h-auto justify-end"
            onClick={toggleSidebar}
          >
            <PanelLeft />
          </Button>
        )}
      </div>

      <div>
        <NavUser />
      </div>
    </header>
  );
}
