'use client';
import PropTypes from 'prop-types';
import { ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export function NavMenu({ items, className }) {
  const location = useLocation();

  return (
    <SidebarGroup className={cn('p-0', className)}>
      <SidebarMenu>
        {items.map((item) => {
          const hasItems = item.items?.length;
          const Element = hasItems ? 'a' : Link;
          const inGroup = hasItems
            ? item?.items.map((subItem) => subItem.url).includes(location.pathname)
            : item.url === location.pathname;

          return (
            <Collapsible key={item.title} title={item.title} className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton asChild tooltip={item.title} className="cursor-pointer h-[36px]">
                    <Element className={cn(inGroup && 'text-[var(--bgcl-primary)]')} to={item?.url}>
                      <item.icon style={{ width: '20px', height: '20px' }} />
                      <span>{item.title}</span>
                      {hasItems && (
                        <ChevronRight className="ml-auto text-gray-400 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      )}
                    </Element>
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                {hasItems ? (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link
                              className={cn(subItem.url === location.pathname ? '!text-[var(--bgcl-primary)]' : '')}
                              to={subItem.url}
                            >
                              <span className="font-normal">{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

NavMenu.propTypes = {
  items: PropTypes.array.isRequired,
};
