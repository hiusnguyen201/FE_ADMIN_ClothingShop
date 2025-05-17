"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { usePermission } from "@/hooks/use-permission";
import { cn } from "@/lib/utils";

export function NavMain({
  label,
  items,
}: {
  label?: string;
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    permission?: string;
    items?: {
      icon?: string;
      title: string;
      url: string;
      permission?: string;
    }[];
  }[];
}) {
  const location = useLocation();
  const can = usePermission();
  const someCan = can(
    items.map((i) => i.permission).filter((p): p is string => !!p),
    "some"
  );
  const somePer = items.some((i) => !i.permission);

  return (
    <SidebarGroup className="p-0">
      {(someCan || somePer) && label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) => {
          const active = location.pathname.includes(item.url);
          if (item.permission && !can(item.permission)) {
            return null;
          }

          return (
            <Collapsible key={item.title} asChild defaultOpen={true} className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  {!item?.items ? (
                    <Link
                      to={item.url}
                      className={cn("flex items-center hover:text-primary", active && "text-primary")}
                    >
                      <SidebarMenuButton className="h-9 [&>svg]:size-5" tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span className="font-medium">{item.title}</span>
                      </SidebarMenuButton>
                    </Link>
                  ) : (
                    <SidebarMenuButton
                      className={cn("h-9 [&>svg]:size-5 hover:text-primary", active && "text-primary")}
                      tooltip={item.title}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  )}
                </CollapsibleTrigger>
                {item?.items && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => {
                        if (subItem.permission && !can(subItem.permission)) {
                          return null;
                        }

                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link to={subItem.url}>
                                {subItem.icon && <subItem.icon />}
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
