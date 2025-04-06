import { Sidebar, SidebarContent, SidebarFooter, SidebarRail, useSidebar } from "@/components/ui/sidebar";
import { NavMain } from "@/components/nav-main";
import { navData } from "./nav-data";
import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";
import { forwardRef, LegacyRef } from "react";

export const SideBar = forwardRef((_, ref: LegacyRef<HTMLElement>) => {
  const { toggleSidebar, isMobile } = useSidebar();

  return (
    <nav ref={ref}>
      <Sidebar collapsible="icon">
        <SidebarContent className="overflow-x-hidden bg-white">
          <NavMain label="Application" items={navData.navMainGroupApp} />
          <NavMain label="System" items={navData.navMainGroupSystem} />
          {/* <NavProjects projects={navData.projects} /> */}
        </SidebarContent>

        {!isMobile && (
          <SidebarFooter className="p-0">
            <Button
              variant="ghost"
              size="icon"
              className="border-t w-full p-4 h-auto justify-end"
              onClick={toggleSidebar}
            >
              <PanelLeft />
            </Button>
          </SidebarFooter>
        )}

        <SidebarRail />
      </Sidebar>
    </nav>
  );
});
