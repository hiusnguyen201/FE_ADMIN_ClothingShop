import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useCallback, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { Role } from "@/types/role";
import { getListAssignedRolePermissions } from "@/redux/role/role.thunk";
import { FlexBox } from "@/components/FlexBox";
import { DataTable, DataTableLoading } from "@/components/data-table";
import { useRolePermissionsTableFilters } from "./useRolePermissionsTableFilters";
import { useSearchParams } from "react-router-dom";
import { convertToSearchParams } from "@/utils/object";
import { RoleState } from "@/redux/role/role.type";
import { SearchFormField } from "@/components/form-fields/SearchFormFIeld";
import { rolePermissionsColumns } from "@/pages/roles/tabs/role-permissions-columns";

export function RolePermissionsListTable({ role }: { role: Role }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const {
    assignedRolePermissions,
    loading: roleLoading,
    initializedListRolePermission,
  } = useAppSelector<RoleState>((state) => state.role);
  const { filters, isDefault, handleKeywordChange } = useRolePermissionsTableFilters({ searchParams, roleId: role.id });

  const fetchPermissions = useCallback(async () => {
    try {
      await dispatch(getListAssignedRolePermissions(filters)).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  }, [filters]);

  useEffect(() => {
    if (!isDefault) {
      setSearchParams(convertToSearchParams(filters));
    }

    fetchPermissions();
  }, [filters]);

  return (
    <FlexBox className="w-full items-center">
      <DataTableLoading initialized={initializedListRolePermission} className="flex flex-col gap-6 w-full">
        <div className="grid sm:grid-cols-3 grid-cols-2 items-center gap-3">
          <SearchFormField
            name="keyword"
            disabled={roleLoading.getListAssignedRolePermissions}
            className="col-span-3 sm:col-span-2"
            value={filters.keyword}
            onValueChange={handleKeywordChange}
            placeholder="Enter a keyword"
          />
        </div>

        <DataTable
          loading={roleLoading.getListAssignedRolePermissions}
          data={assignedRolePermissions.map((permission) => ({ role, permission }))}
          placeholder="No roles found. Note: if a role was just created/deleted, it takes some time for it to be indexed."
          columns={rolePermissionsColumns}
          heightPerRow={77}
        />
      </DataTableLoading>
    </FlexBox>
  );
}
