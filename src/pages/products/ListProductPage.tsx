import { Plus } from "lucide-react";
import { ContentWrapper } from "@/components/ContentWrapper";
import { Heading } from "@/components/Heading";
import { ProductListTable } from "@/components/form/product/ProductListTable";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function ListProductPage() {
  return (
    <ContentWrapper>
      <Heading
        title="Products"
        description="An easy to use UI to help administrators manage product."
        actionRight={
          <Link to={"/products/new"}>
            <Button>
              <Plus size={14} />
              Add New Product
            </Button>
          </Link>
        }
      />

      <ProductListTable />
    </ContentWrapper>
  );
}
