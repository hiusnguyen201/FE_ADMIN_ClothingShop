import { Plus } from "lucide-react";
import { ContentWrapper } from "@/components/ContentWrapper";
import { Heading } from "@/components/Heading";
import { CreateRoleDialogForm } from "@/components/form/role/CreateRoleDialogForm";
import { RoleListTable } from "@/components/form/role/RoleListTable";
import { Button } from "@/components/ui/button";
import { usePermission } from "@/hooks/use-permission";
import { PERMISSIONS } from "@/constants/permissions";

export function ListRolePage() {
  const can = usePermission();
  return (
    <ContentWrapper className="lg:max-w-6xl">
      <Heading
        title="Roles"
        description="Create and manage Roles for your applications. Roles contain collections of Permissions."
        actionRight={
          can(PERMISSIONS.CREATE_ROLE) && (
            <CreateRoleDialogForm>
              <Button>
                <Plus size={14} />
                Create Role
              </Button>
            </CreateRoleDialogForm>
          )
        }
      />
      {can(PERMISSIONS.READ_ROLES) && <RoleListTable />}
    </ContentWrapper>
  );
}
