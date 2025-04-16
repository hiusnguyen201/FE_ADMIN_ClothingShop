import { useState } from "react";
import { Link } from "react-router-dom";
import { Clipboard, Mail, MoreHorizontal, Phone, Trash } from "lucide-react";
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
import { FlexBox } from "@/components/FlexBox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDateString } from "@/utils/date";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import { TruncatedTextWithTooltip } from "@/components/TruncatedTextWithTooltip";

export const orderColumns: ColumnDef<Order, any>[] = [
  {
    accessorKey: "name",
    header: "Name",
    minSize: 300,
    cell: ({ row }) => {
      const order = row.original;

      return (
        <FlexBox size="small" direction="row" className="items-center">
          <Avatar className="h-10 w-10 rounded-lg">
            {order.avatar && <AvatarImage src={order.avatar} alt={order.name} />}
            <AvatarFallback className="rounded-full capitalize">{order.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <FlexBox className="gap-0">
            <TruncatedTextWithTooltip className="max-w-[300px]">
              <Link className="text-blue-500" to={"/orders/" + order.id + "/settings"}>
                {order.name}
              </Link>
            </TruncatedTextWithTooltip>
            <TruncatedTextWithTooltip className="max-w-[300px]">{order.email}</TruncatedTextWithTooltip>
          </FlexBox>
        </FlexBox>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    minSize: 150,
    maxSize: 150,
    cell: ({ row }) => {
      const order = row.original;
      return <TruncatedTextWithTooltip>{order.role?.name}</TruncatedTextWithTooltip>;
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
    minSize: 100,
    maxSize: 100,
    cell: ({ row }) => {
      const order = row.original;
      return <span className="capitalize">{order.gender}</span>;
    },
  },
  {
    accessorKey: "contact",
    header: "Contact",
    minSize: 150,
    maxSize: 150,
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="flex items-center">
          <a href={`tel:${order.phone}`}>
            <TooltipWrapper content={order.phone}>
              <Phone />
            </TooltipWrapper>
          </a>
          <a href={`mailto:${order.email}`}>
            <TooltipWrapper content={order.email}>
              <Mail />
            </TooltipWrapper>
          </a>
        </div>
      );
    },
  },
  {
    accessorKey: "lastLogin",
    header: "Last Login",
    minSize: 100,
    maxSize: 100,
    cell: ({ row }) => {
      const order = row.original;
      return order.lastLoginAt ? formatDateString(order.lastLoginAt) : "never";
    },
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
          <Link to={`/orders/${order.id}/settings`}>
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

      <RemoveOrderDialogForm order={order} open={open} onOpenChange={setOpen} />
    </>
  );
}
