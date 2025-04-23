import { ColumnDef } from "@tanstack/react-table";
import { Category } from "@/types/category";
import { Clipboard, MoreHorizontal, Trash } from "lucide-react";
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
import { Image } from "@/components/Image";
import { PERMISSIONS } from "@/constants/permissions";
import { usePermission } from "@/hooks/use-permission";

export const categoryColumns: ColumnDef<Category, any>[] = [
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
  const can = usePermission();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <DropdownMenu open={isMenuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button size="icon" className="w-8 h-8" variant="outline">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="bottom"
          align="end"
          className="absolute right-0 z-10 bg-white text-black p-2 rounded shadow-lg min-w-[180px]"
        >
          {can(PERMISSIONS.READ_DETAILS_CATEGORY) && (
            <Link to={`/categories/${category.id}/settings`}>
              <DropdownMenuItem>
                <Clipboard /> View Details
              </DropdownMenuItem>
            </Link>
          )}

          {can(PERMISSIONS.REMOVE_CATEGORY) && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  setIsDialogOpen(true);
                }}
                className="text-destructive focus:text-destructive focus:bg-destructive/10"
              >
                <Trash /> Remove
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {can(PERMISSIONS.REMOVE_CATEGORY) && (
        <RemoveCategoryDialogForm category={category} open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      )}
    </>
  );
}
