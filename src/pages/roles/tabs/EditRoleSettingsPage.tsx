import { FlexBox } from "@/components/FlexBox";
import { AlertBox } from "@/components/AlertBox";
import { EditRoleInfoForm } from "@/components/form/role/EditRoleTabs/EditRoleInfoForm";
import { RemoveRoleDialogForm } from "@/components/form/role/RemoveRoleDialogForm";
import { Button } from "@/components/ui/button";
import { Role } from "@/types/role";

export function EditRoleSettingsPage({ role }: { role: Role }) {
  return (
    <FlexBox size="large">
      {/* Edit Form */}
      <EditRoleInfoForm role={role} />

      <FlexBox size="small">
        <h2 className="text-lg font-medium">Danger Zone</h2>

        <AlertBox
          title="Remove Role"
          description="Once confirmed, this operation can't be undone!"
          rightAction={
            <RemoveRoleDialogForm role={role}>
              <Button variant="destructive" className="capitalize rounded text-white">
                Remove
              </Button>
            </RemoveRoleDialogForm>
          }
        />
      </FlexBox>
    </FlexBox>
  );
}
