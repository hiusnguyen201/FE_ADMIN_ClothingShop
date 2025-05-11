import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useCallback, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { Role } from "@/types/role";
import { getListAssignedRolePermissions } from "@/redux/role/role.thunk";
import { FlexBox } from "@/components/FlexBox";
import { DataTable, DataTableLoading } from "@/components/data-table";
import { useRolePermissionsTableFilters } from "./useRolePermissionsTableFilters";
import { RoleState } from "@/redux/role/role.type";
import { SearchFormField } from "@/components/form-fields/SearchFormFIeld";
import { rolePermissionsColumns } from "./role-permissions-columns";
import { PermissionFieldsSort } from "@/redux/permission/permission.type";

export function RolePermissionsListTable({ role }: { role: Role }) {
  const dispatch = useAppDispatch();
  const {
    assignedRolePermissions,
    loading: roleLoading,
    initializedListRolePermission,
  } = useAppSelector<RoleState>((state) => state.role);
  const { filters, handleKeywordChange, handleSortChange } = useRolePermissionsTableFilters(role.id);

  const handleGetPermissions = async () => {
    try {
      await dispatch(getListAssignedRolePermissions(filters)).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  useEffect(() => {
    handleGetPermissions();
  }, [filters]);

  return (
    <FlexBox className="w-full items-center">
      <DataTableLoading initialized={initializedListRolePermission} className="flex flex-col gap-6 w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3">
          <SearchFormField
            name="keyword"
            disabled={roleLoading.getListAssignedRolePermissions}
            value={filters.keyword}
            onValueChange={handleKeywordChange}
            placeholder="Enter a keyword"
          />
        </div>

        <DataTable
          loading={roleLoading.getListAssignedRolePermissions}
          onSortingChange={(sorting) => {
            handleSortChange(sorting[0]?.id as PermissionFieldsSort, sorting[0]?.desc);
          }}
          data={assignedRolePermissions.map((permission) => ({ role, permission }))}
          placeholder="No roles found. Note: if a role was just created/deleted, it takes some time for it to be indexed."
          columns={rolePermissionsColumns}
          heightPerRow={77}
        />
      </DataTableLoading>
    </FlexBox>
  );
}
