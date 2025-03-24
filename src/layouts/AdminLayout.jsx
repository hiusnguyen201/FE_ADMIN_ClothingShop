import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SideBar } from "@/components/layout/SideBar";
import { Header } from "@/components/layout/Header";

export default function AdminLayout() {
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
