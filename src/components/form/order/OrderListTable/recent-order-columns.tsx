import { Link } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { Order } from "@/types/order";
import { formatDateString } from "@/utils/date";
import { formatCurrencyVND } from "@/utils/string";
import { BadgeOrderStatus } from "@/components/BadgeOrderStatus";

export const recentOrderColumns: ColumnDef<Order, any>[] = [
  {
    accessorKey: "code",
    header: "Code",
    minSize: 100,
    maxSize: 100,
    cell: ({ row }) => (
      <Link className="text-blue-500 font-weight" to={"/orders/" + row.original.code}>
        #{row.original.code}
      </Link>
    ),
  },
  {
    accessorKey: "orderDate",
    header: "Date",
    minSize: 100,
    cell: ({ row }) => formatDateString(row.original.orderDate),
  },
  {
    accessorKey: "customer",
    header: "Customer",
    minSize: 200,
    enableSorting: false,
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
    enableSorting: false,
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
    enableSorting: false,
    minSize: 150,
    cell: ({ row }) => {
      const orderStatusHistory = row.original.orderStatusHistory;
      return <BadgeOrderStatus status={orderStatusHistory[orderStatusHistory.length - 1].status} />;
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    minSize: 100,
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {formatCurrencyVND(row.original.total)}
        <div className="text-xs text-muted-foreground">{row.original.quantity} items</div>
      </div>
    ),
  },
];
