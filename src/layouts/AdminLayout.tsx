import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SideBar } from "@/components/layouts/SideBar";
import { Header } from "@/components/layouts/Header";
import { useEffect, useRef } from "react";

export function AdminLayout() {
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (sidebarRef.current) {
        sessionStorage.setItem("sidebarWidth", String(sidebarRef.current.offsetWidth));
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <SidebarProvider>
      <SideBar ref={sidebarRef} />
      <SidebarInset>
        <Header />
        <main className="relative flex flex-col justify-between w-full h-full">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
