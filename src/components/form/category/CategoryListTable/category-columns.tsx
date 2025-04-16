import { ColumnDef } from "@tanstack/react-table";
import { Category } from "@/types/category";
import { Clipboard, FolderTree, MoreHorizontal, Trash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { RemoveCategoryDialogForm } from "@/components/form/category/RemoveCategoryDialogForm";

export const categoryColumns: ColumnDef<Category, any>[] = [
  {
    id: "name",
    header: "Name",
    minSize: 300,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar className="rounded h-20 w-20 border">
          <AvatarImage src={row.original.image} alt={row.original.name} className="object-contain" />
          <AvatarFallback className="rounded">
            <FolderTree className="h-4 w-4 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>

        <Link className="text-blue-500" to={"/categories/" + row.original.id + "/settings"}>
          {row.original.name}
        </Link>
      </div>
    ),
  },
  {
    id: "level",
    header: "Level",
    minSize: 100,
    cell: ({ row }) => <Badge variant="outline">Level {row.original.level}</Badge>,
  },
  {
    id: "subCategory",
    header: "Total sub-category",
    minSize: 100,
    cell: ({ row }) => row.original.children.length || 0,
  },
  {
    id: "actions",
    maxSize: 64,
    cell: ({ row }) => <CategoryActions category={row.original} />,
  },
];

export function CategoryActions({ category }: { category: Category }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" className="w-8 h-8" variant="outline">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          aria-hidden={open ? "true" : "false"}
          side="bottom"
          align="end"
          className="absolute right-0 z-10 bg-white text-black p-2 rounded shadow-lg min-w-[180px]"
        >
          <Link to={`/categories/${category.id}/settings`}>
            <DropdownMenuItem>
              <Clipboard /> View Details
            </DropdownMenuItem>
          </Link>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="text-destructive focus:text-destructive focus:bg-destructive/10"
          >
            <Trash /> Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <RemoveCategoryDialogForm category={category} open={open} onOpenChange={setOpen} />
    </>
  );
}
