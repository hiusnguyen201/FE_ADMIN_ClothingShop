import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SideBar } from "@/components/layouts/SideBar";
import { Header } from "@/components/layouts/Header";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export function AdminLayout() {
  const isMobile = useIsMobile();
  return (
    <SidebarProvider defaultOpen={!isMobile} className="relative">
      <div className="flex flex-col w-full relative">
        {/* Full-width header at the top */}
        <Header />

        {/* Sidebar + content below the header */}
        <div className="pt-16 group-has-[[data-collapsible=icon]]/sidebar-wrapper:pt-12">
          <div className="flex w-full">
            <SideBar className="w-64 h-full z-50" />
            {/* Main content on the right */}
            <SidebarInset className={cn(isMobile && "max-w-[calc(100%-var(--sidebar-width-icon))]")}>
              <Outlet />
            </SidebarInset>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
