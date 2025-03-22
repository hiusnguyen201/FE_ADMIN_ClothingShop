import { Heading } from '@/components/custom/heading';
import { ContentPlaceholder } from '@/components/content-placeholder';
import { UserDataTable } from '@/pages/admin/users/data-table';
import { useCreateUserDialog } from '@/pages/admin/users/create-user-dialog';

export default function UsersPage() {
  const { openCreateUserDialog } = useCreateUserDialog();

  return (
    <ContentPlaceholder>
      <Heading
        title="Users"
        description="An easy to use UI to help administrators manage user identities including password resets, creating and
        provisioning, and deleting users."
        actionText="Create User"
        onActionClick={openCreateUserDialog}
      />

      <UserDataTable />
    </ContentPlaceholder>
  );
}
