import { Plus } from "lucide-react";
import { ContentWrapper } from "@/components/ContentWrapper";
import { Heading } from "@/components/Heading";
import { ProductListTable } from "@/components/form/product/ProductListTable";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { usePermission } from "@/hooks/use-permission";
import { PERMISSIONS } from "@/constants/permissions";

export function ListProductPage() {
  const can = usePermission();
  return (
    <ContentWrapper>
      <Heading
        title="Products"
        description="An easy to use UI to help administrators manage product."
        actionRight={
          can(PERMISSIONS.CREATE_PRODUCT) && (
            <Link to={"/products/new"}>
              <Button>
                <Plus size={14} />
                Add New Product
              </Button>
            </Link>
          )
        }
      />

      {can(PERMISSIONS.READ_PRODUCTS) && <ProductListTable />}
    </ContentWrapper>
  );
}
