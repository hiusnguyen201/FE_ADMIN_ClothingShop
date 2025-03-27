import { ReactNode } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

export type ActionItemType = "button" | "link" | "separator";

export type ActionItem = {
  type: ActionItemType;
  icon?: ReactNode;
  title?: string;
  url?: string;
  onClick?: () => void;
};

export type DataTableActionsProps = {
  children: ReactNode;
  actions: ActionItem[];
};

export function DataTableActions({ children, actions }: DataTableActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      {/* <DropdownMenuContent align="end" className="min-w-[180px]">
        
        <Link to={`/roles/${role.id}`}>
            <DropdownMenuItem className="cursor-pointer capitalize">Views Details</DropdownMenuItem>
          </Link>

        <DropdownMenuSeparator />

        {role.status === ROLE_STATUS.ACTIVE ? (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={async () => {
              await dispatch(deactivateRoleById(role._id));
            }}
          >
            <DiamondMinusIcon />
            Deactivate
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={async () => {
              await dispatch(activateRoleById(role._id));
            }}
          >
            <DiamondPlusIcon />
            Activate
          </DropdownMenuItem>
        )}

        <DropdownMenuItem onClick={handleDeleteClick} className="focus:bg-red-500 focus:text-white text-red-400">
          <Trash2Icon />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent> */}
    </DropdownMenu>
  );
}
