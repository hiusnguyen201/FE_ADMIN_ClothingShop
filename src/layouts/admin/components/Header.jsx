import { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";

export default function Header() {
  const { breadcrumbs, setBreadcrumbs } = useBreadcrumbs();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.length > 0 &&
              breadcrumbs[0].title !== "Dashboard" && (
                <Fragment>
                  <BreadcrumbItem className="hidden md:block">
                    <Link to="/admin/dashboard">Dashboard</Link>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                </Fragment>
              )}

            {breadcrumbs.length > 0 &&
              breadcrumbs.map((item, index) => (
                <Fragment key={item.title}>
                  <BreadcrumbItem className="hidden md:block">
                    <Link to={item.url}>{item.title}</Link>
                  </BreadcrumbItem>
                  {breadcrumbs[index + 1] && (
                    <BreadcrumbSeparator className="hidden md:block" />
                  )}
                </Fragment>
              ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
