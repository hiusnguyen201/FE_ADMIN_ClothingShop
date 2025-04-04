import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useCallback, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { Role } from "@/types/role";
import { getListRolePermissions } from "@/redux/role/role.thunk";
import { Permission } from "@/types/permission";
import { FlexBox } from "@/components/FlexBox";
import { DataTable, DataTableLoading } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useRolePermissionsTableFilters } from "./useRolePermissionsTableFilters";

export function RolePermissionsListTable({
  role,
  columns,
}: {
  role: Role;
  columns: ColumnDef<{ role: Role; permission: Permission }, any>[];
}) {
  const dispatch = useAppDispatch();
  const { assignedRolePermissions, loading: roleLoading } = useAppSelector((state) => state.role);
  const { filters } = useRolePermissionsTableFilters(role.id);

  const fetchPermissions = useCallback(async () => {
    try {
      await dispatch(getListRolePermissions(filters)).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  }, [filters]);

  useEffect(() => {
    fetchPermissions();
  }, [filters]);

  return (
    <FlexBox className="w-full items-center">
      <DataTableLoading loading={roleLoading.getListRolePermissions} className="flex flex-col gap-6 w-full">
        <DataTable
          data={assignedRolePermissions.map((permission) => ({ role, permission }))}
          placeholder="No roles found. Note: if a role was just created/deleted, it takes some time for it to be indexed."
          columns={columns}
          heightPerRow={77}
        />
      </DataTableLoading>
    </FlexBox>
  );
}
