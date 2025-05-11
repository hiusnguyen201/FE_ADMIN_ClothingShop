import { ContentWrapper } from "@/components/ContentWrapper";
import { CreateOrderForm } from "@/components/form/order/CreateOrderForm";
import { Heading } from "@/components/Heading";
import { PERMISSIONS } from "@/constants/permissions";
import { usePermission } from "@/hooks/use-permission";
import { ArrowLeft } from "lucide-react";
import { Link, Navigate } from "react-router-dom";

export function CreateOrderPage() {
  const can = usePermission();
  if (!can(PERMISSIONS.CREATE_ORDER)) return <Navigate to="/forbidden" />;

  return (
    <ContentWrapper>
      <Link to={"/orders"} className="flex items-center gap-2 text-sm">
        <ArrowLeft size={16} />
        <span>Back to Orders</span>
      </Link>

      <Heading title="Create Order" />

      <CreateOrderForm />
    </ContentWrapper>
  );
}
