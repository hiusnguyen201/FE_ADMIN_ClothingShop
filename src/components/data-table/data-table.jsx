'use client';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { ArrowDownAZ, ArrowDownUp, ArrowDownZA, ChevronLeft, ChevronRight } from 'lucide-react';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { SearchField } from '@/components/field';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { DataTablePagination } from './data-table-pagination';

const SORT_ICONS = {
  asc: ArrowDownAZ,
  desc: ArrowDownZA,
};

const SORT_VALUES = ['asc', 'desc'];

const getNextSortValue = (currentValue) => {
  const currentIndex = SORT_VALUES.findIndex((val) => val?.toString() === currentValue?.toString());
  if (currentIndex === -1) return SORT_VALUES[0];
  return currentIndex + 1 === SORT_VALUES.length ? null : SORT_VALUES[1];
};

export function DataTable({
  columns,
  data,
  className,
  onKeywordChange,
  onSortChange,
  totalPages,
  currentPage,
  onPageChange,
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [sortValue, setSortValue] = useState({});

  useEffect(() => {
    if (!onSortChange) return;
    onSortChange(sortValue);
  }, [sortValue]);

  const handleSort = (headerId) => {
    const nextSortValue = getNextSortValue(sortValue[headerId]);
    if (!nextSortValue) {
      setSortValue((prev) => {
        const newSort = { ...prev };
        delete newSort[headerId];
        return newSort;
      });
    } else {
      setSortValue({
        [headerId]: getNextSortValue(sortValue[headerId]),
      });
    }
  };

  const renderSortIcon = (headerId) => {
    const Icon = SORT_ICONS[sortValue[headerId]];
    return Icon ? <Icon width={16} height={16} /> : <ArrowDownUp width={16} height={16} />;
  };

  return (
    <div className={cn('w-full flex flex-col gap-6', className)}>
      <SearchField onValueChange={onKeywordChange} />

      <div className="rounded border-none">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="select-none text-[var(--color-primary)] cursor-pointer"
                    onClick={() => handleSort(header.id)}
                  >
                    <div className="flex items-center gap-2">
                      {!header.isPlaceholder && flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.columnDef.enableSorting && renderSortIcon(header.id)}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell className="p-4" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
}

DataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  className: PropTypes.string,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  className: PropTypes.string,
  onKeywordChange: PropTypes.func,
  onSortChange: PropTypes.func,
};
