import { ContentWrapper } from "@/components/ContentWrapper";
import { CreateProductForm } from "@/components/form/product/CreateProductForm";
import { Heading } from "@/components/Heading";
import { PERMISSIONS } from "@/constants/permissions";
import { usePermission } from "@/hooks/use-permission";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function CreateProductPage() {
  const can = usePermission();

  return (
    <ContentWrapper className="max-w-6xl">
      <Link to={"/products"} className="flex items-center gap-2 text-sm">
        <ArrowLeft size={16} />
        <span>Back to Products</span>
      </Link>

      <Heading title="New Product" />

      {can(PERMISSIONS.CREATE_PRODUCT) && <CreateProductForm />}
    </ContentWrapper>
  );
}
