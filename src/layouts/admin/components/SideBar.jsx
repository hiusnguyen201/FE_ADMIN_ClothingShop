import { SidebarIcon } from 'lucide-react';
import PropTypes from 'prop-types';
import { Sidebar, SidebarContent, SidebarFooter, SidebarRail, useSidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { navData } from '@/layouts/admin/components/nav-data';
import { NavMenu } from '@/components/custom/nav-menu';

export function SideBar({ className }) {
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar collapsible="icon" className={className}>
      <SidebarContent>
        <NavMenu items={navData.navItems} />
      </SidebarContent>
      <SidebarFooter>
        <Button className="sm:ml-auto" variant="ghost" size="icon" onClick={toggleSidebar}>
          <SidebarIcon />
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

SideBar.propTypes = {
  className: PropTypes.string,
};
