import { Fragment, useState } from 'react';
import { Heading } from '@/components/custom/heading';
import { PlaceholderCard, ContentPlaceholder } from '@/components/content-placeholder';
import { PlaceholderUserIcon } from '@/components/icons';
import { CreateUserDialogForm } from '@/pages/admin/users/create-user-dialog-form';
import { DataTable } from '@/components/data-table';

export default function UsersPage() {
  const [openFormCreate, setOpenFormCreate] = useState(false);

  const handleOpenFormCreate = () => {
    setOpenFormCreate(true);
  };

  const handleCloseFormCreate = () => {
    setOpenFormCreate(false);
  };

  return (
    <ContentPlaceholder>
      <Heading
        title="Users"
        description="An easy to use UI to help administrators manage user identities including password resets, creating and
        provisioning, and deleting users."
        actionText="Create User"
        onActionClick={handleOpenFormCreate}
      />

      {/* <PlaceholderCard
        icon={PlaceholderUserIcon}
        title="You don't have any users yet."
        description="All of your users will be found here, regardless of the authentication method they use to access your
        applications."
        actionText="Create User"
        onActionClick={handleOpenFormCreate}
      /> */}

      <DataTable />

      <CreateUserDialogForm open={openFormCreate} onClose={handleCloseFormCreate} />
    </ContentPlaceholder>
  );
}
