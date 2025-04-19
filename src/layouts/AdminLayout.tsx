import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SideBar } from "@/components/layouts/SideBar";
import { Header } from "@/components/layouts/Header";

export function AdminLayout() {
  return (
    <SidebarProvider className="relative">
      <div className="flex flex-col w-full relative">
        {/* Full-width header at the top */}
        <Header />

        {/* Sidebar + content below the header */}
        <div className="flex flex-grow w-full h-full pt-16 group-has-[[data-collapsible=icon]]/sidebar-wrapper:pt-12">
          {/* Sidebar on the left */}
          <SideBar className="w-64 pt-16 group-has-[[data-collapsible=icon]]/sidebar-wrapper:pt-12" />
          {/* Main content on the right */}
          <SidebarInset className="flex-1 max-w-[calc(100%-48px)] ">
            <main className="relative flex flex-col w-full h-full">
              <Outlet />
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
