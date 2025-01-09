import SidebarAuth from "@/layouts/auth/components/SideBarAuth";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <SidebarAuth />
      <Outlet />
    </div>
  );
}
