import { useState } from "react";
import { Link } from "react-router-dom";
import { Clipboard, Mail, MoreHorizontal, Phone, Trash } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";
import { RemoveUserDialogForm } from "@/components/form/user/RemoveUserDialogForm";
import { FlexBox } from "@/components/FlexBox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDateString } from "@/utils/date";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import { TruncatedTextWithTooltip } from "@/components/TruncatedTextWithTooltip";

export const userColumns: ColumnDef<User, any>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <FlexBox size="small" direction="row" className="items-center">
          <Avatar className="h-10 w-10 rounded-lg">
            {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
            <AvatarFallback className="rounded-full capitalize">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <FlexBox className="gap-0">
            <Link className="text-blue-500" to={"/users/" + user.id + "/settings"}>
              {user.name}
            </Link>
            <TruncatedTextWithTooltip>{user.email}</TruncatedTextWithTooltip>
          </FlexBox>
        </FlexBox>
      );
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
    maxSize: 100,
    cell: ({ row }) => {
      const user = row.original;
      return <span className="capitalize">{user.gender}</span>;
    },
  },
  {
    accessorKey: "contact",
    header: "Contact",
    maxSize: 96,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center">
          <a href={`tel:${user.phone}`}>
            <TooltipWrapper content={user.phone}>
              <Phone />
            </TooltipWrapper>
          </a>
          <a href={`mailto:${user.email}`}>
            <TooltipWrapper content={user.email}>
              <Mail />
            </TooltipWrapper>
          </a>
        </div>
      );
    },
  },
  {
    accessorKey: "lastLogin",
    header: "Last Login",
    maxSize: 150,
    cell: ({ row }) => {
      const user = row.original;
      return user.lastLoginAt ? formatDateString(user.lastLoginAt) : "never";
    },
  },
  {
    id: "actions",
    maxSize: 64,
    cell: ({ row }) => {
      const user = row.original;
      return <UserActions user={user} />;
    },
  },
];

export function UserActions({ user }: { user: User }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" className="w-8 h-8" variant="outline">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          aria-hidden={open ? "true" : "false"}
          side="bottom"
          align="end"
          className="absolute right-0 z-10 bg-white text-black p-2 rounded shadow-lg min-w-[180px]"
        >
          <Link to={`/users/${user.id}/settings`}>
            <DropdownMenuItem>
              <Clipboard /> View Details
            </DropdownMenuItem>
          </Link>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="text-destructive focus:text-destructive focus:bg-destructive/10"
          >
            <Trash /> Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <RemoveUserDialogForm user={user} open={open} onOpenChange={setOpen} />
    </>
  );
}
