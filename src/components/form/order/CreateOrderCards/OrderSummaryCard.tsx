import { LoadingButton } from "@/components/LoadingButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CreateOrderPayload } from "@/redux/order/order.type";
import { formatCurrencyVND } from "@/utils/string";
import { FormikProps } from "formik";

export function OrderSummaryCard({
  formikProps,
  className,
}: {
  formikProps: FormikProps<CreateOrderPayload>;
  className?: string;
}) {
  const { values, isSubmitting, handleSubmit } = formikProps;

  const calculateTotal = () => {
    return values.productVariants.reduce((total, variant) => total + variant.price * variant.quantity, 0);
  };

  return (
    <div className={cn("space-y-6", className)}>
      <Card className="sticky top-20 group-has-[[data-collapsible=icon]]/sidebar-wrapper:top-16">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
          <CardDescription>Review order details before submission</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {values.productVariants.length === 0 ? (
            <p className="text-muted-foreground text-center py-6">No products selected</p>
          ) : (
            <>
              {values.productVariants.map((variant) => (
                <div key={variant.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 rounded-sm border">
                      {variant.product.thumbnail && (
                        <AvatarImage src={variant.product.thumbnail} alt={variant.product.name} />
                      )}
                      <AvatarFallback className="rounded-full capitalize">
                        {variant.product.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span>{variant.product.name}</span>
                      <span className="text-muted-foreground text-sm">
                        Variation: {variant.variantValues.map((value) => value.optionValue.valueName).join(", ")}
                      </span>
                      <span className="text-sm">× {variant.quantity}</span>
                    </div>
                  </div>
                  <span>{formatCurrencyVND(variant.price)}</span>
                </div>
              ))}
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>{formatCurrencyVND(calculateTotal())}</span>
                </div>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter>
          <LoadingButton
            onClick={() => handleSubmit()}
            loading={isSubmitting}
            type="submit"
            className="w-full"
            disabled={isSubmitting || values.productVariants.length === 0}
          >
            Create Order
          </LoadingButton>
        </CardFooter>
      </Card>
    </div>
  );
}
