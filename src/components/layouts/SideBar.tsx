import { Sidebar, SidebarContent, SidebarFooter, useSidebar } from "@/components/ui/sidebar";
import { NavMain } from "@/components/layouts/NavMain";
import { navData } from "./nav-data";
import { Button } from "@/components/ui/button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { forwardRef, LegacyRef } from "react";
import { cn } from "@/lib/utils";

export const SideBar = forwardRef(
  ({ className }: { className?: string }, ref: LegacyRef<HTMLDivElement> | undefined) => {
    const { open, setOpen } = useSidebar();

    return (
      <Sidebar ref={ref} collapsible="icon" className={cn(className)}>
        <SidebarContent className="py-6 px-4 overflow-x-hidden bg-white">
          <NavMain items={navData.navMainGroupApp} />
          {/* <NavProjects projects={navData.projects} /> */}
        </SidebarContent>

        <SidebarFooter className="p-0 bg-white flex items-center justify-center">
          <Button
            variant="ghost"
            className="border-t p-4 w-full h-auto justify-end [&_svg]:size-5"
            onClick={() => setOpen(!open)}
          >
            <span className="w-8 h-8 flex items-center justify-center">
              {open ? <ChevronsLeft /> : <ChevronsRight />}
            </span>
          </Button>
        </SidebarFooter>

        {/* <SidebarRail /> */}
      </Sidebar>
    );
  }
);
