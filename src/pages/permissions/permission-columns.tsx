import { ColumnDef } from "@tanstack/react-table";
import { TruncatedTextWithTooltip } from "@/components/TruncatedTextWithTooltip";
import { Permission } from "@/types/permission";
import { Tag } from "@/components/Tag";

export const permissionColumns: ColumnDef<Permission, any>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <Tag className="text-sm">{row.original.name}</Tag>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <TruncatedTextWithTooltip>{row.original.description}</TruncatedTextWithTooltip>,
  },
];
