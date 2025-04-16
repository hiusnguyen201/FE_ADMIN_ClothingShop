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
import { Customer } from "@/types/customer";
import { RemoveCustomerDialogForm } from "@/components/form/customer/RemoveCustomerDialogForm";
import { FlexBox } from "@/components/FlexBox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDateString } from "@/utils/date";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import { TruncatedTextWithTooltip } from "@/components/TruncatedTextWithTooltip";

export const customerColumns: ColumnDef<Customer, any>[] = [
  {
    accessorKey: "name",
    header: "Name",
    minSize: 300,
    cell: ({ row }) => {
      const customer = row.original;

      return (
        <FlexBox size="small" direction="row" className="items-center">
          <Avatar className="h-10 w-10 rounded-lg">
            {customer.avatar && <AvatarImage src={customer.avatar} alt={customer.name} />}
            <AvatarFallback className="rounded-full capitalize">{customer.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <FlexBox className="gap-0">
            <TruncatedTextWithTooltip className="max-w-[300px]">
              <Link className="text-blue-500" to={"/customers/" + customer.id + "/settings"}>
                {customer.name}
              </Link>
            </TruncatedTextWithTooltip>
            <TruncatedTextWithTooltip className="max-w-[300px]">{customer.email}</TruncatedTextWithTooltip>
          </FlexBox>
        </FlexBox>
      );
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
    minSize: 100,
    maxSize: 100,
    cell: ({ row }) => {
      const customer = row.original;
      return <span className="capitalize">{customer.gender}</span>;
    },
  },
  {
    accessorKey: "contact",
    header: "Contact",
    minSize: 150,
    maxSize: 150,
    cell: ({ row }) => {
      const customer = row.original;
      return (
        <div className="flex items-center">
          <a href={`tel:${customer.phone}`}>
            <TooltipWrapper content={customer.phone}>
              <Phone />
            </TooltipWrapper>
          </a>
          <a href={`mailto:${customer.email}`}>
            <TooltipWrapper content={customer.email}>
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
      const customer = row.original;
      return customer.lastLoginAt ? formatDateString(customer.lastLoginAt) : "never";
    },
  },
  {
    id: "actions",
    minSize: 64,
    maxSize: 64,
    cell: ({ row }) => {
      const customer = row.original;
      return <CustomerActions customer={customer} />;
    },
  },
];

export function CustomerActions({ customer }: { customer: Customer }) {
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
          <Link to={`/customers/${customer.id}/settings`}>
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

      <RemoveCustomerDialogForm customer={customer} open={open} onOpenChange={setOpen} />
    </>
  );
}
