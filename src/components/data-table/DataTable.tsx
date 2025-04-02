import { ColumnDef, flexRender, getCoreRowModel, Table, useReactTable } from "@tanstack/react-table";
import { Table as TableContainer, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export type DataTableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  placeholder: string;
  heightPerRow?: number;
};

/**
 * Manual resize
 * @import {https://github.com/TanStack/table/discussions/3192}
 */
export function DataTable<TData>({ data, columns, placeholder, heightPerRow }: DataTableProps<TData>) {
  const table: Table<TData> = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      minSize: 0,
      size: Number.MAX_SAFE_INTEGER,
      maxSize: Number.MAX_SAFE_INTEGER,
    },
  });

  return (
    <div className="flex flex-col max-w-full">
      <TableContainer>
        <TableHeader className="sticky top-0 bg-white border-b">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="flex w-full">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="font-medium text-black flex-1 flex items-center"
                  style={{
                    maxWidth: header.column.columnDef.maxSize,
                  }}
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className={cn("block w-full overflow-auto", data.length > 15 ? " max-h-[630px]" : "")}>
          {data.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className={cn("flex w-full items-center", heightPerRow ? `h-[${heightPerRow}px]` : "")}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell
                      key={cell.id}
                      className="flex-1 truncate"
                      style={{
                        maxWidth: cell.column.columnDef.maxSize,
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow className="flex text-center w-full">
              <TableCell colSpan={table.getAllColumns().length} className="w-full">
                {placeholder}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </TableContainer>
    </div>
  );
}
