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
import { formatDateString } from "@/utils/date";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import { TruncatedTextWithTooltip } from "@/components/TruncatedTextWithTooltip";
import { Image } from "@/components/Image";
import { usePermission } from "@/hooks/use-permission";
import { PERMISSIONS } from "@/constants/permissions";

export const userColumns: ColumnDef<User, any>[] = [
  {
    accessorKey: "name",
    header: "Name",
    minSize: 320,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <FlexBox size="small" direction="row" className="items-center">
          <Image src={user.avatar} alt={user.name} type="avatar" size={48} />
          <FlexBox className="gap-0">
            <TruncatedTextWithTooltip className="max-w-[300px]">
              <Link className="text-blue-500" to={"/users/" + user.id + "/settings"}>
                {user.name}
              </Link>
            </TruncatedTextWithTooltip>
            <TruncatedTextWithTooltip className="max-w-[300px]">{user.email}</TruncatedTextWithTooltip>
          </FlexBox>
        </FlexBox>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    minSize: 250,
    maxSize: 150,
    cell: ({ row }) => {
      const user = row.original;
      return <TruncatedTextWithTooltip>{user.role?.name || "-"}</TruncatedTextWithTooltip>;
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
    minSize: 50,
    cell: ({ row }) => {
      const user = row.original;
      return <span className="capitalize">{user.gender}</span>;
    },
  },
  {
    accessorKey: "contact",
    header: "Contact",
    minSize: 100,
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
    minSize: 100,
    maxSize: 100,
    cell: ({ row }) => {
      const user = row.original;
      return user.lastLoginAt ? formatDateString(user.lastLoginAt) : "never";
    },
  },
  {
    id: "actions",
    minSize: 64,
    maxSize: 64,
    cell: ({ row }) => {
      const user = row.original;
      return <UserActions user={user} />;
    },
  },
];

export function UserActions({ user }: { user: User }) {
  const can = usePermission();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <DropdownMenu open={isMenuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button size="icon" className="w-8 h-8" variant="outline">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="bottom"
          align="end"
          className="absolute right-0 z-10 bg-white text-black p-2 rounded shadow-lg min-w-[180px]"
        >
          {can(PERMISSIONS.READ_DETAILS_USERS) && (
            <Link to={`/users/${user.id}/settings`}>
              <DropdownMenuItem>
                <Clipboard /> View Details
              </DropdownMenuItem>
            </Link>
          )}

          {can(PERMISSIONS.REMOVE_USER) && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  setIsDialogOpen(true);
                }}
                className="text-destructive focus:text-destructive focus:bg-destructive/10"
              >
                <Trash /> Remove
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {can(PERMISSIONS.REMOVE_USER) && (
        <RemoveUserDialogForm user={user} open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      )}
    </>
  );
}
