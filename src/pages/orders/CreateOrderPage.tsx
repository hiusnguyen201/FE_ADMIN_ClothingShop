import { ContentWrapper } from "@/components/ContentWrapper";
import { CreateCustomerDialogForm } from "@/components/form/customer/CreateCustomerDialogForm";
import { CreateOrderForm } from "@/components/form/order/CreateOrderForm";
import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

export function CreateOrderPage() {
  const [open, setOpen] = useState(false);

  return (
    <ContentWrapper>
      <Heading
        title="Create Order"
        actionRight={
          <CreateCustomerDialogForm open={open} onOpenChange={setOpen} finishRedirect={false}>
            <Button onClick={() => setOpen(true)}>
              <Plus size={14} />
              Create Customer
            </Button>
          </CreateCustomerDialogForm>
        }
      />

      <CreateOrderForm />
    </ContentWrapper>
  );
}
