import { Plus } from "lucide-react";
import { ContentWrapper } from "@/components/ContentWrapper";
import { Heading } from "@/components/Heading";
import { CreateUserDialogForm } from "@/components/form/user/CreateUserDialogForm";
import { UserListTable } from "@/components/form/user/UserListTable";
import { Button } from "@/components/ui/button";
import { userColumns } from "./user-columns";

export function ListUserPage() {
  return (
    <ContentWrapper>
      <Heading
        title="Users"
        description="An easy to use UI to help administrators manage user identities including password resets, creating and provisioning and removing users."
        actionRight={
          <CreateUserDialogForm>
            <Button>
              <Plus size={14} />
              Create User
            </Button>
          </CreateUserDialogForm>
        }
      />

      <UserListTable columns={userColumns} />
    </ContentWrapper>
  );
}
