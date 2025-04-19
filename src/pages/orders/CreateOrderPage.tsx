import { ContentWrapper } from "@/components/ContentWrapper";
import { CreateOrderForm } from "@/components/form/order/CreateOrderForm";
import { Heading } from "@/components/Heading";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function CreateOrderPage() {
  return (
    <ContentWrapper>
      <Link to={"/orders"} className="flex items-center gap-2 text-sm">
        <ArrowLeft size={16} />
        <span>Back to orders</span>
      </Link>

      <Heading title="Create Order" />

      <CreateOrderForm />
    </ContentWrapper>
  );
}
