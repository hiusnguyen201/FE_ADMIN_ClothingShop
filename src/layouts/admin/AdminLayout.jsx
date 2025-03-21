import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { SideBar } from '@/layouts/admin/components/SideBar';
import { Header } from '@/layouts/admin/components/Header';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/admin') {
      navigate('/admin/dashboard');
    }
  }, []);

  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider
        className="flex flex-col"
        style={{
          '--sidebar-width-icon': '4rem',
        }}
      >
        <Header />
        <div className="flex flex-1">
          <SideBar className="pt-[var(--header-height)]" />
          <SidebarInset>
            <main className="flex flex-col h-full">
              <Outlet />
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
