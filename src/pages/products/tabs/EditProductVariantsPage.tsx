import { FlexBox } from "@/components/FlexBox";
import { Product } from "@/types/product";
import { EditProductVariantsForm } from "@/components/form/product/EditProductTabs//EditProductVariantsForm";

export function EditProductVariantsPage({ product, canEditVariants }: { product: Product; canEditVariants: boolean }) {
  return (
    <FlexBox>
      <FlexBox size="large">{canEditVariants && <EditProductVariantsForm product={product} />}</FlexBox>
    </FlexBox>
  );
}
