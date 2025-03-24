import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import { navData } from "./nav-data";

export function SideBar() {
  return (
    <nav>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <TeamSwitcher team={navData.team} />
        </SidebarHeader>
        <SidebarContent>
          <NavMain label="Application" items={navData.navMainGroupApp} />
          <NavMain label="System" items={navData.navMainGroupSystem} />
          {/* <NavProjects projects={navData.projects} /> */}
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={navData.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </nav>
  );
}
