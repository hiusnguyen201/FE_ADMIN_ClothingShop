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
import { Order } from "@/types/order";
import { RemoveOrderDialogForm } from "@/components/form/order/RemoveOrderDialogForm";
import { Tag } from "@/components/Tag";
import { formatDateString } from "@/utils/date";
import { Badge } from "@/components/ui/badge";
import { formatCurrencyVND } from "@/utils/string";

export const orderColumns: ColumnDef<Order, any>[] = [
  {
    accessorKey: "code",
    header: "Code",
    minSize: 70,
    maxSize: 70,
    cell: ({ row }) => (
      <Link to={"/orders/" + row.original.code}>
        <Tag>#{row.original.code}</Tag>
      </Link>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    minSize: 100,
    cell: ({ row }) => formatDateString(row.original.orderDate),
  },
  {
    accessorKey: "customer",
    header: "Customer",
    minSize: 200,
    cell: ({ row }) => {
      const customer = row.original.customer;
      return (
        <div>
          <Link to={"/customers/" + customer.id + "/settings"} className="font-medium text-blue-500">
            {customer.name}
          </Link>
          <div className="text-xs text-muted-foreground truncate max-w-[150px]">{customer.email}</div>
          <div className="text-xs text-muted-foreground">{customer.phone}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    minSize: 250,
    cell: ({ row }) => {
      return (
        <div>
          <div className="truncate max-w-[200px]">{row.original.address}</div>
          <div className="text-xs text-muted-foreground truncate max-w-[200px]">
            {row.original.wardName}, {row.original.districtName}
          </div>
          <div className="text-xs text-muted-foreground">{row.original.provinceName}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    minSize: 120,
    maxSize: 120,
    cell: ({ row }) => {
      const history = row.original.orderStatusHistory;
      return <StatusBadge status={history[history.length - 1].status} />;
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    minSize: 100,
    maxSize: 100,
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {formatCurrencyVND(row.original.total)}
        <div className="text-xs text-muted-foreground">{row.original.quantity} items</div>
      </div>
    ),
  },
  {
    id: "actions",
    minSize: 64,
    maxSize: 64,
    cell: ({ row }) => {
      const order = row.original;
      return <OrderActions order={order} />;
    },
  },
];

export function OrderActions({ order }: { order: Order }) {
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
          <Link to={`/orders/${order.id}`}>
            <DropdownMenuItem>
              <Clipboard /> View Details
            </DropdownMenuItem>
          </Link>

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
        </DropdownMenuContent>
      </DropdownMenu>

      <RemoveOrderDialogForm order={order} open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
}

function StatusBadge({ status }: { status: string }) {
  let variant: "default" | "secondary" | "destructive" | "outline" = "outline";

  switch (status.toLowerCase()) {
    case "pending":
      variant = "outline";
      break;
    case "confirm":
      variant = "secondary";
      break;
    case "shipped":
      variant = "default";
      break;
    case "completed":
      variant = "default";
      break;
    case "cancelled":
      variant = "destructive";
      break;
    default:
      variant = "outline";
  }

  return (
    <Badge variant={variant} className="capitalize">
      {status}
    </Badge>
  );
}
