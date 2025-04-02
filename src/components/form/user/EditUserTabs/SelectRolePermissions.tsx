import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Role } from "@/types/role";
import { editListRolePermissions, getListRolePermissions } from "@/redux/role/role.thunk";
import { Spinner } from "@/components/spinner";
import { Permission } from "@/types/permission";
import { FlexBox } from "@/components/FlexBox";
import { getListPermission } from "@/redux/permission/permission.thunk";
import { PermissionItem } from "@/components/permissions-group/PermissionItem";
import { PermissionsGroupWrapper } from "@/components/permissions-group/PermissionsGroupWrapper";
import { PermissionsGroup } from "@/components/permissions-group/PermissionsGroup";
import { LoadingButton } from "@/components/LoadingButton";
import { EditListRolePermissionsResponse } from "@/redux/role/role.type";

export function SelectRolePermissions({ role }: { role: Role }) {
  const dispatch = useAppDispatch();
  const { listRolePermissions, loading: roleLoading } = useAppSelector((state) => state.role);
  const { list: listPermission, loading: permissionLoading } = useAppSelector((state) => state.permission);

  const [selectedPermissionIds, setSelectedPermissionIds] = useState<Set<string>>(new Set());

  const fetchPermissions = useCallback(async () => {
    try {
      await Promise.all([
        dispatch(getListRolePermissions({ limit: 100, roleId: role.id, page: 1 })).unwrap(),
        dispatch(getListPermission({ limit: 100, page: 1 })).unwrap(),
      ]);
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  }, [role]);

  useEffect(() => {
    fetchPermissions();
  }, [fetchPermissions]);

  useEffect(() => {
    setSelectedPermissionIds(new Set(listRolePermissions.map((per) => per.id)));
  }, [listRolePermissions]);

  const groupPermission = useMemo(() => {
    return listPermission.reduce<Record<string, Permission[]>>((acc, permission) => {
      acc[permission.module] = acc[permission.module] || [];
      acc[permission.module].push(permission);
      return acc;
    }, {});
  }, [listPermission]);

  const permissionHandlers = useMemo(
    () => ({
      areAllModulePermissionsEnabled: (module: string) => {
        const modulePermissions = groupPermission[module];
        return modulePermissions?.every((p) => selectedPermissionIds.has(p.id)) ?? false;
      },

      toggleModulePermissions: (module: string, enable: boolean) => {
        const modulePermissions = groupPermission[module];
        setSelectedPermissionIds((current) => {
          const newSet = new Set(current);
          modulePermissions?.forEach((p) => {
            enable ? newSet.add(p.id) : newSet.delete(p.id);
          });
          return newSet;
        });
      },

      isPermissionEnabled: (permissionId: string) => selectedPermissionIds.has(permissionId),

      togglePermission: (permissionId: string) => {
        setSelectedPermissionIds((current) => {
          const newSet = new Set(current);
          current.has(permissionId) ? newSet.delete(permissionId) : newSet.add(permissionId);
          return newSet;
        });
      },
    }),
    [groupPermission, selectedPermissionIds]
  );

  const handleEditRolePermissions = async () => {
    try {
      const response: EditListRolePermissionsResponse = await dispatch(
        editListRolePermissions({ roleId: role.id, permissionIds: Array.from(selectedPermissionIds) })
      ).unwrap();
      setSelectedPermissionIds(new Set(response.data.map((item) => item.id)));
      toast({ title: "Edit role permissions successful" });
    } catch (err: any) {
      toast({ title: err, variant: "destructive" });
    }
  };

  if (roleLoading.getListRolePermissions || permissionLoading.getListPermission) {
    return (
      <div className="flex items-center justify-center w-full">
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <FlexBox className="w-full">
      {Object.entries(groupPermission).map(([module, permissions]) => (
        <PermissionsGroupWrapper key={module}>
          <PermissionsGroup
            module={module}
            lengthItems={permissions.length}
            allChecked={permissionHandlers.areAllModulePermissionsEnabled(module)}
            onClickAction={() =>
              permissionHandlers.toggleModulePermissions(
                module,
                !permissionHandlers.areAllModulePermissionsEnabled(module)
              )
            }
          >
            <div className="space-y-3">
              {permissions.map((permission) => (
                <PermissionItem
                  key={permission.id}
                  name={permission.name}
                  description={permission.description}
                  checked={permissionHandlers.isPermissionEnabled(permission.id)}
                  onCheckedChange={() => permissionHandlers.togglePermission(permission.id)}
                />
              ))}
            </div>
          </PermissionsGroup>
        </PermissionsGroupWrapper>
      ))}
      <FlexBox className="justify-between" direction="row">
        <LoadingButton
          disabled={roleLoading.editListRolePermissions}
          loading={roleLoading.editListRolePermissions}
          onClick={handleEditRolePermissions}
        >
          Save
        </LoadingButton>
      </FlexBox>
    </FlexBox>
  );
}
