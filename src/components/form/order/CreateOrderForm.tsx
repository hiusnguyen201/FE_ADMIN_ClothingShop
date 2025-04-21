import * as Yup from "yup";
import { FormikHelpers, FormikProps, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { toast } from "@/hooks/use-toast";
import { createOrder } from "@/redux/order/order.thunk";
import { CreateOrderPayload, CreateOrderResponse, OrderState } from "@/redux/order/order.type";
import { REGEX_PATTERNS } from "@/types/constant";
import { OFFLINE_PAYMENT_METHOD, ONLINE_PAYMENT_METHOD, PAYMENT_TYPE } from "@/types/payment";
import { FlexBox } from "@/components/FlexBox";
import {
  CustomerInformationCard,
  OrderSummaryCard,
  PaymentMethodCard,
  ProductVariantsCard,
  ShippingInformationCard,
} from "@/components/form/order/CreateOrderCards";
import { OrderSuccessDialog } from "@/components/form/order/CreateOrderCards/OrderSuccessDialog";
import { useState } from "react";

const initialValues: CreateOrderPayload = {
  customerId: "",
  customerEmail: "",
  customerName: "",
  customerPhone: "",

  districtCode: "",
  provinceCode: "",
  wardCode: "",
  address: "",

  productVariants: [],

  paymentMethod: ONLINE_PAYMENT_METHOD.COD,

  selectedProductId: "",
};

const createOrderSchema = Yup.object().shape({
  customerId: Yup.string().required("customer is a required field"),
  customerName: Yup.string().required(),
  customerEmail: Yup.string().required().email(),
  customerPhone: Yup.string()
    .required()
    .matches(REGEX_PATTERNS.PHONE_NUMBER["VN"], { message: "phone is not Vietnam phone number" }),

  districtCode: Yup.string().required(),
  provinceCode: Yup.string().required(),
  wardCode: Yup.string().required(),
  address: Yup.string().required(),

  productVariants: Yup.array().of(
    Yup.object({
      id: Yup.string().required(),
      quantity: Yup.number().required().min(1),
      price: Yup.number().required().min(1000),
      sku: Yup.string().required(),
      product: Yup.object().shape({
        id: Yup.string().required(),
        name: Yup.string().required(),
        thumbnail: Yup.string().required(),
      }),
      variantValues: Yup.array().of(
        Yup.object({
          id: Yup.string().required(),
          option: Yup.object().shape({
            id: Yup.string().required(),
            name: Yup.string().required(),
          }),
          optionValue: Yup.object().shape({
            id: Yup.string().required(),
            valueName: Yup.string().required(),
          }),
        })
      ),
    })
  ),

  paymentMethod: Yup.string()
    .required("Payment method is required")
    .oneOf(Object.values(ONLINE_PAYMENT_METHOD), "Invalid payment method"),

  selectedProductId: Yup.string().nullable(),
});

export function CreateOrderForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const { newItem } = useAppSelector<OrderState>((selector) => selector.order);

  const handleSubmit = async (values: CreateOrderPayload, { resetForm }: FormikHelpers<CreateOrderPayload>) => {
    try {
      const { data: order } = await dispatch(createOrder(values)).unwrap();
      resetForm();
      if (order.payment.paymentMethod === ONLINE_PAYMENT_METHOD.MOMO) {
        setOpenDialog(true);
      } else {
        navigate("/orders/" + order.code);
      }
    } catch (error: any) {
      toast({ variant: "destructive", title: error });
    }
  };

  const formik: FormikProps<CreateOrderPayload> = useFormik({
    initialValues,
    validationSchema: createOrderSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <FlexBox>
      <div className="flex gap-8 w-full lg:flex-row flex-col">
        <div className="space-y-8 flex-grow">
          <CustomerInformationCard formikProps={formik} />

          <ShippingInformationCard formikProps={formik} />

          <ProductVariantsCard formikProps={formik} />

          <PaymentMethodCard formikProps={formik} />
        </div>

        <OrderSummaryCard className="lg:min-w-[362px]" formikProps={formik} />
      </div>

      {newItem && newItem.payment.paymentMethod === ONLINE_PAYMENT_METHOD.MOMO && (
        <OrderSuccessDialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          order={newItem}
          goTo={() => {
            navigate("/orders/" + newItem.code);
          }}
        />
      )}
    </FlexBox>
  );
}
