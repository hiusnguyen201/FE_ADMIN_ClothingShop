import { FlexBox } from "@/components/FlexBox";
import { AlertBox } from "@/components/AlertBox";
import { EditUserInfoForm } from "@/components/form/user/EditUserTabs/EditUserInfoForm";
import { RemoveUserDialogForm } from "@/components/form/user/RemoveUserDialogForm";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";

export function EditUserSettingsPage({ user }: { user: User }) {
  return (
    <FlexBox size="large">
      {/* Edit Form */}
      <EditUserInfoForm user={user} />

      <FlexBox size="small">
        <h2 className="text-lg font-medium">Danger Zone</h2>

        <AlertBox
          title="Remove User"
          description="Once confirmed, this operation can't be undone!"
          rightAction={
            <RemoveUserDialogForm user={user}>
              <Button variant="destructive" className="capitalize rounded text-white">
                Remove
              </Button>
            </RemoveUserDialogForm>
          }
        />
      </FlexBox>
    </FlexBox>
  );
}
