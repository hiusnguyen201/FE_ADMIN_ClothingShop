import { ColumnDef, flexRender, getCoreRowModel, SortingState, Table, useReactTable } from "@tanstack/react-table";
import { Table as TableContainer, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Fragment } from "react/jsx-runtime";
import { Spinner } from "@/components/spinner";
import { useState } from "react";
import { ArrowDownZA, ArrowUpAZ, ArrowUpDown } from "lucide-react";

export type DataTableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  placeholder: string;
  heightPerRow?: number;
  className?: string;
  loading?: boolean;
  // getSubRows?: (originalRow: TData, index: number) => undefined | TData[];
  onSortingChange?: (sorting: SortingState) => void;
};

/**
 * Manual resize
 * @import {https://github.com/TanStack/table/discussions/3192}
 */
export function DataTable<TData>({
  data,
  columns,
  placeholder,
  heightPerRow,
  className,
  loading = false,
  onSortingChange,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const handleSorting = (header: any) => {
    if (!header.column.getCanSort()) return;

    const sortField = header.column.id;
    const currentSort = sorting[0];

    let newSort: SortingState = [];

    if (!currentSort || currentSort.id !== sortField) {
      newSort = [{ id: sortField, desc: false }];
    } else if (currentSort.id === sortField && !currentSort.desc) {
      newSort = [{ id: sortField, desc: true }];
    }

    onSortingChange?.(newSort);
    setSorting(newSort);
  };

  const table: Table<TData> = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // getSubRows,
    defaultColumn: {
      minSize: 0,
      size: Number.MAX_SAFE_INTEGER,
      maxSize: Number.MAX_SAFE_INTEGER,
    },
    enableSorting: true,
    manualSorting: true,
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div className="overflow-x-auto flex flex-col w-full relative">
      {loading && (
        <div className="opacity-50 top-0 left-0 z-10 h-full absolute bg-white flex items-center w-full justify-center">
          <Spinner size="large" />
        </div>
      )}
      <TableContainer className={className}>
        <TableHeader className="sticky top-0 bg-white border-b">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="flex w-full">
              {/* {table.getRowModel().rows[index]?.subRows.length > 0 && (
                <TableHead className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={table.getToggleAllRowsExpandedHandler()}
                    className="h-8 w-8 p-0"
                  >
                    {table.getIsSomeRowsExpanded() ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
              )} */}

              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="font-medium text-black flex-1 flex items-center"
                  style={{
                    maxWidth: header.column.columnDef.maxSize,
                    minWidth: header.column.columnDef.minSize,
                  }}
                >
                  {header.isPlaceholder ? null : (
                    <div
                      className={cn(
                        "flex items-center gap-2",
                        header.column.getCanSort() && "cursor-pointer select-none"
                      )}
                      onClick={() => handleSorting(header)}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: <ArrowUpAZ className="h-4 w-4" />,
                        desc: <ArrowDownZA className="h-4 w-4" />,
                      }[header.column.getIsSorted() as string] ??
                        (header.column.getCanSort() && <ArrowUpDown className="h-4 w-4" />)}
                    </div>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className={cn("block w-full overflow-auto", data.length > 15 ? "max-h-[630px]" : "")}>
          {data.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <Fragment key={row.id}>
                <TableRow className={cn("flex w-full items-center", heightPerRow ? `min-h-[${heightPerRow}px]` : "")}>
                  {/* {row.subRows.length > 0 && row.getCanExpand() && (
                    <TableCell className="flex items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={row.getToggleExpandedHandler()}
                        className="h-8 w-8 p-0"
                      >
                        {row.getIsExpanded() ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                  )} */}

                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell
                        key={cell.id}
                        className="flex-1 flex items-center gap-2"
                        style={{
                          maxWidth: cell.column.columnDef.maxSize,
                          minWidth: cell.column.columnDef.minSize,
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    );
                  })}
                </TableRow>

                {/* {row.getIsExpanded() &&
                  row.subRows.map((subRow) => (
                    <TableRow
                      key={subRow.id}
                      className={cn("flex w-full items-center", heightPerRow ? `h-[${heightPerRow}px]` : "")}
                    >
                      <TableCell>
                        <div className="w-8 h-8"></div>
                      </TableCell>

                      {subRow.getVisibleCells().map((cell, cellIndex) => {
                        return (
                          <TableCell
                            key={cell.id}
                            className="flex-1 flex items-center"
                            style={{
                              maxWidth: cell.column.columnDef.maxSize,
                              minWidth: cell.column.columnDef.minSize,
                            }}
                          >
                            {cellIndex === 0 && <div style={{ width: (row.depth + 1) * 16 }}></div>}
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))} */}
              </Fragment>
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
