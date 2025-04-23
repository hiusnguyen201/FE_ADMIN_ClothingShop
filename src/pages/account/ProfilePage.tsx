import { ContentWrapper } from "@/components/ContentWrapper";
import { ChangePasswordForm } from "@/components/form/account/ChangePasswordForm";
import { EditProfileForm } from "@/components/form/account/EditProfileForm";
import { Heading } from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";

export function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return <></>;
  }

  return (
    <ContentWrapper className="lg:max-w-5xl">
      <Heading title="Account Settings" />

      <div className="border rounded-lg p-8">
        <h2 className="text-xl font-medium mb-6">Profile</h2>

        <EditProfileForm account={user} />

        <Separator className="my-8" orientation="horizontal" />

        <h2 className="text-xl font-medium mb-6">Security</h2>
        <div className="w-full flex items-center justify-end">
          <ChangePasswordForm account={user} />
        </div>
      </div>
    </ContentWrapper>
  );
}
