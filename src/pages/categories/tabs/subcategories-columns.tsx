import { Trash2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Category } from "@/types/category";
import { RemoveCategoryDialogForm } from "@/components/form/category/RemoveCategoryDialogForm";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Image } from "@/components/Image";
import { usePermission } from "@/hooks/use-permission";
import { PERMISSIONS } from "@/constants/permissions";

export const subcategoriesColumns: ColumnDef<Category, any>[] = [
  {
    id: "name",
    header: "Name",
    minSize: 300,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Image src={row.original.image} alt={row.original.name} />

        <Link className="text-blue-500 font-medium" to={"/categories/" + row.original.id + "/settings"}>
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
    enableSorting: false,
    cell: ({ row }) => {
      const can = usePermission();

      return (
        can(PERMISSIONS.REMOVE_CATEGORY) && (
          <RemoveCategoryDialogForm
            category={row.original}
            finishNavigate={`/categories/${row.original.parent}/subcategories`}
          >
            <Button variant="outline" size="icon" className="w-8 h-8">
              <Trash2 />
            </Button>
          </RemoveCategoryDialogForm>
        )
      );
    },
  },
];
