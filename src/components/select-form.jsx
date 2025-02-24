import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function SelectForm({ filter, setFilter, searchParams ,data, namebtn }) {
  const searchParam = searchParams.get("statusfilter");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto">
          { filter.statusfilter || `Select a ${namebtn}`} <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
      {data.map((status) => {
          return (
            <DropdownMenuCheckboxItem
              key={status.title}
              className="capitalize"
              value={status.value}
              checked={filter.statusfilter === status.value}
              onCheckedChange={(value) => {
                setFilter({
                  ...filter,
                  statusfilter: value === true ? status.value : "",
                });
              }}
            >
              {status.title}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
