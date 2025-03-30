import { Accordion } from "@/components/ui/accordion";
import { ReactNode } from "react";

export function PermissionsGroupWrapper({ children }: { children: ReactNode | ReactNode[] }) {
  return (
    <Accordion type="multiple" className="w-full">
      {children}
    </Accordion>
  );
}
