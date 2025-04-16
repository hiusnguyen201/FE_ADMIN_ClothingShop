import { Plus } from "lucide-react";
import { ContentWrapper } from "@/components/ContentWrapper";
import { Heading } from "@/components/Heading";
import { OrderListTable } from "@/components/form/order/OrderListTable";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function ListOrderPage() {
  return (
    <ContentWrapper>
      <Heading
        title="Orders"
        description="An easy to use UI to help administrators manage order identities including password resets, creating and provisioning and removing orders."
        actionRight={
          <Link to="/orders/create">
            <Button>
              <Plus size={14} />
              Create Order
            </Button>
          </Link>
        }
      />

      <OrderListTable />
    </ContentWrapper>
  );
}
