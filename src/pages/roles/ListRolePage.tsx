import { Plus } from "lucide-react";
import { ContentWrapper } from "@/components/ContentWrapper";
import { Heading } from "@/components/Heading";
import { CreateRoleDialogForm } from "@/components/form/role/CreateRoleDialogForm";
import { RoleListTable } from "@/components/form/role/RoleListTable";
import { roleColumns } from "@/pages/roles/role-columns";
import { Button } from "@/components/ui/button";

export function ListRolePage() {
  return (
    <ContentWrapper>
      <Heading
        title="Roles"
        description="Create and manage Roles for your applications. Roles contain collections of Permissions."
        actionRight={
          <CreateRoleDialogForm>
            <Button>
              <Plus size={14} />
              Create Role
            </Button>
          </CreateRoleDialogForm>
        }
      />

      <RoleListTable columns={roleColumns} />
    </ContentWrapper>
  );
}
