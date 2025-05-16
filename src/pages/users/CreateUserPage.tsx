import { ContentWrapper } from "@/components/ContentWrapper";
import { CreateUserForm } from "@/components/form/user/CreateUserForm";
import { Heading } from "@/components/Heading";
import { PERMISSIONS } from "@/constants/permissions";
import { usePermission } from "@/hooks/use-permission";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function CreateUserPage() {
  const can = usePermission();

  return (
    <ContentWrapper className="max-w-6xl">
      <Link to={"/users"} className="flex items-center gap-2 text-sm">
        <ArrowLeft size={16} />
        <span>Back to Users</span>
      </Link>

      <Heading title="Create User" />

      {can(PERMISSIONS.CREATE_USER) && <CreateUserForm />}
    </ContentWrapper>
  );
}
