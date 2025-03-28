import { Sidebar, SidebarContent, SidebarFooter, SidebarRail, useSidebar } from "@/components/ui/sidebar";
import { NavMain } from "@/components/nav-main";
import { navData } from "./nav-data";
import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";

export function SideBar() {
  const { toggleSidebar } = useSidebar();

  return (
    <nav>
      <Sidebar collapsible="icon">
        <SidebarContent className="overflow-x-hidden">
          <NavMain label="Application" items={navData.navMainGroupApp} />
          <NavMain label="System" items={navData.navMainGroupSystem} />
          {/* <NavProjects projects={navData.projects} /> */}
        </SidebarContent>
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
        <SidebarRail />
      </Sidebar>
    </nav>
  );
}
