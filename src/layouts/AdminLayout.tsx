import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SideBar } from "@/components/layouts/SideBar";
import { Header } from "@/components/layouts/Header";

export function AdminLayout() {
  return (
    <SidebarProvider>
      <SideBar />
      <SidebarInset>
        <Header />
        <main className="relative flex flex-col justify-between w-full h-full">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
