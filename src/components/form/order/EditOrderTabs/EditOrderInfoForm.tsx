import * as Yup from "yup";
import { Order } from "@/types/order";
import { EditOrderInfoPayload, OrderState } from "@/redux/order/order.type";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { editOrderInfo } from "@/redux/order/order.thunk";
import { FormikHelpers, FormikProps, useFormik } from "formik";
import { toast } from "@/hooks/use-toast";
import { InputFormikField } from "@/components/formik-fields";
import { LoadingButton } from "@/components/LoadingButton";
import { FlexBox } from "@/components/FlexBox";
import { REGEX_PATTERNS } from "@/types/constant";
import { getListRole } from "@/redux/role/role.thunk";
import { useEffect } from "react";

const editOrderInfoSchema = Yup.object().shape({
  name: Yup.string().required().min(3).max(50),
  email: Yup.string().required().email(),
  phone: Yup.string()
    .required()
    .matches(REGEX_PATTERNS.PHONE_NUMBER["VN"], { message: "phone is not Vietnam phone number" }),
});

export function EditOrderInfoForm({ order }: { order: Order }) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector<OrderState>((selector) => selector.order);

  const initialValues: EditOrderInfoPayload = {
    id: order.id,
  };

  const handleSubmit = async (values: EditOrderInfoPayload, { resetForm }: FormikHelpers<EditOrderInfoPayload>) => {
    try {
      await dispatch(editOrderInfo(values)).unwrap();
      resetForm();
      toast({ title: "Edit order successful" });
    } catch (error: any) {
      toast({ variant: "destructive", title: error });
    }
  };

  const formik: FormikProps<EditOrderInfoPayload> = useFormik({
    initialValues,
    validationSchema: editOrderInfoSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  useEffect(() => {
    (async () => {
      await dispatch(getListRole({ page: 1, limit: 100 })).unwrap();
    })();
  }, []);

  return (
    <FlexBox size="large" onSubmit={formik.handleSubmit} component="form" className="max-w-[600px]">
      <FlexBox>{/* // */}</FlexBox>

      <LoadingButton loading={loading.editOrder} disabled={loading.editOrder}>
        Save
      </LoadingButton>
    </FlexBox>
  );
}
