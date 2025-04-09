import { useState } from "react";
import { Link } from "react-router-dom";
import { Clipboard, MoreHorizontal, Trash } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
// import { RemoveProductDialogForm } from "@/components/form/product/RemoveProductDialogForm";
import { FlexBox } from "@/components/FlexBox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TruncatedTextWithTooltip } from "@/components/TruncatedTextWithTooltip";
import { Tag } from "@/components/Tag";
import { RemoveProductDialogForm } from "@/components/form/product/RemoveProductDialogForm";

export const productColumns: ColumnDef<Product, any>[] = [
  {
    accessorKey: "name",
    header: "Name",
    minSize: 300,
    cell: ({ row }) => (
      <FlexBox size="small" direction="row" className="items-center">
        <Avatar className="h-20 w-20 rounded border">
          <AvatarImage className="object-contain" src={row.original.thumbnail} alt={row.original.name} />
          <AvatarFallback className="rounded-full capitalize">{row.original.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <FlexBox className="gap-1">
          <Tag className="capitalize">{row.original.status}</Tag>
          <TruncatedTextWithTooltip className="max-w-[300px]">
            <Link className="text-blue-500" to={"/products/" + row.original.id + "/settings"}>
              {row.original.name}
            </Link>
          </TruncatedTextWithTooltip>
        </FlexBox>
      </FlexBox>
    ),
  },
  {
    id: "actions",
    minSize: 64,
    maxSize: 64,
    cell: ({ row }) => {
      const product = row.original;
      return <ProductActions product={product} />;
    },
  },
];

export function ProductActions({ product }: { product: Product }) {
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
          <Link to={`/products/${product.id}/settings`}>
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

      <RemoveProductDialogForm product={product} open={open} onOpenChange={setOpen} />
    </>
  );
}
