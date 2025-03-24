import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function DataTable({ data, placeholder, columns }) {
  const table = useReactTable({
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
    <div className="flex flex-col max-w-full overflow-auto border-b">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    className="font-medium text-black"
                    key={header.id}
                    style={{
                      width: header.getSize() === Number.MAX_SAFE_INTEGER ? "auto" : header.getSize(),
                      maxWidth: header.column.columnDef.maxSize,
                    }}
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="overflow-auto">
          {data.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow className="h-[77px]" key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    style={{
                      width: cell.column.getSize() === Number.MAX_SAFE_INTEGER ? "auto" : cell.column.getSize(),
                      maxWidth: cell.column.columnDef.maxSize || undefined,
                    }}
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="text-center">
              <TableCell colSpan={table.getAllColumns().length}>{placeholder}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
