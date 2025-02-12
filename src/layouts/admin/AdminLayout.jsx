import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import SideBar from "@/layouts/admin/components/SideBar";
import Header from "./components/Header";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/admin") {
      navigate("/admin/dashboard");
    }
  }, []);

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
