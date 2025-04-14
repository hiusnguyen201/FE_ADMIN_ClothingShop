import * as Yup from "yup";
import { Fragment, useEffect, useMemo } from "react";
import { getListOption } from "@/redux/option/option.thunk";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Product } from "@/types/product";
import { OptionState } from "@/redux/option/option.type";
import { OptionGroup } from "@/components/form/product/_components/OptionGroup";
import { FormikHelpers, useFormik } from "formik";
import { CreateProductVariant, EditProductVariantsPayload } from "@/redux/product/product.type";
import { FlexBox } from "@/components/FlexBox";
import { DataTable } from "@/components/data-table";
import { generateVariantsFromSelectedOptions } from "@/utils/variant";
import { getProductVariantsColumns } from "./product-variants.columns";
import { Label } from "@/components/ui/label";
import { ColumnDef } from "@tanstack/react-table";

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

  const [data, columns]: [CreateProductVariant[], ColumnDef<CreateProductVariant, any>[]] = useMemo(
    () => [
      generateVariantsFromSelectedOptions(formik.values.options),
      getProductVariantsColumns(formik.values.options),
    ],
    [formik.values.options]
  );

  return (
    <FlexBox size="large" onSubmit={formik.handleSubmit} component="form">
      <FlexBox>
        <OptionGroup
          className="flex-1 max-w-[600px]"
          option={{
            id: "variants",
            name: "Variants",
            optionValues: options.map((opt) => ({ id: opt.id, valueName: opt.name })),
          }}
          selectedValues={formik.values.options.map((opt) => opt.option)}
          onSelectionChange={(selectedValues) => {
            formik.setFieldValue("options", [
              ...selectedValues.map((value) => ({
                option: value,
                selectedValues: formik.values.options.find((opt) => opt.option === value)?.selectedValues || [],
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

      {formik.values.options.length > 0 &&
        (() => {
          return (
            <FlexBox size="small">
              <Label>Variation List</Label>
              <DataTable className="border" columns={columns} data={data} placeholder="No variants" />
            </FlexBox>
          );
        })()}
    </FlexBox>
  );
}
