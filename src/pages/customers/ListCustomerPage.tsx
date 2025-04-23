import { Plus } from "lucide-react";
import { ContentWrapper } from "@/components/ContentWrapper";
import { Heading } from "@/components/Heading";
import { CreateCustomerDialogForm } from "@/components/form/customer/CreateCustomerDialogForm";
import { CustomerListTable } from "@/components/form/customer/CustomerListTable";
import { Button } from "@/components/ui/button";
import { usePermission } from "@/hooks/use-permission";
import { PERMISSIONS } from "@/constants/permissions";

export function ListCustomerPage() {
  const can = usePermission();

  return (
    <ContentWrapper>
      <Heading
        title="Customers"
        description="An easy to use UI to help administrators manage customer identities including password resets, creating and provisioning and removing customers."
        actionRight={
          can(PERMISSIONS.CREATE_CUSTOMER) && (
            <CreateCustomerDialogForm>
              <Button>
                <Plus size={14} />
                Create Customer
              </Button>
            </CreateCustomerDialogForm>
          )
        }
      />

      {can(PERMISSIONS.READ_CUSTOMERS) && <CustomerListTable />}
    </ContentWrapper>
  );
}
