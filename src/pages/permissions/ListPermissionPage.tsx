import { ContentWrapper } from "@/components/ContentWrapper";
import { Heading } from "@/components/Heading";
import { PermissionListTable } from "@/components/form/permission/PermissionListTable";
import { PERMISSIONS } from "@/constants/permissions";
import { usePermission } from "@/hooks/use-permission";

export function ListPermissionPage() {
  const can = usePermission();
  return (
    <ContentWrapper>
      <Heading title="Permissions" description="View Permissions for your applications." />

      {can(PERMISSIONS.READ_PERMISSIONS) && <PermissionListTable />}
    </ContentWrapper>
  );
}
