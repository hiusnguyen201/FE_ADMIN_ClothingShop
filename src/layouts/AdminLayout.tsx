import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SideBar } from "@/components/layouts/SideBar";
import { Header } from "@/components/layouts/Header";
import { useIsMobile } from "@/hooks/use-mobile";

export function AdminLayout() {
  const isMobile = useIsMobile();
  return (
    <SidebarProvider defaultOpen={!isMobile} className="relative">
      <div className="flex flex-col w-full relative">
        {/* Full-width header at the top */}
        <Header />

        {/* Sidebar + content below the header */}
        <div className="pt-16 group-has-[[data-collapsible=icon]]/sidebar-wrapper:pt-12">
          <div className="flex flex-grow w-full ">
            <SideBar className="w-64 h-full z-50" />
            {/* Main content on the right */}
            <SidebarInset className="flex-1 max-w-full">
              <div className="relative flex flex-col w-full h-full">
                <Outlet />
              </div>
            </SidebarInset>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
