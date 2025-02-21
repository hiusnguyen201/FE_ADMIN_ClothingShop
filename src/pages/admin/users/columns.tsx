"use client";
import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogPortal,
  AlertDialogOverlay,
} from "@/components/ui/alert-dialog";

import { useDispatch } from "react-redux";
import { deleteUser, getAllUsers } from "@/lib/slices/userSlice";

export type User = {
  _id: string;
  name: string;
  phone?: string[];
  birthday: Date;
  gender: string;
};

export const columns: ColumnDef<User>[] = [
  // {
  //   accessorKey: "_id",
  //   header: "ID",
  // },
  {
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "email",
    header: "EMAIL",
  },
  {
    accessorKey: "phone",
    header: "PHONE",
    cell: ({ row }) => {
      const phones = row.getValue("phone");
      return Array.isArray(phones) ? phones.join(", ") : phones;
    },
  },
  {
    accessorKey: "birthday",
    header: "DATE OF BIRTH",
    cell: ({ row }) => {
      let dateValue = row.getValue("birthday");
      if (
        typeof dateValue === "object" &&
        dateValue !== null &&
        "$date" in dateValue
      ) {
        dateValue = dateValue.$date;
      }

      if (typeof dateValue !== "string") {
        return "Invalid Date";
      }

      return new Date(dateValue).toLocaleDateString();
    },
  },
  {
    accessorKey: "gender",
    header: "GENDER",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const dispatch = useDispatch<any>();

      const handleDelete = async () => {
        try {
          await dispatch(deleteUser(row.original._id)).unwrap();
          window.location.reload();
        } catch (error) {
          console.error("Failed to delete user:", error);
        } finally {
          setIsDialogOpen(false);
        }
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to={`/admin/users/update-user/${row.original._id}`}>
                  Update
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setIsDialogOpen(true)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {isDialogOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
              <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
              {/* Modal content */}
              <div className="z-50 w-full max-w-lg rounded-lg border bg-white p-6 shadow-lg">
                <h3 className="text-lg font-semibold">Are you sure?</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  This action cannot be undone.
                </p>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    onClick={() => setIsDialogOpen(false)}
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      );
    },
  },
];
