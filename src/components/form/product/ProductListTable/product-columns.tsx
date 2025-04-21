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
import { Product, PRODUCT_STATUS } from "@/types/product";
// import { RemoveProductDialogForm } from "@/components/form/product/RemoveProductDialogForm";
import { FlexBox } from "@/components/FlexBox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TruncatedTextWithTooltip } from "@/components/TruncatedTextWithTooltip";
import { RemoveProductDialogForm } from "@/components/form/product/RemoveProductDialogForm";
import { Badge } from "@/components/ui/badge";
import { formatCurrencyVND } from "@/utils/string";

export const productColumns: ColumnDef<Product, any>[] = [
  {
    accessorKey: "name",
    header: "Name",
    minSize: 300,
    cell: ({ row }) => (
      <FlexBox size="small" direction="row" className="items-center">
        <Avatar className="h-16 w-16 rounded border">
          <AvatarImage className="object-contain" src={row.original.thumbnail} alt={row.original.name} />
          <AvatarFallback className="rounded-full capitalize">{row.original.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <TruncatedTextWithTooltip lineClamp={2} className="max-w-[300px]">
          <Link className="text-blue-500 w-full" to={"/products/" + row.original.id + "/settings"}>
            {row.original.name}
          </Link>
        </TruncatedTextWithTooltip>
      </FlexBox>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    minSize: 150,
    maxSize: 150,
    cell: ({ row }) => (
      <div>
        <div>{row.original.category.name}</div>
        {row.original.subCategory && (
          <div className="text-xs text-muted-foreground">{row.original.subCategory?.name}</div>
        )}
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    minSize: 120,
    maxSize: 150,
    cell: ({ row }) => {
      if (row.original.productVariants.length === 0) return <div>-</div>;
      if (row.original.productVariants.length === 1)
        return <div> {formatCurrencyVND(row.original.productVariants[0].price)}</div>;

      // ASC prices
      const prices = row.original.productVariants.map((item) => item.price).sort((a, b) => a - b);
      return (
        <div>
          {formatCurrencyVND(prices[0])} ~ {formatCurrencyVND(prices[prices.length - 1])}
        </div>
      );
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
    minSize: 120,
    maxSize: 120,
    cell: ({ row }) => {
      if (row.original.productVariants.length === 0) return <div>-</div>;

      const stock = row.original.productVariants.reduce((prev, curr) => prev + curr.quantity, 0);
      return (
        <div className="flex items-center">
          {stock > 0 ? (
            <span className="text-green-600">{stock}</span>
          ) : (
            <span className="text-red-600">Out of stock</span>
          )}
          <span className="text-xs text-muted-foreground ml-1">({row.original.productVariants.length} variants)</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    minSize: 100,
    maxSize: 120,
    cell: ({ row }) => (
      <Badge className="capitalize" variant={row.original.status === PRODUCT_STATUS.ACTIVE ? "default" : "outline"}>
        {row.original.status}
      </Badge>
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
          <Link to={`/products/${product.id}/settings`}>
            <DropdownMenuItem>
              <Clipboard /> View Details
            </DropdownMenuItem>
          </Link>

          {product.status === PRODUCT_STATUS.INACTIVE && (
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

      <RemoveProductDialogForm product={product} open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
}
