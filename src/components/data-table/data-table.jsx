'use client';
import { Fragment, useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowDownAZ, ArrowDownZA, ChevronLeft, ChevronRight, MoreHorizontal, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { LetterAvatar } from '../letter-avatar/letter-avatar';
import { TooltipWrapper } from '../custom/tooltip-wrapper';

const data = [
  {
    id: 'm5gr84i9',
    avatar: null,
    name: 'ken99',
    email: 'ken99@example.com',
    status: 'active',
  },
  {
    id: '3u1reuv4',
    avatar: null,
    name: 'Abe45',
    email: 'Abe45@example.com',
    status: 'active',
  },
  {
    id: 'derv1ws0',
    avatar: null,
    name: 'Monserrat44',
    email: 'Monserrat44@example.com',
    status: 'inactive',
  },
  {
    id: '5kma53ae',
    avatar: null,
    name: 'Silas22',
    email: 'Silas22@example.com',
    status: 'active',
  },
  {
    id: 'bhqecj4p',
    avatar: null,
    name: 'carmella',
    email: 'carmella@example.com',
    status: 'inactive',
  },
];

export const columns = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2">
          <span>Name</span>
          <ArrowDownAZ width={20} height={20} />
        </div>
      );
    },
    cell: ({ row }) => {
      const { original } = row;
      return (
        <div className="flex gap-4">
          <LetterAvatar src={original.avatar} alt={original.name} />
          <div>
            <p className="text-[var(--bgcl-primary)]">
              <Link to={original.id}>{original.name}</Link>
            </p>
            <p className="text-[var(--color-secondary)] font-normal lowercase">{original.email}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      const { original } = row;
      return <Badge>{original.status}</Badge>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { original } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <TooltipWrapper shape="square" variant="outline" content="More Actions">
              <MoreHorizontal />
            </TooltipWrapper>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="font-normal text-[var(--color-secondary)] text-sm" align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Assign Roles</DropdownMenuItem>
            <DropdownMenuItem>Assign Permissions</DropdownMenuItem>
            <DropdownMenuItem>Send Verification Email</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Change Email</DropdownMenuItem>
            <DropdownMenuItem>Reset Password</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500 hover-">
              <Trash /> Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTable() {
  //   const [sorting, setSorting] = useState([]);
  //   const [columnFilters, setColumnFilters] = useState([]);
  //   const [columnVisibility, setColumnVisibility] = useState({});
  //   const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // onSortingChange: setSorting,
    // onColumnFiltersChange: setColumnFilters,
    // getPaginationRowModel: getPaginationRowModel(),
    // getSortedRowModel: getSortedRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
    // onColumnVisibilityChange: setColumnVisibility,
    // onRowSelectionChange: setRowSelection,
    // state: {
    //   sorting,
    //   columnFilters,
    //   columnVisibility,
    //   rowSelection,
    // },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input placeholder="Enter a keyword" className="max-w-sm" />
      </div>
      <div className="rounded border-none">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="text-[var(--color-primary)] cursor-pointer" key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">Page 1 of 2</div>
        <div className="space-x-2">
          <Button variant="outline" size="icon" onClick={() => {}}>
            <ChevronLeft />
          </Button>
          <Button variant="outline" size="icon" onClick={() => {}}>
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
