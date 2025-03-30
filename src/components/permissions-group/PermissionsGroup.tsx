import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

type PermissionsGroupProps = {
  module: string;
  lengthItems: number;
  children: ReactNode | ReactNode[];
  onClickAction: () => void;
  allChecked: boolean;
};

export function PermissionsGroup({ module, lengthItems, children, onClickAction, allChecked }: PermissionsGroupProps) {
  return (
    <AccordionItem value={module} className="border rounded-lg mb-2">
      <div className="flex items-center justify-between w-full">
        <div className="flex-1">
          <AccordionTrigger className="px-4 hover:no-underline gap-2">
            <div className="flex items-center gap-2">
              <span className="capitalize font-medium">{module}</span>
              <Badge variant={allChecked ? "default" : "outline"}>{lengthItems} permissions</Badge>
            </div>
          </AccordionTrigger>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="mr-2"
            onClick={(e) => {
              e.stopPropagation();
              onClickAction();
            }}
          >
            {allChecked ? "Disable All" : "Enable All"}
          </Button>
        </div>
      </div>
      <AccordionContent className="px-4 pt-2 pb-4">{children}</AccordionContent>
    </AccordionItem>
  );
}
