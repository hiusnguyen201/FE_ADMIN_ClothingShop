import { Plus } from "lucide-react";
import { ContentWrapper } from "@/components/ContentWrapper";
import { Heading } from "@/components/Heading";
import { UserListTable } from "@/components/form/user/UserListTable";
import { Button } from "@/components/ui/button";
import { usePermission } from "@/hooks/use-permission";
import { PERMISSIONS } from "@/constants/permissions";
import { Link } from "react-router-dom";

export function ListUserPage() {
  const can = usePermission();
  return (
    <ContentWrapper>
      <Heading
        title="Users"
        description="An easy to use UI to help administrators manage user identities including password resets, creating and provisioning and removing users."
        actionRight={
          can(PERMISSIONS.CREATE_USER) && (
            <Link to={"/users/create"}>
              <Button>
                <Plus size={14} />
                Create User
              </Button>
            </Link>
          )
        }
      />
      {can(PERMISSIONS.READ_USERS) && <UserListTable />}
    </ContentWrapper>
  );
}
