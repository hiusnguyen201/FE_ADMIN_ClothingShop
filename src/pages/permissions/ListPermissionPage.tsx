import { ContentWrapper } from "@/components/ContentWrapper";
import { Heading } from "@/components/Heading";
import { PermissionListDataTable } from "@/components/form/permission/PermissionListDataTable";
import { permissionColumns } from "./permission-columns";

export function ListPermissionPage() {
  return (
    <ContentWrapper>
      <Heading title="Permissions" description="View Permissions for your applications." />

      <PermissionListDataTable columns={permissionColumns} />
    </ContentWrapper>
  );
}
