import * as React from "react";
import { flexRender } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DataTableCustom({
  columns,
  filter,
  meta,
  onPageChange,
  onItemPerPageChange,
}) {
  return (
    filter && (
      <div className="w-full">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {filter.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {filter.getRowModel().rows?.length ? (
                filter.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-col items-center justify-end gap-2 space-x-2 py-4 sm:flex-row">
          <div className="flex w-full items-center justify-between">
            <div className="flex-1 text-sm font-small ">
              Showing {meta.offSet+1} to {meta.offSet+10} of {meta.totalItems} entries
            </div>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
              <div className="flex items-center space-x-2">
                <p className="whitespace-nowrap text-sm font-small ">
                  Rows per page
                </p>
                <Select
                  onValueChange={(value) => {
                    onItemPerPageChange(value);
                  }}
                >
                  <SelectTrigger className="w-[70px] h-[35px]">
                    <SelectValue placeholder="10" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="30">30</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="flex w-full items-center justify-between gap-2 sm:justify-end">
            <div className="flex w-[150px] items-center justify-center text-sm font-small">
              Page {meta.currentPage} of {meta.totalPages}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                className="items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground hidden h-8 w-8 p-0 lg:flex"
                variant="outline"
                size="sm"
                onClick={() => {
                    onPageChange(1);
                }}
                disabled={!meta.isFirst}
              >
                <ChevronsLeft />
              </Button>
              <Button
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0"
                variant="outline"
                size="sm"
                onClick={() => {
                    onPageChange(+meta.currentPage-1);
                }}
                disabled={!meta.isPrevious}
              >
                <ChevronLeft />
              </Button>
              <Button
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0"
                variant="outline"
                size="sm"
                onClick={() => {
                    onPageChange(+meta.currentPage+1);
                }}
                disabled={!meta.isNext}
              >
                <ChevronRight />
              </Button>
              <Button
                className="items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground hidden h-8 w-8 p-0 lg:flex"
                variant="outline"
                size="sm"
                onClick={() => {
                    onPageChange(meta.totalPages);
                }}
                disabled={!meta.isLast}
              >
                <ChevronsRight />
              </Button>
            </div>
          </div>
        </div>
        
      </div>
    )
  );
}
