import { NavUser } from "@/components/layouts/NavUser";

export function Header() {
  return (
    <header className="border-b flex h-16 shrink-0 items-center justify-end gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <NavUser />
    </header>
  );
}
