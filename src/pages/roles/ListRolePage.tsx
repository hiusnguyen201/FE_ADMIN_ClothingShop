import { Plus } from "lucide-react";
import { ContentWrapper } from "@/components/ContentWrapper";
import { Heading } from "@/components/Heading";
import { ButtonOpenCreateRoleDialog, CreateRoleDialogFormProvider } from "@/components/form/role/CreateRoleDialogForm";
import { RoleListDataTable } from "@/components/form/role/RoleListDataTable";
import { rowColumns } from "@/pages/roles/row-columns";
import { Button } from "@/components/ui/button";

export function ListRolePage() {
  return (
    <ContentWrapper>
      <Heading
        title="Roles"
        description="Create and manage Roles for your applications. Roles contain collections of Permissions."
        actionRight={
          <CreateRoleDialogFormProvider>
            <ButtonOpenCreateRoleDialog>
              <Button>
                <Plus size={14} />
                Create Role
              </Button>
            </ButtonOpenCreateRoleDialog>
          </CreateRoleDialogFormProvider>
        }
      />

      <RoleListDataTable columns={rowColumns} />
    </ContentWrapper>
  );
}
