import { Plus } from "lucide-react";
import { ContentWrapper } from "@/components/ContentWrapper";
import { Heading } from "@/components/Heading";
import { CreateCustomerDialogForm } from "@/components/form/customer/CreateCustomerDialogForm";
import { CustomerListTable } from "@/components/form/customer/CustomerListTable";
import { Button } from "@/components/ui/button";

export function ListCustomerPage() {
  return (
    <ContentWrapper>
      <Heading
        title="Customers"
        description="An easy to use UI to help administrators manage customer identities including password resets, creating and provisioning and removing customers."
        actionRight={
          <CreateCustomerDialogForm>
            <Button>
              <Plus size={14} />
              Create Customer
            </Button>
          </CreateCustomerDialogForm>
        }
      />

      <CustomerListTable />
    </ContentWrapper>
  );
}
