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
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "NAME",
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

      const handleDelete = () => {
        dispatch(deleteUser(row.original._id)).then(() => {
          dispatch(getAllUsers());
        });
        setIsDialogOpen(false);
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
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  setIsDialogOpen(true);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {isDialogOpen && (
            <AlertDialog open onOpenChange={setIsDialogOpen}>
              <AlertDialogPortal>
                <AlertDialogOverlay />
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction onClick={handleDelete}>
                      Confirm
                    </AlertDialogAction>
                    <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogPortal>
            </AlertDialog>
          )}
        </>
      );
    },
  },
];
