import { FlexBox } from "@/components/FlexBox";
import { AlertBox } from "@/components/AlertBox";
import { EditOrderInfoForm } from "@/components/form/order/EditOrderTabs/EditOrderInfoForm";
import { RemoveOrderDialogForm } from "@/components/form/order/RemoveOrderDialogForm";
import { Button } from "@/components/ui/button";
import { Order } from "@/types/order";

export function EditOrderSettingsPage({ order }: { order: Order }) {
  return (
    <FlexBox size="large">
      {/* Edit Form */}
      <EditOrderInfoForm order={order} />

      <FlexBox size="small">
        <h2 className="text-lg font-medium">Danger Zone</h2>

        <AlertBox
          title="Remove Order"
          description="Once confirmed, this operation can't be undone!"
          rightAction={
            <RemoveOrderDialogForm order={order}>
              <Button variant="destructive" className="capitalize rounded text-white">
                Remove
              </Button>
            </RemoveOrderDialogForm>
          }
        />
      </FlexBox>
    </FlexBox>
  );
}
