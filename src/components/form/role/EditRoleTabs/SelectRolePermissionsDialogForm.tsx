import * as Yup from "yup";
import { CreateDialogForm } from "@/components/dialog-form";
import { AddRolePermissionsPayload, RoleState } from "@/redux/role/role.type";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { FormikHelpers, useFormik } from "formik";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { addRolePermissions, getListUnassignedRolePermissions } from "@/redux/role/role.thunk";
import { Button } from "@/components/ui/button";
import { FlexBox } from "@/components/FlexBox";
import { Separator } from "@/components/ui/separator";
import { SearchFormField } from "@/components/form-fields/SearchFormFIeld";
import { Checkbox } from "@/components/ui/checkbox";
import { Role } from "@/types/role";
import { Spinner } from "@/components/spinner";
import { useDebouncedCallback } from "use-debounce";
import { Label } from "@/components/ui/label";
import { sortObjectByKeys } from "@/utils/object";
import { Permission } from "@/types/permission";

const addRolePermissionsSchema = Yup.object().shape({
  roleId: Yup.string().required(),
  permissionIds: Yup.array().of(Yup.string().required()).required().min(1),
});

type SelectRolePermissionsDialogFormProps = {
  role: Role;
  children?: ReactNode;
  open?: false;
  onOpenChange?: (value: boolean) => void;
};

export function SelectRolePermissionsDialogForm({
  role,
  children,
  open,
  onOpenChange,
}: SelectRolePermissionsDialogFormProps) {
  const dispatch = useAppDispatch();
  const { unassignedRolePermissions, loading } = useAppSelector<RoleState>((state) => state.role);
  const [search, setSearch] = useState<string>("");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const handleKeywordChange = useDebouncedCallback((keyword: string) => {
    setSearch(keyword);
  }, 500);

  const initialValues: AddRolePermissionsPayload = {
    roleId: role.id,
    permissionIds: [],
  };

  const handleSubmit = async (
    values: AddRolePermissionsPayload,
    { resetForm }: FormikHelpers<AddRolePermissionsPayload>
  ) => {
    try {
      await dispatch(addRolePermissions(values)).unwrap();
      resetForm();
      toast({ title: "Add role permissions successful" });
    } catch (error: any) {
      toast({ variant: "destructive", title: error });
    }
  };

  const getAvailablePermissions = async () => {
    try {
      await dispatch(
        getListUnassignedRolePermissions({ page: 1, limit: 100, roleId: role.id, keyword: search })
      ).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  useEffect(() => {
    getAvailablePermissions();
  }, [dispatch, search]);

  const groupPermissions = useMemo(() => {
    const grouped = unassignedRolePermissions.reduce<Record<string, typeof unassignedRolePermissions>>((acc, item) => {
      const key = item.module;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});
    return sortObjectByKeys(grouped);
  }, [unassignedRolePermissions]);

  return (
    <CreateDialogForm
      className="sm:max-w-5xl"
      title="Add Permissions"
      titleSubmit="Add Permissions"
      open={open}
      trigger={children}
      onOpenChange={onOpenChange}
      initialValues={initialValues}
      validationSchema={addRolePermissionsSchema}
      onSubmit={handleSubmit}
      loading={loading.addRolePermissions}
      onClose={() => setSelectedPermissions([])}
    >
      {(formik: ReturnType<typeof useFormik<AddRolePermissionsPayload>>) => (
        <FlexBox size="small" className="text-sm">
          <p>Select permissions from existing APIs</p>

          <div className="flex items-center w-full justify-between">
            <h2 className="font-medium">Permissions</h2>
            <div className="flex items-center">
              <span className="mr-3">Select:</span>
              <Button
                variant="link"
                onClick={(e) => {
                  e.preventDefault();
                  formik.setFieldValue(
                    "permissionIds",
                    unassignedRolePermissions.map((item) => item.id)
                  );
                  setSelectedPermissions(unassignedRolePermissions.map((item) => item.id));
                }}
                className="text-blue-500 p-0 h-auto mr-3"
              >
                All
              </Button>
              <Separator orientation="vertical" className="data-[orientation=vertical]:h-4 mr-3" />
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  formik.setFieldValue("permissionIds", []);
                  setSelectedPermissions([]);
                }}
                variant="link"
                className="text-blue-500 p-0 h-auto mr-6"
              >
                None
              </Button>
              <SearchFormField
                name="search"
                placeholder="Filter Permissions"
                value={search}
                onValueChange={handleKeywordChange}
              />
            </div>
          </div>

          <div className="relative h-96 w-full border rounded-md overflow-scroll">
            {unassignedRolePermissions.length > 0 ? (
              Object.entries(groupPermissions).map(([module, permissions]: [string, Permission[]]) => (
                <div key={module} className="m-4 flex flex-col">
                  <Label className="capitalize mb-2">{module}</Label>
                  <ul className="flex flex-wrap gap-3">
                    {permissions.map((permission) => (
                      <li key={permission.id}>
                        <label className="inline-flex items-center gap-2 py-2 px-3 rounded-md border cursor-pointer hover:bg-gray-100 select-none">
                          <Checkbox
                            id={permission.id}
                            checked={selectedPermissions.includes(permission.id)}
                            onCheckedChange={(checked: boolean) => {
                              formik.setErrors({});
                              const updatedSelectPermissions = checked
                                ? [...formik.values.permissionIds, permission.id]
                                : formik.values.permissionIds.filter((id) => id !== permission.id);
                              formik.setFieldValue("permissionIds", updatedSelectPermissions);
                              setSelectedPermissions(updatedSelectPermissions);
                            }}
                          />
                          <span>{permission.name}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <div className="flex justify-center absolute top-[50%] w-full text-gray-500">
                {loading.getListUnassignedRolePermissions ? <Spinner /> : <p>No Permissions found</p>}
              </div>
            )}
          </div>
        </FlexBox>
      )}
    </CreateDialogForm>
  );
}
