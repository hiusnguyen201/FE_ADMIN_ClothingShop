import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreateOrderPayload } from "@/redux/order/order.type";
import { ONLINE_PAYMENT_METHOD } from "@/types/payment";
import { FormikProps } from "formik";
import { Smartphone, Truck } from "lucide-react";

export function PaymentMethodCard({ formikProps }: { formikProps: FormikProps<CreateOrderPayload> }) {
  const { values, setFieldValue } = formikProps;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Payment Method Selection */}
        <RadioGroup
          value={values.paymentMethod}
          onValueChange={(value) => setFieldValue("paymentMethod", value)}
          className="grid grid-cols-1 gap-3"
        >
          <div className="flex items-start space-x-3 p-3 border rounded-md">
            <RadioGroupItem value={ONLINE_PAYMENT_METHOD.MOMO} id={ONLINE_PAYMENT_METHOD.MOMO} />
            <div className="space-y-1">
              <Label htmlFor={ONLINE_PAYMENT_METHOD.MOMO} className="flex items-center cursor-pointer capitalize">
                <Smartphone className="mr-2 h-4 w-4" />
                {ONLINE_PAYMENT_METHOD.MOMO}
              </Label>
              <p className="text-sm text-muted-foreground">Mobile money payment service</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 border rounded-md">
            <RadioGroupItem value={ONLINE_PAYMENT_METHOD.COD} id={ONLINE_PAYMENT_METHOD.COD} />
            <div className="space-y-1">
              <Label htmlFor={ONLINE_PAYMENT_METHOD.COD} className="flex items-center cursor-pointer capitalize">
                <Truck className="mr-2 h-4 w-4" />
                {ONLINE_PAYMENT_METHOD.COD}
              </Label>
              <p className="text-sm text-muted-foreground">Cash on delivery</p>
            </div>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
