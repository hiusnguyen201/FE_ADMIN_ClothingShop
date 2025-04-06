import { ColumnDef } from "@tanstack/react-table";
import { Category } from "@/types/category";
import { FolderTree } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const categoryColumns: ColumnDef<Category, any>[] = [
  {
    id: "name",
    header: "Name",
    minSize: 300,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Avatar className="rounded-md">
            <AvatarImage src={row.original.image} alt={row.original.name} />
            <AvatarFallback className="rounded-md">
              <FolderTree className="h-4 w-4 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>

          {row.original.name}
        </div>
      );
    },
  },
  {
    id: "level",
    header: "Level",
    minSize: 100,
    cell: ({ row }) => {
      return <Badge variant="outline">Level {row.original.level}</Badge>;
    },
  },
  {
    id: "actions",
    maxSize: 64,
    cell: ({ row }) => {
      return <></>;
    },
  },
];
