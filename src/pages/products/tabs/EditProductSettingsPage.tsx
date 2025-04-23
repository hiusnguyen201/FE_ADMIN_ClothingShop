import { FlexBox } from "@/components/FlexBox";
import { AlertBox } from "@/components/AlertBox";
import { EditProductInfoForm } from "@/components/form/product/EditProductTabs/EditProductInfoForm";
import { RemoveProductDialogForm } from "@/components/form/product/RemoveProductDialogForm";
import { Button } from "@/components/ui/button";
import { Product, PRODUCT_STATUS } from "@/types/product";

export function EditProductSettingsPage({
  product,
  canRemove,
  canEdit,
}: {
  product: Product;
  canRemove: boolean;
  canEdit: boolean;
}) {
  return (
    <FlexBox size="large">
      {/* Edit Form */}
      {canEdit && <EditProductInfoForm product={product} />}

      {canRemove && product.status === PRODUCT_STATUS.INACTIVE && (
        <FlexBox size="small">
          <h2 className="text-lg font-medium">Danger Zone</h2>

          <AlertBox
            title="Remove Product"
            description="Once confirmed, this operation can't be undone!"
            rightAction={
              <RemoveProductDialogForm product={product}>
                <Button variant="destructive" className="capitalize rounded text-white">
                  Remove
                </Button>
              </RemoveProductDialogForm>
            }
          />
        </FlexBox>
      )}
    </FlexBox>
  );
}
