import { ContentWrapper } from "@/components/ContentWrapper";
import { Heading } from "@/components/Heading";
import { PermissionListTable } from "@/components/form/permission/PermissionListTable";

export function ListPermissionPage() {
  return (
    <ContentWrapper>
      <Heading title="Permissions" description="View Permissions for your applications." />

      <PermissionListTable />
    </ContentWrapper>
  );
}
