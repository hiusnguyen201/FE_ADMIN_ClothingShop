import { Sidebar, SidebarContent, SidebarFooter, useSidebar } from "@/components/ui/sidebar";
import { NavMain } from "@/components/layouts/NavMain";
import { navData } from "./nav-data";
import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";
import { forwardRef, LegacyRef } from "react";
import { cn } from "@/lib/utils";

export const SideBar = forwardRef(
  ({ className }: { className?: string }, ref: LegacyRef<HTMLDivElement> | undefined) => {
    const { open, setOpen } = useSidebar();

    return (
      <Sidebar ref={ref} collapsible="icon" className={cn(className)}>
        <SidebarContent className="overflow-x-hidden bg-white pt-16 group-has-[[data-collapsible=icon]]/sidebar-wrapper:pt-12">
          <NavMain label="Application" items={navData.navMainGroupApp} />
          <NavMain label="System" items={navData.navMainGroupSystem} />
          {/* <NavProjects projects={navData.projects} /> */}
        </SidebarContent>

        <SidebarFooter className="p-0 bg-white">
          <Button variant="ghost" className="border-t w-full p-4 h-auto justify-end" onClick={() => setOpen(!open)}>
            <PanelLeft size={20} />
          </Button>
        </SidebarFooter>

        {/* <SidebarRail /> */}
      </Sidebar>
    );
  }
);
