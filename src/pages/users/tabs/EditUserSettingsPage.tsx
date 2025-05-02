import { FlexBox } from "@/components/FlexBox";
import { AlertBox } from "@/components/AlertBox";
import { EditUserInfoForm } from "@/components/form/user/EditUserTabs/EditUserInfoForm";
import { RemoveUserDialogForm } from "@/components/form/user/RemoveUserDialogForm";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";
import { ResetPasswordUserDialogForm } from "@/components/form/user/ResetPasswordUserDialogForm";

export function EditUserSettingsPage({
  user,
  canResetPassword,
  canRemove,
  canEdit,
}: {
  user: User;
  canResetPassword: boolean;
  canRemove: boolean;
  canEdit: boolean;
}) {
  return (
    <FlexBox size="large">
      {/* Edit Form */}
      <EditUserInfoForm user={user} canEdit={canEdit} />

      {canRemove ||
        (canResetPassword && (
          <FlexBox size="small">
            <h2 className="text-lg font-medium">Danger Zone</h2>

            {canResetPassword && (
              <AlertBox
                title="Reset Password"
                description="Once confirmed, a new password will be generated and sent to the user!"
                rightAction={
                  <ResetPasswordUserDialogForm user={user}>
                    <Button variant="destructive" className="capitalize rounded text-white">
                      Reset
                    </Button>
                  </ResetPasswordUserDialogForm>
                }
              />
            )}

            {canRemove && (
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
            )}
          </FlexBox>
        ))}
    </FlexBox>
  );
}
