import { FolderTree, Trash2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Category } from "@/types/category";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RemoveCategoryDialogForm } from "@/components/form/category/RemoveCategoryDialogForm";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export const subcategoriesColumns: ColumnDef<Category, any>[] = [
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
    id: "actions",
    maxSize: 64,
    cell: ({ row }) => {
      return (
        <RemoveCategoryDialogForm
          category={row.original}
          finishNavigate={`/categories/${row.original.parent}/subcategories`}
        >
          <Button variant="outline" size="icon" className="w-8 h-8">
            <Trash2 />
          </Button>
        </RemoveCategoryDialogForm>
      );
    },
  },
];
