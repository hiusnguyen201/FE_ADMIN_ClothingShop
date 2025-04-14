import { Fragment, useEffect, useState } from "react";
import { getListOption } from "@/redux/option/option.thunk";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Product } from "@/types/product";
import { OptionState } from "@/redux/option/option.type";
import { OptionGroup } from "@/components/form/product/_components/OptionGroup";
import * as Yup from "yup";
import { FormikHelpers, useFormik } from "formik";
import { EditProductVariantsPayload } from "@/redux/product/product.type";
import { FlexBox } from "@/components/FlexBox";
import { VariantGroup } from "@/components/form/product/_components/VariantGroup";

const initialValues: EditProductVariantsPayload = {
  options: [],
};

const editProductVariantsSchema = Yup.object({
  options: Yup.array().of(
    Yup.object({
      option: Yup.string().required(),
      selectedValues: Yup.array().of(Yup.string()),
    })
  ),
});

export function EditProductVariantsForm({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const { loading: loadingOption, list: options } = useAppSelector<OptionState>((selector) => selector.option);

  useEffect(() => {
    (async () => {
      await dispatch(getListOption());
    })();
  }, []);

  const handleSubmit = async (
    values: EditProductVariantsPayload,
    { resetForm }: FormikHelpers<EditProductVariantsPayload>
  ) => {
    alert(JSON.stringify(values));
  };

  const formik = useFormik<EditProductVariantsPayload>({
    initialValues,
    validationSchema: editProductVariantsSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  console.log(formik.values.options);

  return (
    <FlexBox size="large" onSubmit={formik.handleSubmit} component="form">
      <VariantGroup
        className="max-w-[600px]"
        selectedValues={formik.values.options.map((opt) => opt.option)}
        options={options.map((opt) => ({ id: opt.id, value: opt.name }))}
        onSelectedValuesChange={(selectedValues) => {
          formik.setFieldValue("options", [
            ...selectedValues.map((opt) => ({
              option: options.find((item) => item.name === opt)?.name,
              selectedValues: formik.values.options.find((o) => o.option === opt)?.selectedValues,
            })),
          ]);
        }}
      />

      <FlexBox direction="row" className="flex-wrap">
        {formik.values.options.map((opt, index) => {
          const option = options.find((item) => item.name === opt.option);
          return option ? (
            <OptionGroup
              className="flex-1 lg:max-w-[50%]"
              key={opt.option}
              option={option}
              selectedValues={formik.values.options[index]?.selectedValues || []}
              onSelectionChange={(selectedValues) => {
                formik.setFieldValue(`options[${index}].selectedValues`, selectedValues);
              }}
            />
          ) : (
            <Fragment key={opt.option} />
          );
        })}
      </FlexBox>
    </FlexBox>
  );
}
