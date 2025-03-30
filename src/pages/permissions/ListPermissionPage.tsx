import { ContentWrapper } from "@/components/ContentWrapper";
import { Heading } from "@/components/Heading";
import { PermissionListTable } from "@/components/form/permission/PermissionListTable";
import { permissionColumns } from "./permission-columns";

export function ListPermissionPage() {
  return (
    <ContentWrapper>
      <Heading title="Permissions" description="View Permissions for your applications." />

      <PermissionListTable columns={permissionColumns} />
    </ContentWrapper>
  );
}
