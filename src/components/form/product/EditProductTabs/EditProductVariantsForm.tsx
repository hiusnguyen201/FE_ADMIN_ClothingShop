import * as Yup from "yup";
import { Fragment, useEffect, useMemo, useRef } from "react";
import { getListOption } from "@/redux/option/option.thunk";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Product } from "@/types/product";
import { OptionState } from "@/redux/option/option.type";
import { OptionGroup } from "@/components/form/product/_components/OptionGroup";
import { useFormik } from "formik";
import { CreateProductVariant, EditProductVariantsPayload, ProductState } from "@/redux/product/product.type";
import { FlexBox } from "@/components/FlexBox";
import { DataTable } from "@/components/data-table";
import { generateVariantsFromSelectedOptions } from "@/utils/variant";
import { getProductVariantsColumns } from "./product-variants.columns";
import { Label } from "@/components/ui/label";
import { ColumnDef } from "@tanstack/react-table";
import { LoadingButton } from "@/components/LoadingButton";
import { toast } from "@/hooks/use-toast";
import { editProductVariants } from "@/redux/product/product.thunk";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { InputFormField } from "@/components/form-fields/InputFormField";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const editProductVariantsSchema = Yup.object({
  options: Yup.array()
    .of(
      Yup.object({
        option: Yup.string().required(),
        selectedValues: Yup.array().of(Yup.string()).required().min(1),
      })
    )
    .required()
    .min(1),
  productVariants: Yup.array()
    .of(
      Yup.object({
        quantity: Yup.number().required().min(0).max(10000000),
        price: Yup.number().required().min(1000).max(100000000),
        sku: Yup.string().min(8).max(16).nullable(),
        variantValues: Yup.array()
          .of(
            Yup.object({
              option: Yup.string().required(),
              optionValue: Yup.string().required(),
            })
          )
          .required()
          .min(1),
      })
    )
    .required()
    .min(1),
});

export function EditProductVariantsForm({ product }: { product: Product }) {
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();
  const priceRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const skuRef = useRef<HTMLInputElement>(null);
  const { loading: loadingOption, list: options } = useAppSelector<OptionState>((selector) => selector.option);
  const { loading: loadingProduct } = useAppSelector<ProductState>((selector) => selector.product);

  const initialValues = {
    id: product.id,
    options: product.productOptions.map((opt) => ({
      option: opt.option.name,
      selectedValues: opt.optionValues.map((item) => item.valueName),
    })),
    productVariants: product.productVariants.map((variant) => ({
      price: variant.price,
      quantity: variant.quantity,
      sku: variant?.sku || "",
      variantValues: variant.variantValues.map((val) => ({
        option: val.option.name,
        optionValue: val.optionValue.valueName,
      })),
    })),
  };

  useEffect(() => {
    (async () => {
      await dispatch(getListOption());
    })();
  }, []);

  const formik = useFormik<EditProductVariantsPayload>({
    initialValues,
    validationSchema: editProductVariantsSchema,
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
    onSubmit: async (values: EditProductVariantsPayload) => {
      try {
        await dispatch(editProductVariants(values)).unwrap();
        toast({ title: "Edit product successful" });
      } catch (error: any) {
        toast({ variant: "destructive", title: error });
      }
    },
  });

  const { handleSubmit, errors, values, setFieldValue, setFieldError } = formik;

  const columns: ColumnDef<CreateProductVariant, any>[] = useMemo(
    () =>
      getProductVariantsColumns({
        selectedOption: values.options,
        onProductVariantsChange: (index, key, value) => {
          setFieldValue(`productVariants[${index}][${key}]`, value);
        },
      }),
    [values.options]
  );

  useEffect(() => {
    const generated = generateVariantsFromSelectedOptions(values.options);

    const merged = generated.map((variant) => {
      const existing = values.productVariants.find(
        (v) => JSON.stringify(v.variantValues) === JSON.stringify(variant.variantValues)
      );

      return {
        ...variant,
        price: existing?.price ?? variant.price,
        quantity: existing?.quantity ?? variant.quantity,
        sku: existing?.sku ?? "",
      };
    });

    setFieldValue("productVariants", merged);
  }, [values.options]);

  const handleApplyToAll = () => {
    if (!priceRef.current || !quantityRef.current || !skuRef.current) return;

    const price = +priceRef.current.value;
    const quantity = +quantityRef.current.value;
    const sku = skuRef.current.value;

    setFieldValue(
      `productVariants`,
      values.productVariants.map((v) => ({ ...v, price, quantity, sku }))
    );
  };

  return (
    <FlexBox size="large" onSubmit={handleSubmit} component="form">
      <FlexBox>
        <OptionGroup
          error={typeof errors.options === "string" ? errors.options : undefined}
          className="flex-1 max-w-[600px]"
          option={{
            id: "variants",
            name: "Variants",
            optionValues: options.map((opt) => ({ id: opt.id, valueName: opt.name })),
          }}
          selectedValues={values.options.map((opt) => opt.option)}
          onSelectionChange={(selectedValues) => {
            setFieldError("options", undefined);
            setFieldValue("options", [
              ...selectedValues.map((value) => ({
                option: value,
                selectedValues: values.options.find((opt) => opt.option === value)?.selectedValues || [],
              })),
            ]);
          }}
        />

        {values.options.length > 0 && (
          <FlexBox direction="row" className="flex-wrap">
            {values.options.map((opt, index) => {
              const option = options.find((item) => item.name === opt.option);
              return option ? (
                <OptionGroup
                  error={
                    Array.isArray(errors.options) && typeof errors.options[index] === "object"
                      ? (errors.options[index] as any).selectedValues
                      : undefined
                  }
                  className="flex-1 lg:max-w-[50%]"
                  key={opt.option}
                  option={option}
                  selectedValues={values.options[index]?.selectedValues || []}
                  onSelectionChange={(selectedValues) => {
                    setFieldError(`options[${index}].selectedValues`, undefined);
                    setFieldValue(`options[${index}].selectedValues`, selectedValues);
                  }}
                />
              ) : (
                <Fragment key={opt.option} />
              );
            })}
          </FlexBox>
        )}
      </FlexBox>

      <Separator />

      {values.options.length > 0 && (
        <FlexBox size="small">
          <Label>Variation List</Label>
          <FlexBox direction={isMobile ? "column" : "row"} size="small">
            <InputFormField ref={priceRef} name="price" type="number" min={0} placeholder="Price" />
            <InputFormField ref={quantityRef} name="quantity" type="number" min={0} placeholder="Quantity" />
            <InputFormField ref={skuRef} name="sku" type="text" placeholder="SKU" />
            <Button type="button" className={isMobile ? "w-full" : ""} onClick={handleApplyToAll}>
              Apply To All
            </Button>
          </FlexBox>
          <DataTable className="border" columns={columns} data={values.productVariants} placeholder="No variants" />
        </FlexBox>
      )}
      <LoadingButton loading={loadingProduct.editProductVariants} disabled={loadingProduct.editProductVariants}>
        Save variants
      </LoadingButton>
    </FlexBox>
  );
}
