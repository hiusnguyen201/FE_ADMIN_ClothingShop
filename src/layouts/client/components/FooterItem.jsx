import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useIsLaptop } from "@/hooks/use-laptop";
import { useEffect, useState } from "react";

export function FooterItem({ className, title, items }) {
  const isLaptop = useIsLaptop();
  const [open, setOpen] = useState(isLaptop);

  useEffect(() => {
    setOpen(isLaptop);
  }, [isLaptop]);

  const handleOpenContent = () => {
    if (!isLaptop) {
      setOpen(!open);
    }
  };

  return (
    <Collapsible
      asChild
      open={open}
      onOpenChange={setOpen}
      className={cn("w-full group/collapsible", className)}
    >
      <div className="group/menu-item relative">
        <div
          className="flex items-center justify-between text-[#fff] footer-menu_title cursor-pointer lg:cursor-auto"
          onClick={handleOpenContent}
        >
          <p className="uppercase font-bold">{title}</p>
          {!isLaptop && (
            <ChevronRight className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          )}
        </div>
        <CollapsibleContent>
          <ul className="mt-3 px-2 md:p-0 space-y-3">
            {items &&
              items.length &&
              items.map((item) => {
                return (
                  <li className="footer-menu_item" key={item.title}>
                    <Link
                      className="hover:text-[yellow] duration-200"
                      to={item.to}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
