import { SidebarIcon } from 'lucide-react';
import PropTypes from 'prop-types';
import { Sidebar, SidebarContent, SidebarFooter, SidebarRail, useSidebar } from '@/components/ui/sidebar';
import { navData } from '@/layouts/admin/components/nav-data';
import { NavMenu } from '@/components/custom/nav-menu';
import { cn } from '@/lib/utils';

export function SideBar({ className }) {
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar collapsible="icon" className={className}>
      <SidebarContent className="p-4 bg-white">
        <NavMenu items={navData.navItems} />
      </SidebarContent>
      <SidebarFooter
        className={cn('border-t p-4 flex justify-center items-end cursor-pointer hover:bg-gray-100 bg-white')}
        onClick={toggleSidebar}
      >
        <div className="flex items-center justify-center w-full max-w-8 h-8">
          <SidebarIcon size={20} />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

SideBar.propTypes = {
  className: PropTypes.string,
};
