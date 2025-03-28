import { FlexBox } from "@/components/FlexBox";
import { Button } from "@/components/ui/button";

export function EditRolePermissionsPage() {
  return (
    <FlexBox>
      <FlexBox direction="row">
        <p className="text-sm">
          Add Permissions to this Role. Users who have this Role will receive all Permissions below that match the API
          of their login request.
        </p>
        <Button>Add Permissions</Button>
      </FlexBox>
    </FlexBox>
  );
}
