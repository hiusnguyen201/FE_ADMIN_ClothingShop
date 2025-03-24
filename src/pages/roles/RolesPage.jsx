import * as React from "react";
import { Plus } from "lucide-react";
import { DataTableWrapper } from "@/components/data-table";
import { Heading } from "@/components/Heading";
import { ButtonOpenCreateRoleDialog, CreateRoleDialogProvider } from "@/components/form/role/CreateRoleDialog";
import { RoleListDataTable } from "@/components/form/role/RoleListDataTable";

export function RolesPage() {
  return (
    <CreateRoleDialogProvider>
      <DataTableWrapper>
        <Heading
          title="Roles"
          description="Create and manage Roles for your applications. Roles contain collections of Permissions and can be assigned to Users."
          actionRight={
            <ButtonOpenCreateRoleDialog>
              <Plus size={14} />
              Create Role
            </ButtonOpenCreateRoleDialog>
          }
        />

        <RoleListDataTable />
      </DataTableWrapper>
    </CreateRoleDialogProvider>
  );
}
