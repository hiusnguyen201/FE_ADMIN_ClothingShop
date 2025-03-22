import { PlaceholderCard } from '@/components/content-placeholder';
import { PlaceholderUserIcon } from '@/components/icons';
import { useCreateUserDialog } from '@/pages/admin/users/create-user-dialog';
import { DataTable } from '@/components/data-table';
import { userColumns, fakeData } from '@/pages/admin/users/data-table/user-columns';
import { useState } from 'react';

export function UserDataTable() {
  const { openCreateUserDialog } = useCreateUserDialog();
  const [filters, setFilters] = useState({ keyword: '', sortBy: null, sortOrder: null, page: 1 });

  if (fakeData.length === 0) {
    return (
      <PlaceholderCard
        className="mt-6"
        icon={PlaceholderUserIcon}
        title="You don't have any users yet."
        description="All of your users will be found here, regardless of the authentication method they use to access your
        applications."
        actionText="Create User"
        onActionClick={openCreateUserDialog}
      />
    );
  }

  // console.log(filters);

  return (
    <DataTable
      className="mt-10"
      columns={userColumns}
      data={fakeData}
      totalPages={7}
      currentPage={filters.page}
      onKeywordChange={(search) => setFilters((prev) => ({ ...prev, keyword: search }))}
      onSortChange={(sort) =>
        setFilters((prev) => ({
          ...prev,
          sortBy: Object.keys(sort)[0] || null,
          sortOrder: Object.values(sort)[0] || null,
        }))
      }
      onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
    />
  );
}
