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
import { TruncatedTextWithTooltip } from "@/components/TruncatedTextWithTooltip";
import { RemoveProductDialogForm } from "@/components/form/product/RemoveProductDialogForm";
import { Badge } from "@/components/ui/badge";
import { formatCurrencyVND } from "@/utils/string";
import { Image } from "@/components/Image";
import { usePermission } from "@/hooks/use-permission";
import { PERMISSIONS } from "@/constants/permissions";

export const productColumns: ColumnDef<Product, any>[] = [
  {
    accessorKey: "name",
    header: "Name",
    minSize: 400,
    cell: ({ row }) => (
      <FlexBox size="small" direction="row" className="items-center">
        <Image src={row.original.thumbnail} alt={row.original.name} aspect="3/4" />
        <TruncatedTextWithTooltip lineClamp={2} className="max-w-[300px]">
          <Link className="text-blue-500 w-full font-medium" to={"/products/" + row.original.id + "/settings"}>
            {row.original.name}
          </Link>
        </TruncatedTextWithTooltip>
      </FlexBox>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    minSize: 100,
    cell: ({ row }) => (
      <Badge className="capitalize" variant={row.original.status === PRODUCT_STATUS.ACTIVE ? "default" : "outline"}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "category",
    enableSorting: false,
    header: "Category",
    minSize: 150,
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
    enableSorting: false,
    header: "Price",
    minSize: 120,
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
    accessorKey: "quantity",
    enableSorting: false,
    header: "Stock",
    minSize: 120,
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
    id: "actions",
    minSize: 64,
    maxSize: 64,
    enableSorting: false,
    cell: ({ row }) => {
      const product = row.original;
      return <ProductActions product={product} />;
    },
  },
];

export function ProductActions({ product }: { product: Product }) {
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
          {can(PERMISSIONS.READ_DETAILS_PRODUCT) && (
            <Link to={`/products/${product.id}/settings`}>
              <DropdownMenuItem>
                <Clipboard /> View Details
              </DropdownMenuItem>
            </Link>
          )}

          {can(PERMISSIONS.REMOVE_PRODUCT) && product.status === PRODUCT_STATUS.INACTIVE && (
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

      {can(PERMISSIONS.REMOVE_PRODUCT) && product.status === PRODUCT_STATUS.INACTIVE && (
        <RemoveProductDialogForm product={product} open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      )}
    </>
  );
}
