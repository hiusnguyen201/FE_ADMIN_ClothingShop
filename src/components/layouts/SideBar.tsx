import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/nav-main";
import { navData } from "./nav-data";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PanelLeft } from "lucide-react";
import { forwardRef, LegacyRef } from "react";
import { cn } from "@/lib/utils";

export const SideBar = forwardRef(
  ({ className }: { className?: string }, ref: LegacyRef<HTMLDivElement> | undefined) => {
    const { toggleSidebar, isMobile, open, setOpen, setOpenMobile } = useSidebar();

    return (
      <Sidebar ref={ref} collapsible="icon" className={cn(className)}>
        <SidebarContent className="overflow-x-hidden bg-white">
          <NavMain label="Application" items={navData.navMainGroupApp} />
          <NavMain label="System" items={navData.navMainGroupSystem} />
          {/* <NavProjects projects={navData.projects} /> */}
        </SidebarContent>

        <SidebarFooter className="p-0 bg-white">
          <Button variant="ghost" className="border-t w-full p-4 h-auto justify-end" onClick={() => setOpen(!open)}>
            <PanelLeft size={20} />
          </Button>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>
    );
  }
);
