import { Plus } from "lucide-react";
import { ContentWrapper } from "@/components/ContentWrapper";
import { Heading } from "@/components/Heading";
import { ButtonOpenCreateRoleDialog, CreateRoleDialogFormProvider } from "@/components/form/role/CreateRoleDialogForm";
import { RoleListDataTable } from "@/components/form/role/RoleListDataTable";

export function ListRolePage() {
  return (
    <ContentWrapper>
      <Heading
        title="Roles"
        description="Create and manage Roles for your applications. Roles contain collections of Permissions and can be assigned to Users."
        actionRight={
          <CreateRoleDialogFormProvider>
            <ButtonOpenCreateRoleDialog>
              <Plus size={14} />
              Create Role
            </ButtonOpenCreateRoleDialog>
          </CreateRoleDialogFormProvider>
        }
      />

      <RoleListDataTable />
    </ContentWrapper>
  );
}
