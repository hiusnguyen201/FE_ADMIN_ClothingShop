import { FlexBox } from "@/components/FlexBox";
import { AlertBox } from "@/components/AlertBox";
import { EditCustomerInfoForm } from "@/components/form/customer/EditCustomerTabs/EditCustomerInfoForm";
import { RemoveCustomerDialogForm } from "@/components/form/customer/RemoveCustomerDialogForm";
import { Button } from "@/components/ui/button";
import { Customer } from "@/types/customer";

export function EditCustomerSettingsPage({
  customer,
  canEdit,
  canRemove,
}: {
  customer: Customer;
  canEdit: boolean;
  canRemove: boolean;
}) {
  return (
    <FlexBox size="large">
      {/* Edit Form */}
      <EditCustomerInfoForm customer={customer} canEdit={canEdit} />

      {canRemove && (
        <FlexBox size="small">
          <h2 className="text-lg font-medium">Danger Zone</h2>

          <AlertBox
            title="Remove Customer"
            description="Once confirmed, this operation can't be undone!"
            rightAction={
              <RemoveCustomerDialogForm customer={customer}>
                <Button variant="destructive" className="capitalize rounded text-white">
                  Remove
                </Button>
              </RemoveCustomerDialogForm>
            }
          />
        </FlexBox>
      )}
    </FlexBox>
  );
}
