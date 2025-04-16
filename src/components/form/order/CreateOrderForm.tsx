import * as Yup from "yup";
import { FormikHelpers, FormikProps, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { toast } from "@/hooks/use-toast";
import { createOrder } from "@/redux/order/order.thunk";
import { CreateOrderPayload, CreateOrderResponse, OrderState } from "@/redux/order/order.type";
import { REGEX_PATTERNS } from "@/types/constant";
import { PAYMENT_METHOD } from "@/types/payment";
import { FlexBox } from "@/components/FlexBox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getListDistrict, getListProvince, getListWard } from "@/redux/division/division.thunk";
import { DivisionState } from "@/redux/division/division.type";
import { InputFormikField, SelectBoxFormikField, SelectObjectFormikField } from "@/components/formik-fields";
import { CustomerState } from "@/redux/customer/customer.type";
import { getListCustomer } from "@/redux/customer/customer.thunk";
import { useCustomerTableFilters } from "@/components/form/customer/CustomerListTable/useCustomerTableFilters";
import { ProductState } from "@/redux/product/product.type";
import { getListProduct, getProduct } from "@/redux/product/product.thunk";
import { useProductTableFilters } from "@/components/form/product/ProductListTable/useProductTableFilters";
import { Nullable } from "@/types/common";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductVariant } from "@/types/product";

const initialValues: CreateOrderPayload = {
  customerId: "",
  customerEmail: "",
  customerName: "",
  customerPhone: "",

  districtCode: "",
  provinceCode: "",
  wardCode: "",
  shippingAddress: "",

  productVariants: [],

  paymentMethod: PAYMENT_METHOD.DIRECT,
};

const createOrderSchema = Yup.object().shape({
  customerId: Yup.string().required(),
  customerName: Yup.string().required(),
  customerEmail: Yup.string().required().email(),
  customerPhone: Yup.string()
    .required()
    .matches(REGEX_PATTERNS.PHONE_NUMBER["VN"], { message: "phone is not Vietnam phone number" }),

  districtCode: Yup.string().required(),
  provinceCode: Yup.string().required(),
  wardCode: Yup.string().required(),
  shippingAddress: Yup.string().required(),

  productVariants: Yup.array().of(
    Yup.object({ variantId: Yup.string().required(), quantity: Yup.number().required().min(1) })
  ),

  paymentMethod: Yup.string().required().oneOf(Object.values(PAYMENT_METHOD)),
});

export function CreateOrderForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector<OrderState>((selector) => selector.order);
  const {
    loading: loadingCustomer,
    list: listCustomer,
    totalCount: totalCountCustomer,
  } = useAppSelector<CustomerState>((selector) => selector.customer);
  const { loading: loadingDivision, list: listDivision } = useAppSelector<DivisionState>(
    (selector) => selector.division
  );
  const {
    loading: loadingProduct,
    item: product,
    list: listProduct,
    totalCount: totalCountProduct,
  } = useAppSelector<ProductState>((selector) => selector.product);
  const { filters: filtersCustomer, handleKeywordChange: handleCustomerKeywordChange } = useCustomerTableFilters();
  const { filters: filtersProduct, handleKeywordChange: handleProductKeywordChange } = useProductTableFilters();

  const [selectedProductId, setSelectedProductId] = useState<Nullable<string>>("");

  const handleSubmit = async (values: CreateOrderPayload, { resetForm }: FormikHelpers<CreateOrderPayload>) => {
    try {
      const response: CreateOrderResponse = await dispatch(createOrder(values)).unwrap();
      resetForm();
      const { data: order, message } = response;
      toast({ title: message });
      navigate(`/orders/${order.id}/settings`);
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

  useEffect(() => {
    (async () => {
      await dispatch(
        getListCustomer({ page: filtersCustomer.page, limit: filtersCustomer.limit, keyword: filtersCustomer.keyword })
      ).unwrap();
    })();
  }, [filtersCustomer]);

  useEffect(() => {
    (async () => {
      await dispatch(
        getListProduct({ page: filtersProduct.page, limit: filtersProduct.limit, keyword: filtersProduct.keyword })
      ).unwrap();
    })();
  }, [filtersProduct]);

  useEffect(() => {
    (async () => {
      await dispatch(getListProvince()).unwrap();
    })();
  }, []);

  useEffect(() => {
    if (formik.values.provinceCode) {
      formik.setFieldValue("districtCode", "");
      formik.setFieldValue("wardCode", "");
      (async () => {
        await dispatch(getListDistrict({ provinceCode: formik.values.provinceCode })).unwrap();
      })();
    }
  }, [formik.values.provinceCode]);

  useEffect(() => {
    if (formik.values.districtCode) {
      formik.setFieldValue("wardCode", "");
      (async () => {
        await dispatch(getListWard({ districtCode: formik.values.districtCode })).unwrap();
      })();
    }
  }, [formik.values.districtCode]);

  useEffect(() => {
    if (formik.values.customerId) {
      const customer = listCustomer.find((item) => item.id === formik.values.customerId);
      formik.setFieldValue("customerName", customer?.name);
      formik.setFieldValue("customerPhone", customer?.phone);
      formik.setFieldValue("customerEmail", customer?.email);
    }
  }, [formik.values.customerId]);

  useEffect(() => {
    if (selectedProductId) {
      (async () => {
        await dispatch(getProduct({ id: selectedProductId })).unwrap();
      })();
    }
  }, [selectedProductId]);

  const [matchingVariant, setMatchingVariant] = useState<ProductVariant | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  useEffect(() => {
    if (product) {
      // Only try to find a matching variant if all options are selected
      const allOptionsSelected = product.productOptions.every((option) => selectedOptions[option.option.name]);

      if (allOptionsSelected) {
        const variant = product.productVariants.find((variant) => {
          // Check if all selected options match this variant
          return Object.entries(selectedOptions).every(([optionName, optionValue]) =>
            variant.variantValues.find(
              (item) => item.option.name === optionName && item.optionValue.valueName === optionValue
            )
          );
        });

        setMatchingVariant(variant || null);
      } else {
        setMatchingVariant(null);
      }
    }
  }, [selectedOptions, product]);

  return (
    <FlexBox>
      <div className="grid gap-8 w-full lg:grid-cols-[1fr_300px]">
        <div className="space-y-8">
          {/* Customer */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
              <CardDescription>Select an existing customer or create a new one</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <SelectObjectFormikField
                    searchable
                    searchValue={filtersCustomer.keyword}
                    onSearchClick={handleCustomerKeywordChange}
                    name="customerId"
                    placeHolder="Select customer"
                    options={listCustomer.map((item) => ({ title: item.email, value: item.id }))}
                    formikProps={formik}
                    description={
                      totalCountCustomer - listCustomer.length === 0
                        ? ""
                        : `+${totalCountCustomer - listCustomer.length} more`
                    }
                  />
                </div>

                {formik.values.customerId && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <InputFormikField
                      name="customerName"
                      placeholder="Enter customer name"
                      type="text"
                      formikProps={formik}
                    />
                    <InputFormikField
                      name="customerEmail"
                      placeholder="Enter customer email"
                      type="email"
                      formikProps={formik}
                    />
                    <InputFormikField
                      placeholder="Enter customer phone"
                      name="customerPhone"
                      type="tel"
                      formikProps={formik}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Shipping */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
              <CardDescription>Enter the shipping details for this order</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3 mb-4">
                <SelectObjectFormikField
                  disabled={listDivision.provinces.length === 0}
                  name="provinceCode"
                  className="w-full"
                  placeHolder="Select province"
                  options={listDivision.provinces.map((item) => ({ title: item.name, value: item.code }))}
                  formikProps={formik}
                />

                <SelectObjectFormikField
                  disabled={listDivision.districts.length === 0}
                  name="districtCode"
                  className="w-full"
                  placeHolder="Select district"
                  options={listDivision.districts.map((item) => ({ title: item.name, value: item.code }))}
                  formikProps={formik}
                />

                <SelectObjectFormikField
                  disabled={listDivision.wards.length === 0}
                  name="wardCode"
                  className="w-full"
                  placeHolder="Select ward"
                  options={listDivision.wards.map((item) => ({ title: item.name, value: item.code }))}
                  formikProps={formik}
                />
              </div>

              <InputFormikField
                name="shippingAddress"
                type="text"
                placeholder="House number, street name, etc."
                formikProps={formik}
              />
            </CardContent>
          </Card>

          {/* Product Variant */}
          <Card>
            <CardHeader>
              <CardTitle>Product Variants</CardTitle>
              <CardDescription>Select products for this order</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <SelectObjectFormikField
                    searchable
                    onSelectChange={(value) => setSelectedProductId(value)}
                    searchValue={filtersProduct.keyword}
                    onSearchClick={handleProductKeywordChange}
                    name="productId"
                    placeHolder="Choose a product"
                    options={listProduct.map((item) => ({ title: item.name, value: item.id }))}
                    formikProps={formik}
                    switchable
                    description={
                      totalCountProduct - listProduct.length === 0
                        ? ""
                        : `+${totalCountProduct - listProduct.length} more`
                    }
                  />
                </div>

                {selectedProductId && product && (
                  <>
                    <FlexBox size="medium" direction="row">
                      <div>
                        <Avatar className="h-32 w-32 rounded-sm">
                          {product.thumbnail && <AvatarImage src={product.thumbnail} alt={product.name} />}
                          <AvatarFallback className="rounded-full capitalize">{product.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex flex-col gap-2">
                        {product.productOptions.map((opt) => (
                          <div key={opt.option.id} className="text-sm flex flex-col gap-1">
                            <span className="block font-medium">{opt.option.name}</span>
                            <span className="flex items-center gap-2">
                              {opt.optionValues.map((value) => (
                                <Badge
                                  key={value.id}
                                  onClick={() =>
                                    setSelectedOptions((prev) => ({
                                      ...prev,
                                      ...{ [opt.option.name]: value.valueName },
                                    }))
                                  }
                                  className="min-w-[32px] flex items-center justify-center cursor-pointer"
                                  variant={
                                    Object.entries(selectedOptions).some(
                                      ([optionName, optionValue]) =>
                                        optionName === opt.option.name && optionValue === value.valueName
                                    )
                                      ? "default"
                                      : "outline"
                                  }
                                >
                                  {value.valueName}
                                </Badge>
                              ))}
                            </span>
                          </div>
                        ))}
                      </div>
                    </FlexBox>

                    {matchingVariant && (
                      <div className="mt-4 p-3 border rounded-md bg-muted/20">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{product?.name}</p>
                            <p className="text-sm text-muted-foreground">
                              SKU: {matchingVariant.sku} | Quantity: {matchingVariant.quantity}
                            </p>
                            <p className="text-sm">
                              Options:{" "}
                              {Object.entries(matchingVariant.variantValues)
                                .map(([_, value]) => `${value.option.name}: ${value.optionValue.valueName}`)
                                .join(", ")}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                matchingVariant.price
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-end">
                      <Button type="button">Add to Order</Button>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Select the payment method for this order</CardDescription>
            </CardHeader>
            <CardContent>
              <SelectBoxFormikField
                direction="column"
                name="paymentMethod"
                type="radio"
                options={Object.values(PAYMENT_METHOD)}
                formikProps={formik}
              />
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        {/* <div className="space-y-6">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Review order details before submission</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedVariants.length === 0 ? (
                <p className="text-muted-foreground text-center py-6">No products selected</p>
              ) : (
                <>
                  {selectedVariants.map((variant) => (
                    <div key={variant.id} className="flex justify-between">
                      <span>
                        {variant.name} × {variant.quantity}
                      </span>
                      <span>
                        {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                          variant.price * variant.quantity
                        )}
                      </span>
                    </div>
                  ))}
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>
                        {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                          calculateTotal()
                        )}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" size="lg" disabled={selectedVariants.length === 0}>
                Create Order
              </Button>
            </CardFooter>
          </Card>
        </div> */}
      </div>
    </FlexBox>
  );
}
